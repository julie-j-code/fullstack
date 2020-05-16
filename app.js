// Pour importer express
const express = require('express');
// Import de body-parser après installation du package comme dépendance
const bodyParser = require('body-parser');

// pour appeler la méthode express
const app = express();

// Pour connecter l'API au cluster MongoDB
const mongoose = require('mongoose');
// adresse SRV et données utilisateur
mongoose.connect('mongodb+srv://julie:ifwcu2g2@cluster0-cucgb.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// pour pouvoir utilise le nouveau modèle Mongoose dans l'application
const Thing = require('./models/thing');


// on rajoute des headers à l'objet réponse
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// route POST
// On définit la fonction json de bodyParser comme middleware global pour votre application, juste après avoir défini les headers de la réponse :
app.use(bodyParser.json());

// La logique de route POST se trouvera modifiée par l'utilisation du modèle Mongoose
/*app.post('/api/stuff', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Objet créé !'
    });
});*/

app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    // ici, on va créer une instance de notre modèle Thing en lui passant un objet
    // objet JavaScript contenant toutes les informations requises du corps de requête
    const thing = new Thing({
        ...req.body
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
});

// Route pour répondre aux requêtes PUT qui exploite la méthode updateOne() dans notre modèle Thing
app.put('/api/stuff/:id', (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
});

// Route DELETE pour implémenter un CRUD complet
app.delete('/api/stuff/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
        .catch(error => res.status(400).json({ error }));
});

// Récupération d'un Thing spécifique
app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
});

// route GET antérieure
// L'argument passé à la méthode use : un string, correspondant à la route pour laquelle nous souhaitons enregistrer cet élément de middleware
/*app.use('/api/stuff', (req, res, next) => {
    const stuff = [{
            _id: 'oeihfzeoi',
            title: 'Mon premier objet',
            description: 'Les infos de mon premier objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            price: 4900,
            userId: 'qsomihvqios',
        },
        {
            _id: 'oeihfzeomoihi',
            title: 'Mon deuxième objet',
            description: 'Les infos de mon deuxième objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            price: 2900,
            userId: 'qsomihvqios',
        },
    ];
    res.status(200).json(stuff);
});*/


//Désormais, nous pouvons implémenter notre route GET afin qu'elle renvoie tous les Things dans la base de données :
app.use('/api/stuff', (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
});

// pour accéder à express notamment depuis notre serveur node
module.exports = app;
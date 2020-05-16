// Pour importer express
const express = require('express');
// Import de body-parser après installation du package comme dépendance
const bodyParser = require('body-parser');

// pour appeler la méthode express
const app = express();



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

app.post('/api/stuff', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Objet créé !'
    });
});


// route GET
// L'argument passé à la méthode use : un string, correspondant à la route pour laquelle nous souhaitons enregistrer cet élément de middleware
app.use('/api/stuff', (req, res, next) => {
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
});

// pour accéder à express notamment depuis notre serveur node
module.exports = app;
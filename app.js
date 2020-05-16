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

// toutes la logique de route a été passée à notre routeur stuff qu'il faut importer
const stuffRoutes = require('./routes/stuff');

// Nous l'enregistrerons ensuite comme nous le ferions pour une route unique. 
// Nous voulons enregistrer notre routeur pour toutes les demandes effectuées vers /api/stuff . Par conséquent, tapez :

app.use('/api/stuff', stuffRoutes);



// pour accéder à express notamment depuis notre serveur node
module.exports = app;
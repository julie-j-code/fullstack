// Pour importer express
const express = require('express');
// Import de body-parser après installation du package comme dépendance
const bodyParser = require('body-parser');
// Pour connecter l'API au cluster MongoDB
const mongoose = require('mongoose');
// pour appeler la méthode express
const app = express();
// toutes la logique de route a été passée à notre routeur stuff qu'il faut importer
const stuffRoutes = require('./routes/stuff');
// infrastructure nécessaire à nos routes d'authentification
const userRoutes = require('./routes/user');


// adresse SRV et données utilisateur
mongoose.connect('mongodb+srv://julie:ifwcu2g2@cluster0-cucgb.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


// on rajoute des headers à l'objet réponse
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//const router = express.Router();
// pour pouvoir utilise les modèles Mongoose dans l'application
const Thing = require('./models/Thing');
//const User = require('./models/User');


app.use(bodyParser.json());
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);



// pour accéder à express notamment depuis notre serveur node
module.exports = app;
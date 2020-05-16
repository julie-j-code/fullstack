const mongoose = require('mongoose');

// schéma de données qui contient les champs souhaités pour chaque Thing
// indique leur type ainsi que leur caractère (obligatoire ou non)

const thingSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    price: { type: Number, required: true },
});

// on exporte le modèle pour permettre à notre interface d'interragir avec Mongo DB
module.exports = mongoose.model('Thing', thingSchema);
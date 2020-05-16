const express = require('express');
const router = express.Router();

// nous importons notre middleware et le passons comme argument aux routes à protéger :
const auth = require('../middleware/auth');
// Si nous devons placer multer avant le middleware d'authentification, 
// même les images des requêtes non authentifiées seront enregistrées dans le serveur.
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/stuff');

router.get('/', auth, stuffCtrl.getAllStuff);
router.post('/', auth, multer, stuffCtrl.createThing);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.put('/:id', auth, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);

module.exports = router;
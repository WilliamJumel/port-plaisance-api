// routes/catwayRoutes.js
const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');

// ✅ GET /api/catways → Liste des catways
router.get('/', catwayController.getCatways);

// ✅ GET /api/catways/:id → Détails d’un catway
router.get('/:id', catwayController.getCatwayById);

// ✅ POST /api/catways → Créer un catway
router.post('/', catwayController.createCatway);

// ✅ PATCH /api/catways/:id → Modifier partiellement un catway
router.patch('/:id', catwayController.updateCatway);

// ✅ DELETE /api/catways/:id → Supprimer un catway
router.delete('/:id', catwayController.deleteCatway);

module.exports = router;

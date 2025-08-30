// routes/catwayRoutes.js
const express = require('express');
const router = express.Router();
const Catway = require('../models/Catway');

// ✅ GET /api/catways → Liste des catways
router.get('/', async (req, res) => {
  try {
    const catways = await Catway.find();
    res.status(200).json(catways);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// ✅ GET /api/catways/:id → Détails d’un catway
router.get('/:id', async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) {
      return res.status(404).json({ message: 'Catway non trouvé' });
    }
    res.status(200).json(catway);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// ✅ POST /api/catways → Créer un catway
router.post('/', async (req, res) => {
  try {
    const newCatway = new Catway(req.body);
    const savedCatway = await newCatway.save();
    res.status(201).json(savedCatway);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création', error: error.message });
  }
});

// ✅ PUT /api/catways/:id → Modifier un catway (remplace tout l’objet)
router.put('/:id', async (req, res) => {
  try {
    const updatedCatway = await Catway.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedCatway) {
      return res.status(404).json({ message: 'Catway non trouvé' });
    }
    res.status(200).json(updatedCatway);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour', error: error.message });
  }
});

// ✅ PATCH /api/catways/:id → Modifier partiellement un catway
router.patch('/:id', async (req, res) => {
  try {
    const patchedCatway = await Catway.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!patchedCatway) {
      return res.status(404).json({ message: 'Catway non trouvé' });
    }
    res.status(200).json(patchedCatway);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour partielle', error: error.message });
  }
});

// ✅ DELETE /api/catways/:id → Supprimer un catway
router.delete('/:id', async (req, res) => {
  try {
    const deletedCatway = await Catway.findByIdAndDelete(req.params.id);
    if (!deletedCatway) {
      return res.status(404).json({ message: 'Catway non trouvé' });
    }
    res.status(200).json({ message: 'Catway supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

module.exports = router;
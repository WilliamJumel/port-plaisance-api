// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ✅ GET /api/users → Liste des utilisateurs
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // ne pas renvoyer le mdp
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// ✅ GET /api/users/:id → Détails d’un utilisateur
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// ✅ POST /api/users → Créer un utilisateur
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json({ 
      message: 'Utilisateur créé avec succès',
      user: { ...savedUser._doc, password: undefined } // masquer le mdp
    });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création', error: error.message });
  }
});

// ✅ PUT /api/users/:id → Modifier un utilisateur (remplace tout l’objet)
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select('-password');
    if (!updatedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour', error: error.message });
  }
});

// ✅ PATCH /api/users/:id → Modifier partiellement un utilisateur
router.patch('/:id', async (req, res) => {
  try {
    const patchedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select('-password');
    if (!patchedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.status(200).json(patchedUser);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour partielle', error: error.message });
  }
});

// ✅ DELETE /api/users/:id → Supprimer un utilisateur
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

module.exports = router;

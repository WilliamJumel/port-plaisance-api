// routes/reservationRoutes.js
const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// ✅ GET /api/reservations → Liste des réservations
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// ✅ GET /api/reservations/:id → Détails d’une réservation
router.get('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// ✅ POST /api/reservations → Créer une réservation
router.post('/', async (req, res) => {
  try {
    const newReservation = new Reservation(req.body);
    const savedReservation = await newReservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création', error: error.message });
  }
});

// ✅ PUT /api/reservations/:id → Modifier une réservation (remplace tout l’objet)
router.put('/:id', async (req, res) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedReservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }
    res.status(200).json(updatedReservation);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour', error: error.message });
  }
});

// ✅ PATCH /api/reservations/:id → Modifier partiellement une réservation
router.patch('/:id', async (req, res) => {
  try {
    const patchedReservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!patchedReservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }
    res.status(200).json(patchedReservation);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour partielle', error: error.message });
  }
});

// ✅ DELETE /api/reservations/:id → Supprimer une réservation
router.delete('/:id', async (req, res) => {
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!deletedReservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }
    res.status(200).json({ message: 'Réservation supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

module.exports = router;

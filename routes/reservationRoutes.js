// routes/reservationRoutes.js
const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// ✅ GET /api/reservations → Liste des réservations
router.get('/', reservationController.getReservations);

// ✅ GET /api/reservations/:id → Détails d’une réservation
router.get('/:id', reservationController.getReservationById);

// ✅ POST /api/reservations → Créer une réservation
router.post('/', reservationController.createReservation);

// ✅ PATCH /api/reservations/:id → Modifier partiellement une réservation
router.patch('/:id', reservationController.updateReservation);

// ✅ DELETE /api/reservations/:id → Supprimer une réservation
router.delete('/:id', reservationController.deleteReservation);

module.exports = router;

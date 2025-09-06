// controllers/reservationController.js
const fs = require('fs');
const path = require('path');

// 📌 Chemin vers le fichier JSON
const reservationsFile = path.join(__dirname, '..', 'data', 'reservations.json');

// 🔹 Lire les données depuis reservations.json
function readReservations() {
  const data = fs.readFileSync(reservationsFile);
  return JSON.parse(data);
}

// 🔹 Écrire les données dans reservations.json
function writeReservations(data) {
  fs.writeFileSync(reservationsFile, JSON.stringify(data, null, 2));
}

// --- Controllers ---

// 📌 GET /api/reservations → Liste des réservations
exports.getReservations = (req, res) => {
  const reservations = readReservations();
  res.json(reservations);
};

// 📌 GET /api/reservations/:id → Détail d’une réservation
exports.getReservationById = (req, res) => {
  const reservations = readReservations();
  const reservation = reservations.find(r => r._id === req.params.id);

  if (!reservation) {
    return res.status(404).json({ message: 'Réservation non trouvée' });
  }
  res.json(reservation);
};

// 📌 POST /api/reservations → Créer une nouvelle réservation
exports.createReservation = (req, res) => {
  const reservations = readReservations();
  const newReservation = { _id: Date.now().toString(), ...req.body };

  reservations.push(newReservation);
  writeReservations(reservations);

  res.status(201).json({ message: 'Réservation créée', reservation: newReservation });
};

// 📌 PATCH /api/reservations/:id → Modifier une réservation
exports.updateReservation = (req, res) => {
  const reservations = readReservations();
  const index = reservations.findIndex(r => r._id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: 'Réservation non trouvée' });
  }

  reservations[index] = { ...reservations[index], ...req.body };
  writeReservations(reservations);

  res.json({ message: 'Réservation mise à jour', reservation: reservations[index] });
};

// 📌 DELETE /api/reservations/:id → Supprimer une réservation
exports.deleteReservation = (req, res) => {
  const reservations = readReservations();
  const filtered = reservations.filter(r => r._id !== req.params.id);

  if (reservations.length === filtered.length) {
    return res.status(404).json({ message: 'Réservation non trouvée' });
  }

  writeReservations(filtered);
  res.json({ message: 'Réservation supprimée' });
};

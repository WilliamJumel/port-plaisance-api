// controllers/catwayController.js
const fs = require('fs');
const path = require('path');

// 📌 Chemin vers le fichier JSON
const catwaysFile = path.join(__dirname, '..', 'data', 'catways.json');

// 🔹 Lire les données depuis catways.json
function readCatways() {
  const data = fs.readFileSync(catwaysFile);
  return JSON.parse(data);
}

// 🔹 Écrire les données dans catways.json
function writeCatways(data) {
  fs.writeFileSync(catwaysFile, JSON.stringify(data, null, 2));
}

// --- Controllers ---

// 📌 GET /api/catways → Liste de tous les catways
exports.getCatways = (req, res) => {
  const catways = readCatways();
  res.json(catways);
};

// 📌 GET /api/catways/:id → Récupérer un catway précis
exports.getCatwayById = (req, res) => {
  const catways = readCatways();
  const catway = catways.find(c => c._id === req.params.id);

  if (!catway) {
    return res.status(404).json({ message: 'Catway non trouvé' });
  }
  res.json(catway);
};

// 📌 POST /api/catways → Ajouter un catway
exports.createCatway = (req, res) => {
  const catways = readCatways();
  const newCatway = { _id: Date.now().toString(), ...req.body };

  catways.push(newCatway);
  writeCatways(catways);

  res.status(201).json({ message: 'Catway créé', catway: newCatway });
};

// 📌 PATCH /api/catways/:id → Modifier un catway
exports.updateCatway = (req, res) => {
  const catways = readCatways();
  const index = catways.findIndex(c => c._id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: 'Catway non trouvé' });
  }

  catways[index] = { ...catways[index], ...req.body };
  writeCatways(catways);

  res.json({ message: 'Catway mis à jour', catway: catways[index] });
};

// 📌 DELETE /api/catways/:id → Supprimer un catway
exports.deleteCatway = (req, res) => {
  const catways = readCatways();
  const filtered = catways.filter(c => c._id !== req.params.id);

  if (catways.length === filtered.length) {
    return res.status(404).json({ message: 'Catway non trouvé' });
  }

  writeCatways(filtered);
  res.json({ message: 'Catway supprimé' });
};

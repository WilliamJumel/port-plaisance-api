const mongoose = require('mongoose');
const Catway = require('./Catway'); // pour vérification existence catway

const reservationSchema = new mongoose.Schema(
  {
    catwayNumber: {
      type: Number,
      required: [true, 'Le numéro du catway est obligatoire'],
      validate: {
        validator: async function(value) {
          const catway = await Catway.findOne({ catwayNumber: value });
          return !!catway; // true si catway existe
        },
        message: 'Le catway spécifié n’existe pas',
      },
    },
    clientName: {
      type: String,
      required: [true, 'Le nom du client est obligatoire'],
    },
    boatName: {
      type: String,
      required: [true, 'Le nom du bateau est obligatoire'],
    },
    checkIn: {
      type: Date,
      required: [true, 'La date de début est obligatoire'],
    },
    checkOut: {
      type: Date,
      required: [true, 'La date de fin est obligatoire'],
      validate: {
        validator: function (value) {
          return value > this.checkIn; // la fin doit être après le début
        },
        message: 'La date de fin doit être postérieure à la date de début',
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Reservation', reservationSchema);

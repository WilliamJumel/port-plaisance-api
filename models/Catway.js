const mongoose = require('mongoose');

const catwaySchema = new mongoose.Schema(
  {
    catwayNumber: {
      type: Number,
      required: [true, 'Le numéro du catway est obligatoire'],
      unique: true,
    },
    type: {
      type: String,
      enum: {
        values: ['long', 'short'],
        message: 'Le type doit être "long" ou "short"',
      },
      required: [true, 'Le type est obligatoire'],
    },
    catwayState: {
      type: String,
      enum: {
        values: ['libre', 'occupé', 'en réparation'],
        message: 'L’état doit être "libre", "occupé" ou "en réparation"',
      },
      default: 'libre',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Catway', catwaySchema);

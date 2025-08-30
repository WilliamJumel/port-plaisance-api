const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator'); // pour validation email

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: [true, 'Le nom est obligatoire'], 
    unique: true, 
    trim: true 
  },
  email: { 
    type: String, 
    required: [true, 'L’email est obligatoire'], 
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Email non valide'] 
  },
  password: { 
    type: String, 
    required: [true, 'Le mot de passe est obligatoire'], 
    minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères'] 
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  }
}, { timestamps: true });

// 🔑 Middleware : hasher le mot de passe avant sauvegarde
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔑 Méthode : comparer le mot de passe saisi avec le hash
userSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);

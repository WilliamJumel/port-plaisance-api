const express = require('express'); 
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// 📌 Configuration du moteur de vues EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Middleware pour parser le JSON
app.use(express.json());

// Routes API
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/catways', require('./routes/catwayRoutes'));
app.use('/api/reservations', require('./routes/reservationRoutes'));

// 🔑 Routes d’authentification
app.use('/api/auth', require('./routes/authRoutes')); // <-- Ajout ici

// 📌 Routes pages HTML
app.get('/', (req, res) => {
  res.render('index'); // page d’accueil avec connexion et présentation
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

app.get('/catways', (req, res) => {
  res.render('catways');
});

app.get('/reservations', (req, res) => {
  res.render('reservations');
});

app.get('/catways/detail/:id', (req, res) => {
  res.render('catway-detail');
});

app.get('/reservations/detail/:id', (req, res) => {
  res.render('reservation-detail');
});

app.get('/documentation', (req, res) => {
  res.render('documentation');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});

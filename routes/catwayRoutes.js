// routes/catwayRoutes.js
const express = require('express');
const router = express.Router();
const { getCatways } = require('../controllers/catwayController');

router.get('/', getCatways);

module.exports = router;

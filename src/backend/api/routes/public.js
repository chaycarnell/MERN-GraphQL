const express = require('express');
const router = express.Router();
const publicController = require('../controllers/public');

router.get('/example', publicController.example);

module.exports = router;

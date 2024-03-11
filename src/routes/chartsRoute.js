const express = require('express');

const router = express.Router();

const charts = require('../Controllers/ChartsController');


router.get("/api/charts", charts);


module.exports = router;
const express = require('express');
const bugsController = require('../controllers/bugs');
const router = express.Router();

// sample test route to just get all the STATUS values
router.get('/getAllStatus', bugsController.getAllStatus, (req, res) => res.status(200).json(res.locals.data));

module.exports = router;

const express = require('express');
const bugsController = require('../controllers/bugs');
const router = express.Router();

router.get('/getAllStatus', bugsController.getAllStatus, (req, res) => res.status(200).json(res.locals.data));

module.exports = router;

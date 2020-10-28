const express = require('express');
const usersController = require('../controllers/users');
const router = express.Router();

// TODO: response codes, error flows, response data

// this route will get all of the assigned bugs for given user id
router.get('/myAssigned/:userId', usersController.getAssigned, (req, res) => {
  res.status(200).json(res.locals.data)
})

module.exports = router;

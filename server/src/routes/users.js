const express = require('express');
const usersController = require('../controllers/users');
const router = express.Router();

// TODO: response codes, error flows, response data

// this route will get the details for given user id
router.get('/:userId', usersController.get, (req, res) => {
  res.status(200).json(res.locals.data);
});

// this route will get all of the assigned bugs for given user id
router.get('/getAssignedBugs/:userId', usersController.getAssignedBugs, (req, res) => {
  res.status(200).json(res.locals.data)
});

module.exports = router;

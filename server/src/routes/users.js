const express = require('express');
const usersController = require('../controllers/users');
const router = express.Router();

// Get all of the bugs assigned to a user
router.get('/getAssignedBugs/:userId', usersController.getAssignedBugs, (req, res) => {
  res.status(200).json(res.locals.data);
});

// gets the number of bugs assigned to given user id
router.get('/getAssignedBugsCount/:userId', usersController.getAssignedBugsCount, (req, res) => {
  res.status(200).json(res.locals.data);
});

// this route will get all projects the user is a member of
router.get('/getProjects/:userId', usersController.getProjects, (req, res) => {
  res.status(200).json(res.locals.data);
});

// gets the number of projects the user is a member of
router.get('/getProjectsCount/:userId', usersController.getProjectsCount, (req, res) => {
  res.status(200).json(res.locals.data);
});

// this route will get all users
router.get('/getAllUsers', usersController.getAllUsers, (req, res) => {
  res.status(200).json(res.locals.data);
});

// this route will get the total number of users
router.get('/getAllUsersCount', usersController.getAllUsers, (req, res) => {
  res.status(200).json(res.locals.data);
});

// this route will get the details for given user id
router.get('/:userId', usersController.get, (req, res) => {
  res.status(200).json(res.locals.data);
});

module.exports = router;

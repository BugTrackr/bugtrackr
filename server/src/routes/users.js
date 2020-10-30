const express = require('express');
const usersController = require('../controllers/users');
const router = express.Router();

// TODO: response codes, error flows, response data

// this route will get all of the assigned bugs for given user id
router.get('/getAssignedBugs/:userId/:limit?/:offset?', usersController.getAssignedBugs, (req, res) => {
  res.status(200).json(res.locals.data);
});

// gets the number of bugs assigned to given user id
router.get('/getAssignedBugsCount/:userId', usersController.getAssignedBugsCount, (req, res) => {
  res.status(200).json(res.locals.data);
});

// this route will get all projects the user is a member of
router.get('/getProjects/:userId/:limit?/:offset?', usersController.getProjects, (req, res) => {
  res.status(200).json(res.locals.data);
});

// gets the number of projects the user is a member of
router.get('/getProjectsCount/:userId', usersController.getProjectsCount, (req, res) => {
  res.status(200).json(res.locals.data);
});

// this route will get the details for given user id
router.get('/:userId', usersController.get, (req, res) => {
  res.status(200).json(res.locals.data);
});

module.exports = router;

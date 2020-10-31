const express = require('express');
const usersController = require('../controllers/users');
const router = express.Router();

// Get all of the bugs assigned to a user
router.get('/getAssignedBugs/:userId', usersController.getAssignedBugs, (req, res) => {
  res.status(200).json(res.locals.data);
});

// Get the number of bugs assigned to a user
router.get('/getAssignedBugsCount/:userId', usersController.getAssignedBugsCount, (req, res) => {
  res.status(200).json(res.locals.data);
});

// Get all the projects the user is a member of
router.get('/getProjects/:userId', usersController.getMemberProjects, (req, res) => {
  res.status(200).json(res.locals.data);
});

// Get the number of projects the user is a member of
router.get('/getProjectsCount/:userId', usersController.getMemberProjectsCount, (req, res) => {
  res.status(200).json(res.locals.data);
});

// Get all users
router.get('/getAllUsers', usersController.getAllUsers, (req, res) => {
  res.status(200).json(res.locals.data);
});

// Get the total number of users
router.get('/getAllUsersCount', usersController.getAllUsersCount, (req, res) => {
  res.status(200).json(res.locals.data);
});

// Get the total number of users
router.get('/count', usersController.getAllUsersCount, (req, res) => {
  res.status(200).json(res.locals.data);
});

// Get the number of bugs assigned to a user
router.get('/:userId/bugs/assigned_to/count', usersController.getAssignedBugsCount, (req, res) => {
  res.status(200).json(res.locals.data);
});

// Get all of the bugs assigned to a user
router.get('/:userId/bugs/assigned_to', usersController.getAssignedBugs, (req, res) => {
  res.status(200).json(res.locals.data);
});

// Get the number of bugs authored by a user
router.get('/:userId/bugs/author/count', usersController.getAuthoredBugsCount, (req, res) => {
  res.status(200).json(res.locals.data);
});

// Get all of the bugs authored by a user
router.get('/:userId/bugs/author', usersController.getAuthoredBugs, (req, res) => {
  res.status(200).json(res.locals.data);
});

// Get the number of bugs that a user has authored or has been assigned
router.get('/:userId/bugs/count', usersController.getBugsCount, (req, res) => {
  res.status(200).json(res.locals.data);
});

// Get all the bugs that a user has authored or has been assigned
router.get('/:userId/bugs', usersController.getBugs, (req, res) => {
  res.status(200).json(res.locals.data);
});

// Get the number of projects the user is a member of
router.get('/:userId/projects/member/count', usersController.getMemberProjectsCount, (req, res) => {
  res.status(200).json(res.locals.data);
});

// Get all the projects the user is a member of
router.get('/:userId/projects/member', usersController.getMemberProjects, (req, res) => {
  res.status(200).json(res.locals.data);
});

// Get the number of projects the user is the owner of
router.get('/:userId/projects/owner/count', usersController.getOwnedProjectsCount, (req, res) => {
  res.status(200).json(res.locals.data);
});

// Get all the projects the user is the owner of
router.get('/:userId/projects/owner', usersController.getOwnedProjects, (req, res) => {
  res.status(200).json(res.locals.data);
});

// Get the number of projects the user is a member of
router.get('/:userId/projects/count', usersController.getMemberProjectsCount, (req, res) => {
  res.status(200).json(res.locals.data);
});

// Get all the projects the user is a member of
router.get('/:userId/projects', usersController.getMemberProjects, (req, res) => {
  res.status(200).json(res.locals.data);
});

// Get the details for a user
router.get('/:userId', usersController.get, (req, res) => {
  res.status(200).json(res.locals.data);
});

// Get all users
router.get('/', usersController.getAllUsers, (req, res) => {
  res.status(200).json(res.locals.data);
});

/*
/:userId/projects/count
/:userId/projects
*/

module.exports = router;

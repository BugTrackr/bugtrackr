const express = require('express');
const projectsController = require('../controllers/projects')

const router = express.Router();

// Get all members for a project
router.get('/getMembers/:projectId', projectsController.getMembers, (req, res) => {
  res.status(200).json(res.locals.data);
});

// Add a member to a project
router.post('/addMember', projectsController.addMember, (req, res) => {
  res.status(200).json(res.locals.data);
});

// Update members for a project
router.post('/updateMembers', projectsController.updateMembers, (req, res) => {
  res.status(200).json(res.locals.data);
});

// Remove a member from a project
router.delete('/removeMember', projectsController.removeMember, (req, res) => {
  res.status(200).json(res.locals.data);
});

// Get the number of bugs for a project
router.get('/getBugsCount/:projectId', projectsController.getBugsCount, (req, res) => {
  res.status(200).json(res.locals.data);
});

// Get all the bugs for a project
router.get('/getBugs/:projectId', projectsController.getBugs, (req, res) => {
  res.status(200).json(res.locals.data);
});

// Get the total number of projects
router.get('/getAllProjectsCount', projectsController.getAllProjectsCount, (req, res) => {
  res.status(200).json(res.locals.data);
});

// Get all projects
router.get('/getAllProjects', projectsController.getAllProjects, (req, res) => {
  res.status(200).json(res.locals.data);
});

// Get the total number of projects
router.get('/count', projectsController.getAllProjectsCount, (req, res) => {
  res.status(200).json(res.locals.data);
});

// Get the number of bugs for a project
router.get('/:projectId/bugs/count', projectsController.getBugsCount, (req, res) => {
  res.status(200).json(res.locals.data);
});

// Get all the bugs for a project
router.get('/:projectId/bugs', projectsController.getBugs, (req, res) => {
  res.status(200).json(res.locals.data);
});

// Get all members for a project
router.get('/:projectId/members', projectsController.getMembers, (req, res) => {
  res.status(200).json(res.locals.data);
});

// Get the details for a project
router.get('/:projectId', projectsController.get, (req, res) => {
  res.status(200).json(res.locals.data);
});

// Get all projects
router.get('/', projectsController.getAllProjects, (req, res) => {
  res.status(200).json(res.locals.data);
});

// Create a new project
router.post('/create', projectsController.create, (req, res) => {
  res.status(200).json(res.locals.data);
});

// Update the details for a project
router.post('/update', projectsController.update, (req, res) => {
  res.status(200).json(res.locals.data);
});

// Delete a project
router.delete('/delete', projectsController.delete, (req, res) => {
  res.status(200).json(res.locals.data);
});

// Delete a project
router.delete('/:projectId', projectsController.deleteProject, (req, res) => {
  res.status(200).json(res.locals.data);
});

module.exports = router;

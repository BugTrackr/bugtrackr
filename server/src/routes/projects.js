const express = require('express');
const projectsController = require('../controllers/projects')
const router = express.Router();

// import controller


// getAllProjects
router.get('/getAllProjects', projectsController.getAllProjects, (req, res) => {
  res.status(200).json(res.locals.data);
});

// get all members for a project
router.get('/getMembers', (req, res) => {

})

// get project details
router.get('/getDetails', (req, res) => {

})

// update project details
router.post('/update', (req, res) => {

})

// update members for a project
router.post('/updateMembers', (req, res) => {

})

// delete a project
router.delete('/delete', (req, res) => {

})

// create a project
// --> automatically create a new memberlist
router.post('/create', (req, res) => {

})

module.exports = router;

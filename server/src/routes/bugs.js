const express = require('express');
const bugsController = require('../controllers/bugs');

const router = express.Router();

// Get all the STATUS values
router.get('/getAllStatus', bugsController.getAllStatus, (req, res) => res.status(200).json(res.locals.data));

// Get all the bugs
router.get('/getAllBugs', bugsController.getAllBugs, (req, res) => res.status(200).json(res.locals.data));

// Get the total number of bugs
router.get('/getAllBugsCount', bugsController.getAllBugsCount, (req, res) => res.status(200).json(res.locals.data));

// Get the total number of bugs
router.get('/count', bugsController.getAllBugsCount, (req, res) => res.status(200).json(res.locals.data));

// Get the details for a bug
router.get('/:bugId', bugsController.get, (req, res) => res.status(200).json(res.locals.data));

// Get all the bugs
router.get('/', bugsController.getAllBugs, (req, res) => res.status(200).json(res.locals.data));

// Create a new bug
router.post('/create', bugsController.create, (req, res) => res.status(200).json(res.locals.data));

// Update the details for a bug
router.post('/update', bugsController.update, (req, res) => res.status(200).json(res.locals.data));

// Update the details for a bug
router.post('/:bugId/update', bugsController.updateBug, (req, res) => res.status(200).json(res.locals.data));

// Delete a bug
router.delete('/delete', bugsController.delete, (req, res) => res.status(200).json(res.locals.data));

// Delete a bug
router.delete('/:bugId/delete', bugsController.deleteBug, (req, res) => res.status(200).json(res.locals.data));

// Set the STATUS to 'RESOLVED' for a bug
router.post('/resolve', bugsController.resolve, (req, res) => res.status(200).json(res.locals.data));

// Set the STATUS to 'RESOLVED' for a bug
router.post('/:bugId/resolve', bugsController.resolveBug, (req, res) => res.status(200).json(res.locals.data));

module.exports = router;

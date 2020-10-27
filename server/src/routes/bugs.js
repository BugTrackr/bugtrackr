const express = require('express');
const bugsController = require('../controllers/bugs');
const router = express.Router();

// TODO: update response codes, actual data returned, negative flows

// sample test route to just get all the STATUS values
router.get('/getAllStatus', bugsController.getAllStatus, (req, res) => res.status(200).json(res.locals.data));

// this route will create a new bug in the database
router.post('/create', bugsController.create, (req, res) => res.status(200).json(res.locals.data));

// this route will get the current bug details for given bug id
router.get('/:bugId', bugsController.get, (req, res) => res.status(200).json(res.locals.data));

// this route will update the bug details for given bug id
router.post('/update', bugsController.update, (req, res) => res.status(200).json(res.locals.data));

// this route will delete the bug for given bug id
router.delete('/delete', bugsController.delete, (req, res) => res.status(200).json(res.locals.data));

// this route will set the STATUS to 'RESOLVED' for given bug id
router.post('/resolve', bugsController.resolve, (req, res) => res.status(200).json(res.locals.data));

module.exports = router;

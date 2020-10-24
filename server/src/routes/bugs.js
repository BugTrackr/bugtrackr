const express = require('express');
const bugsController = require('../controllers/bugs');
const router = express.Router();

// sample test route to just get all the STATUS values
router.get('/getAllStatus', bugsController.getAllStatus, (req, res) => res.status(200).json(res.locals.data));

// TODO: /create
// this route will create a new bug in the database

// TODO: /details/:bugId
// this route will get the current bug details for given bug id

// TODO: /update/:bugId
// this route will update the bug details for given bug id

// TODO: /delete/:bugId
// this route will delete the bug for given bug id

// TODO: /getAssigned/:userId
// this route will get all of the assigned bugs for given user id

// TODO: /resolve/:bugId
// this route will set the STATUS to 'RESOLVED' for given bug id

module.exports = router;

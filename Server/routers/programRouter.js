const express = require('express');

const { getAllPrograms, getProgramById, registerForProgram } = require('../controllers/programController');

const router = express.Router();

router.route('/').get(getAllPrograms)
router.route('/:id').get(getProgramById).post(registerForProgram);

module.exports = router;
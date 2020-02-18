const express = require('express');
const router = express.Router();
const ProgramasService = require('../services/programas.service');

router.get('/', ProgramasService.get_programas);

router.post('/', ProgramasService.post_programa);

router.delete('/:id', ProgramasService.delete_programa);

// falta put para actualizar

module.exports = router;
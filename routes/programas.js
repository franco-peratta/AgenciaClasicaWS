const express = require('express');
const router = express.Router();
const ProgramasService = require('../services/programas.service');
const AuthService = require('../services/auth.service');

router.get('/', ProgramasService.get_programas);

router.post('/', AuthService.is_authenticated, ProgramasService.post_programa);

router.delete('/:id', AuthService.is_authenticated, ProgramasService.delete_programa);

// NO ANDA VER VER VER
router.patch('/', AuthService.is_authenticated, ProgramasService.patch_programa);

module.exports = router;
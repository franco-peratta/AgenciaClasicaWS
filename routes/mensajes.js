const express = require('express');
const router = express.Router();
const MensajesService = require('../services/mensajes.service');
const AuthService = require('../services/auth.service');

router.get('/', AuthService.is_authenticated, MensajesService.get_mensajes);

router.post('/', MensajesService.post_mensajes);

router.delete('/:id', AuthService.is_authenticated, MensajesService.delete_mensajes);

module.exports = router;
const express = require('express');
const router = express.Router();
const Mensaje = require('../models/mensaje');
const Response = require('../models/response');
const MensajesService = require('../services/mensajes.service');


router.get('/', MensajesService.get_mensajes);

router.post('/', MensajesService.post_mensajes);

// Usando async await
router.delete('/:id', MensajesService.delete_mensajes);

module.exports = router;
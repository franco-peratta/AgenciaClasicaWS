const mongoose = require("mongoose");

const MensajeSchema = mongoose.Schema({
    mail: { type: String, required: true },
    nombre: { type: String, required: true },
    asunto: { type: String, required: true },
    mensaje: { type: String, required: true },
    create_ts: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Mensajes', MensajeSchema);
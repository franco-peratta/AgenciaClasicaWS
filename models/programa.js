const mongoose = require("mongoose");

const ProgramaSchema = mongoose.Schema({
    nombre: { type: String, required: true },
    destino: { type: String, required: true },
    fotos: [{ path: String }],
    video: { type: String, default: "" },
    duracion: { type: String, required: true },
    precio: { type: String, required: true },
    descripcion: { type: String, required: true },
    observaciones: { type: String, default: "" },
    itinerario: { type: String, default: "" },    
    destacado: { type: Boolean, default: true },
    create_ts: { type: Date, default: Date.now },
    update_ts: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Programas', ProgramaSchema);
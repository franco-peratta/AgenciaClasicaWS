const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    mail: { type: String, required: true },
    nombre: { type: String, required: false, default:"AgenciaClasica-user" },
    password: { type: String, required: true },
    create_ts: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Users', UserSchema);
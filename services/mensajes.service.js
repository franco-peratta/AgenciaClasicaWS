const Mensaje = require('../models/mensaje');
const Response = require('../models/response');

const get_mensajes = async function (req, res) {

    try {
        const data = await Mensaje.find().sort([['create_ts', -1]]);
        const response = new Response("Ok", data);
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(new Response("No se pudo obtener los mensajes", err));
    }
};

const post_mensajes = function (req, res) {
    const mensaje = new Mensaje({
        mail: req.body.mail,
        nombre: req.body.nombre,
        asunto: req.body.asunto,
        mensaje: req.body.mensaje,
    });

    // Save retorna una promesa
    mensaje.save().then((data) => {
        const response = new Response("Ok", data);
        res.status(201).json(response);
    })
        .catch(err => {
            const response = new Response("No se pudo guardar el mensaje", err);
            res.status(500).json(response);
        });
}

const delete_mensajes = async function (req, res) {
    try {
        const removed = await Mensaje.findByIdAndDelete({ _id: req.params.id });
        const response = new Response("Ok", removed);
        res.status(200).json(response);
    }
    catch (err) {
        const response = new Response("No se pudo borrar el mensaje", err);
        res.status(500).json(response);
    }
}

module.exports = { get_mensajes, post_mensajes, delete_mensajes };
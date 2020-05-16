const Programa = require('../models/programa');
const Response = require('../models/response');

const get_programas = function (req, res) {
    Programa.find().then((data) => {
        const response = new Response("Ok", data);
        res.status(200).json(response);
    })
        .catch(err => {
            const response = new Response("No se pudo obtener los programas", err);
            res.status(500).json(response);
        });
}

const get_programas_destacados = function (req, res) {
    Programa.find({ destacado: true }).then((data) => {
        const response = new Response("Ok", data);
        res.status(200).json(response);
    })
        .catch(err => {
            const response = new Response("No se pudo obtener los programas destacados", err);
            res.status(500).json(response);
        });
}

const get_programa_id = function (req, res) {

    const id = req.params.id;

    Programa.findById(id, (err, data) => {
        if (err) {
            const response = new Response("No se pudo obtener el programa por id", err);
            res.status(500).json(response);
        }
        const response = new Response("Ok", data);
        res.status(200).json(response);
    });

}

const post_programa = function (req, res) {
    const programa = new Programa({
        // Aca crear el programa para enchufar en la BD usando lo que me llega en req.body        
        "nombre": req.body.nombre,
        "destino": req.body.destino,
        "fotos": req.body.fotos,
        "video": req.body.video,
        "duracion": req.body.duracion,
        "precio": req.body.precio,
        "descripcion": req.body.descripcion,
        "itinerario": req.body.itinerario,
        "destacado": req.body.destacado
    });

    // Save retorna una promesa
    programa.save().then((data) => {
        const response = new Response("Ok", data);
        res.status(201).json(data);
    })
        .catch(err => {
            const response = new Response("Error al postear programa", err);
            res.status(500).json(response);
        });
}

const delete_programa = async function (req, res) {
    try {
        const removed = await Programa.findByIdAndDelete({ _id: req.params.id });
        const response = new Response("Ok", removed);
        res.status(200).json(response);
    }
    catch (err) {
        const response = new Response("No se pudo borrar el programa", err);
        res.status(500).json(response);
    }
}

const delete_all = async function (req, res) {
    try {
        const removed = await Programa.remove({});
        const response = new Response("Ok", removed);
        res.status(200).json(response);
    }
    catch (err) {
        const response = new Response("No se pudo borrar el programa", err);
        res.status(500).json(response);
    }
}

// No funciona todavia
const patch_programa = async function (req, res) {
    let programa = {
        "nombre": req.body.nombre,
        "destino": req.body.destino,
        "duracion": req.body.duracion,
        "precio": req.body.precio,
        "destacado": req.body.destacado
    }

    var query = { _id: req.body.id };

    try {
        const updated = await Programa.updateMany(query, programa);
        const response = new Response("Ok", updated);
        res.status(200).json(response);
    }
    catch (err) {
        const response = new Response("No se pudo actualizar el programa", err);
        res.status(500).json(response);
    }

};

module.exports = { get_programas, get_programa_id, get_programas_destacados, post_programa, delete_programa, delete_all, patch_programa }
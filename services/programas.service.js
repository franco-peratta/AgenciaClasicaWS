const Programa = require('../models/programa');
const Response = require('../models/response');

const get_programas = function (req, res) {
    Programa.find().then((data) => {

        const response = new Response("Ok", data);
        res.status(200).json(response);

    })
        .catch(err => {
            res.status(500).send("No se pudo obtener los programas");
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
        res.status(201).json(data);
    })
        .catch(err => {
            res.status(500).send("Error al postear programa - " + err);
        });
}

const delete_programa = async function (req, res) {
    try {
        const removed = await Programa.findByIdAndDelete({ _id: req.params.id });
        const response = new Response("Ok", removed);
        res.status(200).json(response);
    }
    catch (err) {
        const response = new Response(err, {});
        res.status(500).json(response);
    }
}


module.exports = { get_programas, post_programa, delete_programa }
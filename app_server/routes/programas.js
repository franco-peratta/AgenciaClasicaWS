const express = require('express');
const router = express.Router();
const Programa = require('../models/programa');
const controller = require('../controllers/programas');

router.get('/', controller.programas_get);

router.post('/', function (req, res) {

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
        res.status(201).send(data);
    })
        .catch(err => {
            res.status(500).send("Error al postear programa - " + err);
        });
});

module.exports = router;
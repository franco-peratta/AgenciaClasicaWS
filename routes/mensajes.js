const express = require('express');
const router = express.Router();
const Mensaje = require('../models/mensaje');
const Response = require('../models/response');


// Usando promesas
router.get('/', (req, res) => {


    Mensaje.find().sort([['create_ts', -1]]).then((data) => {
        const response = new Response("Ok", data, 200);
        res.json(response);
    })
        .catch(err => {
            res.json(new Response(err, {}, 500));
        });


});

// Usando promesas
router.post('/', function (req, res) {
    const mensaje = new Mensaje({
        mail: req.body.mail,
        nombre: req.body.nombre,
        asunto: req.body.asunto,
        mensaje: req.body.mensaje,
    });
    // Save retorna una promesa
    mensaje.save().then((data) => {
        const response = new Response("Ok", data, 200);
        res.status(201).json(response);
    })
        .catch(err => {
            const response = new Response(err, {}, 500);
            res.status(500).json(response);
        });
});

// Usando async await
router.delete('/:id', async (req, res) => {
    try {
        const removed = await Mensaje.findByIdAndDelete({ _id: req.params.id });
        const response = new Response("Ok", removed, 200);
        res.status(200).json(response);
    }
    catch (err) {
        const response = new Response(err, {}, 500);
        res.status(500).json(response);
    }
});

module.exports = router;
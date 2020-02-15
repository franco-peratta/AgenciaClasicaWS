const Programa = require('../models/programa');

const programas_get = function (req, res) {

    Programa.find().then((data) => {
        res.status(200).json(data);
    })
        .catch(err => {
            res.status(500).send("No se pudo obtener los programas");
        });
};

module.exports = { programas_get };
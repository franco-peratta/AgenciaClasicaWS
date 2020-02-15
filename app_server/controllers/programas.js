const Programa = require('../models/programa');

const programas_get = function (req, res) {

    const programas = Programa.find().then((data) => {
        res.status(200).json(data);
    });

};

module.exports = { programas_get };
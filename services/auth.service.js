const User = require('../models/user');
const Response = require('../models/response');
var bcrypt = require('bcrypt');

const create_user = async function (req, res) {
    try {
        const salt = await bcrypt.genSalt();
        const hashed_pass = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            mail: req.body.mail,
            password: hashed_pass,
            nombre: req.body.nombre
        });

        user.save().then((data) => {
            const response = new Response("Ok", data);
            res.status(201).json(response);
        })
            .catch(err => {
                const response = new Response("No se pudo crear el usuario", err);
                res.status(500).json(response);
            });

    }
    catch (err) {
        const response = new Response("No se pudo encriptar el password", err);
        res.status(500).json(response);
    }
}

const logout = function (req, res, next) {

    if (req.isAuthenticated()) {
        req.logout();
        const response = new Response("Deslogueado con exito", null);
        res.status(200).json(response);
    }
    else {
        const response = new Response("No se pudo desloguear", null);
        res.status(401).json(response);
    }
};

const success = function (req, res) {
    const response = new Response("Authorized", null);
    res.status(200).json(response);
}

const failure = function (req, res) {
    const response = new Response("Unauthorized", null);
    res.status(401).json(response);
}

const is_authenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        const response = new Response("Unauthorized", null);
        res.status(401).json(response);
    }
}

module.exports = { create_user, logout, success, failure, is_authenticated }
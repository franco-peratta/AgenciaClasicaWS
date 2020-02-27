const User = require('../models/user');
const Response = require('../models/response');
var bcrypt = require('bcrypt');

const create_user = async function (req, res) {
    // Esto seria lo que tendria que hacer en el frontend creo
    try {
        const salt = await bcrypt.genSalt();
        const hashed_pass = await bcrypt.hash(req.body.password, salt);

        console.log(hashed_pass);

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
                const response = new Response(err, {});
                res.status(500).json(response);
            });

    }
    catch (err) {
        console.log("catch bcrypt auth");
        res.send(err);
    }
}

const logout = function (req, res, next) {

    if (req.isAuthenticated()) {
        req.logout();
    }

    console.log(req.session);
    console.log(req.user);

    res.json("logout succesful");
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
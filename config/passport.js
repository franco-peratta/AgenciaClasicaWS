const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Custom fields => seria como se va a llamar cada campo en el req.body
const customFields = {
    usernameField: 'mail',
    passwordField: 'password'
}

// Verificacion y validacion
const verify_callback = (mail, password, done) => {

    User.findOne({ mail: mail }).then((user, err) => {

        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        const valid = validPassword(mail, password);

        if (!valid) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    });
};

// Creo la estrategia con la validacion previa
const strategy = new LocalStrategy(customFields, verify_callback);

// Uso los custom fields y la estrategia
passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((user_id, done) => {
    User.findById(user_id)
        .then((user) => {
            done(null, user);
        })
        .catch((err) => {
            done(err);
        })
});

async function validPassword(mail, password) {
    try {
        const user = await User.findOne({ mail: mail });

        const match = await bcrypt.compare(password, user.password);

        if (match) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}
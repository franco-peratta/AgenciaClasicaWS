const express = require('express');
const router = express.Router();
const passport = require('passport');

const AuthService = require('../services/auth.service');

router.post('/register', AuthService.is_authenticated, AuthService.create_user);

router.post('/login', passport.authenticate('local', { failureRedirect: './failure', successRedirect: './success' }));

router.post('/logout', AuthService.is_authenticated, AuthService.logout);

router.get('/failure', AuthService.failure);

router.get('/success', AuthService.success);

router.get('/is_authenticated', AuthService.is_authenticated, AuthService.success);

module.exports = router;
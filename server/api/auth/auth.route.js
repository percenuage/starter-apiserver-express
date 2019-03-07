'use strict';

const Router = require('express').Router();
const Passport = require('passport');

Router.post('/login', Passport.authenticate('local'), async (req, res) => {
    res.json(req.user);
});

Router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

Router.get('/me', (req, res) => {
    res.json(req.user || 'No authenticated user');
});

module.exports = Router;

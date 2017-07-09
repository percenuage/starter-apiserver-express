'use strict';

const Router = require('express').Router();
const User = require('./user.model');

Router.route('/')
    .get((req, res, next) => {
        User.find()
            .then(users => {
                return res.json(users);
            })
            .catch(err => {
                return next(err);
            })
    })
    .post((req, res, next) => {
        let user = new User(req.body);
        User.findByIdAndUpdate(user.id, user, { new: true, upsert: true })
            .then(user => {
                return res.json(user)
            })
            .catch(err => {
                return next(err);
            })
    })
    .delete((req, res, next) => {
        User.findByIdAndRemove(req.query.userId)
            .then(user => {
                return res.json(user)
            })
            .catch(err => {
                return next(err);
            })
    });

Router.route('/:userId')
    .get((req, res, next) => {
        User.findById(req.params.userId)
            .then(user => {
                return res.json(user);
            })
            .catch(err => {
                return next(err);
            })
    });


module.exports = Router;
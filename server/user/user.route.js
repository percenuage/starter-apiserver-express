'use strict';

const _ = require('lodash/object');
const Router = require('express').Router();
const User = require('./user.model');


Router.route('/')
    .get((req, res, next) => {
        let filters = _.omit(req.query, ['select', 'skip', 'limit', 'sort']);
        User.find(filters).select(req.query.select)
            .skip(parseInt(req.query.skip))
            .limit(parseInt(req.query.limit))
            .sort(req.query.sort).exec()
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
        User.findById(req.params.userId, req.query.select)
            .then(user => {
                return res.json(user);
            })
            .catch(err => {
                return next(err);
            })
    })
    .patch((req, res, next) => {
        User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
            .then(user => {
                return res.json(user)
            })
            .catch(err => {
                return next(err);
            })
    });


module.exports = Router;
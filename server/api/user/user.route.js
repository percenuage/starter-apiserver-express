'use strict';

const Router = require('express').Router();
const UserService = require('./user.service');

Router.route('/')
    .get(async (req, res, next) => {
        const {filter} = req.query;
        let users = await UserService.get(filter).catch(err => next(err));
        res.json(users);
    })
    .post(async (req, res, next) => {
        let user = await UserService.create(req.body).catch(err => next(err));
        res.json(user);
    })
    .delete(async (req, res, next) => {
        const {userId} = req.query;
        let user = await UserService.delete(userId).catch(err => next(err));
        res.json(user);
    });

Router.route('/:userId')
    .get(async (req, res, next) => {
        const {filter} = req.query;
        filter._id = req.params.userId;
        let users = await UserService.get(filter).catch(err => next(err));
        res.json(users);
    })
    .patch(async (req, res, next) => {
        const {userId} = req.params;
        let users = await UserService.update(userId, req.body).catch(err => next(err));
        res.json(users);
    })
    .delete(async (req, res, next) => {
        const {userId} = req.params;
        let user = await UserService.delete(userId).catch(err => next(err));
        res.json(user);
    });


module.exports = Router;
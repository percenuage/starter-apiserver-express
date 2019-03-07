'use strict';

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.sendStatus(401); //Unauthorized
};

const errorHandler = (err, req, res, next) => {
    res.status(err.statusCode || 500).send(err.message)
};

module.exports.isAuthenticated = isAuthenticated;
module.exports.errorHandler = errorHandler;
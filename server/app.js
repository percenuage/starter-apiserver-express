'use strict';

/* ---------- MODULE DEPENDENCIES ---------- */

const Express = require('express');
const BodyParser = require('body-parser');
const Helmet = require('helmet');
const CORS = require('cors');
const Morgan = require('morgan');
const Auth = require('express-basic-auth');
// const Status = require('express-server-status');

/* ---------- APPLICATION ---------- */

let app = Express();

/* ---------- ROUTES ---------- */

const API_VERSION = require('../package.json').version.split('.').shift();
const API_ROOT = '/api/v' + API_VERSION;

const UserRoute = require('./api/user/user.route');

/* ---------- CONFIGURATIONS ---------- */

app.set('trust proxy', true);

app.use(Helmet());
app.use(Morgan(process.env.MORGAN_LOG));
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.use(CORS({
    origin: process.env.CORS_ORIGINS.split(','),
    credentials: true, maxAge: 86400, preflightContinue: true
}));
app.use('/api', Auth({users: JSON.parse(process.env.BASIC_AUTH_TOKEN), challenge: true}));
app.use(Express.static('./client'));

// app.use('/status', Status(app));
app.use(API_ROOT + '/users', UserRoute);

app.use((err, req, res, next) => res.status(err.statusCode || 500).send(err.message));

/* ---------- START ---------- */

app.start = (port, host) => app.listen(port, host);

/* ---------- MODULE EXPORTS ---------- */

module.exports = app;

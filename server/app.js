'use strict';

/* ---------- MODULE DEPENDENCIES ---------- */

const Express = require('express');
const BodyParser = require('body-parser');
const MethodOverride = require('method-override');
const Helmet = require('helmet');
const CORS = require('cors');
const Auth = require("http-auth");

/* ---------- APPLICATION ---------- */

let app = Express();

/* ---------- ROUTES ---------- */

const API_VERSION = require('../package.json').version.split('.').shift();
const API_ROOT = '/api/v' + API_VERSION;

const UserRoute = require('./user/user.route');

/* ---------- CONFIGURATIONS ---------- */

app.use(Helmet());
if (process.env.NODE_ENV !== 'development') {
    app.use(Auth.connect(Auth.basic({realm: "Private area", file: ".htpasswd"})));
}
if (process.env.ENABLE_LOG === 'true') {
    app.use(require('morgan')('dev'));
}
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.use(BodyParser.json({ type: 'application/vnd.api+json' }));
app.use(MethodOverride());
app.use(CORS({
    origin: process.env.CORS_ORIGINS.split(','),
    credentials: true, maxAge: 86400
}));

app.use(Express.static('./client'));

app.use(API_ROOT + '/users', UserRoute);

/* ---------- DATABASE ---------- */

const Database = require('./configs/database.config');

app.setup = () => {
    return Database.connect(process.env.MONGO_URI);
};

/* ---------- START ---------- */

app.start = (port, host) => {
    return app.listen(port, host);
};

/* ---------- MODULE EXPORTS ---------- */

module.exports = app;

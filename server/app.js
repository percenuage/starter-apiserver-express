'use strict';

/* ---------- MODULE DEPENDENCIES ---------- */

const Express = require('express');
const BodyParser = require('body-parser');
const Helmet = require('helmet');
const CORS = require('cors');
const Morgan = require('morgan');
const Status = require('express-status-monitor'); // See also express-server-status
const Session = require('express-session');
const Passport = require('passport');


/* ---------- APPLICATION ---------- */

let app = Express();

/* ---------- ROUTES ---------- */

const API_VERSION = require('../package.json').version.split('.').shift();
const API_ROOT = '/api/v' + API_VERSION;

const UserRoute = require('./api/user/user.route');
const AuthRoute = require('./api/auth/auth.route');

/* ---------- CONFIGURATIONS ---------- */

const Middleware = require('./middleware');
const PassportStrategy = require('./passport');
PassportStrategy();

app.set('trust proxy', true);

app.use(Helmet());
app.use(Morgan(process.env.MORGAN_LOG));
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.use(Session({
    resave: true, saveUninitialized: true,
    secret: process.env.SESSION_SECRET
}));
app.use(CORS({
    origin: process.env.CORS_ORIGINS.split(','),
    credentials: true, maxAge: 86400, preflightContinue: true
}));
app.use(Passport.initialize());
app.use(Passport.session());
app.use(Express.static('./client'));

app.use(Status());
app.use(API_ROOT + '/auth', AuthRoute);
app.use(API_ROOT + '/users', Middleware.isAuthenticated, UserRoute);

app.use(Middleware.errorHandler);

/* ---------- START ---------- */

app.start = (port, host) => {
    const {NODE_ENV} = process.env;
    return new Promise(resolve => {
        let server = app.listen(port, host, () => {
            console.info(`[${NODE_ENV}] Server listening @ ${host}:${port}`);
            resolve(server);
        })
    });
};

/* ---------- MODULE EXPORTS ---------- */

module.exports = app;

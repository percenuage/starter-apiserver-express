'use strict';

/* ---------- MODULE DEPENDENCIES ---------- */

const Express = require('express');
const BodyParser = require('body-parser');
const MethodOverride = require('method-override');
const Helmet = require('helmet');
const Auth = require("http-auth");

/* ---------- APPLICATION ---------- */

let app = Express();

/* ---------- ROUTES ---------- */

const UserRoute = require('./user/user.route');

/* ---------- CONFIGURATIONS ---------- */

app.use(Auth.connect(Auth.basic({realm: "Private area", file: ".htpasswd"})));
app.use(Helmet());
if (process.env.ENABLE_LOG == 'true') {
    app.use(require('morgan')('dev'));
}
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.use(BodyParser.json({ type: 'application/vnd.api+json' }));
app.use(MethodOverride());

app.use(Express.static('./client'));

app.use('/users', UserRoute);

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

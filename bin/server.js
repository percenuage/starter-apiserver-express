#!/usr/bin/env node

'use strict';

const SERVER = '../server';

/* ---------- ENVIRONMENT VARIABLES ---------- */

require('dotenv').config();

/* ---------- MAIN ---------- */

let app = require(SERVER + '/app');

app.setup()
    .then(() => {
        return app.start(process.env.PORT, process.env.HOST);
    })
    .then(() => {
        console.info(`[${process.env.NODE_ENV}] Server listening @ ${process.env.HOST}:${process.env.PORT}`);
    })
    .catch(error => {
        console.error(error);
    });

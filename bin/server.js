#!/usr/bin/env node

'use strict';

/* ---------- ENVIRONMENT VARIABLES ---------- */

require('dotenv').config();

/* ---------- MAIN ---------- */

const SERVER = '../server';
const App = require(SERVER + '/app');
const Database = require(SERVER + '/database');

(async() => {
    try {
        await Database.connect(process.env.MONGO_URI);
        await App.start(process.env.PORT, process.env.HOST);
        console.info(`[${process.env.NODE_ENV}] Server listening @ ${process.env.HOST}:${process.env.PORT}`)
    } catch (err) {
        console.error(err)
    }
})();




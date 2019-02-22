#!/usr/bin/env node

'use strict';

/* ---------- ENVIRONMENT VARIABLES ---------- */

require('dotenv').config();

/* ---------- MAIN ---------- */

const SERVER = '../server';
const App = require(SERVER + '/app');
const Database = require(SERVER + '/database');
const Socket = require(SERVER + '/socket');

(async () => {
    try {
        await Database.connect(process.env.MONGO_URI);
        let server = await App.start(process.env.PORT, process.env.HOST);
        await Socket.listen(server);
    } catch (err) {
        console.error(err)
    }
})();




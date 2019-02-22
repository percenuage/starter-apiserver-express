'use strict';

const IO = require('socket.io')();

const EVENT = {
    CONNECTION: 'connection',
    DISCONNECTION: 'disconnect',
    WELCOME: 'server:welcome',
    GREETING: 'client:greeting',
};

IO.on(EVENT.CONNECTION, socket => {
    console.log(`[${socket.id}] connected`);
    socket.on(EVENT.DISCONNECTION, () => console.log(`[${socket.id}] disconnected`));
    socket.on(EVENT.GREETING, data => console.log(data));
    socket.emit(EVENT.WELCOME, { hello: 'world' });
});

module.exports.listen = server => IO.listen(server);

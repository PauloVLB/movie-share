const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    socket.on('action', (action) => {
        io.emit('broadcast', action);
    });
});

server.listen(process.env.PORT || 3000);
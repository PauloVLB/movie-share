const io = require('socket.io-client');
const socket = io('http://localhost:3000');

module.exports = socket;

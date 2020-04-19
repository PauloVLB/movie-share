const io = require('socket.io-client');
const socket = io('https://app-movie-share.herokuapp.com/');
//const socket = io('http://localhost:3000');

module.exports = socket;

const { app, Menu, Tray, globalShortcut } = require('electron');
const { resolve } = require('path');
const { spawn } = require('child_process');
const io = require('socket.io-client');

const appIcon = resolve(__dirname, 'assets', 'heart.png');
const socket = io('http://localhost:3000');

let tray = null;
let rc = null;

const tempPath = '"/media/paulo/WData/Torrents/Séries/Rick1/rick01"';

app.on('ready', () => {  
    createTray();  
    rc = spawn('vlc', ['-I rc', tempPath], { shell: true }); 
    addShortcuts();
});

socket.on('broadcast', (action) => {
    rc.stdin.write(action);
});

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
    socket.close();
});

const createTray = () => {
    tray = new Tray(appIcon);
};

const addShortcuts = () => {
    globalShortcut.register('Control+Space', () => {
        socket.emit('action', 'pause\n');
    });
   
    globalShortcut.register('Control+Left', () => {
        socket.emit('action', 'seek -10\n');
    });

    globalShortcut.register('Control+Right', () => {
        socket.emit('action', 'seek +10\n');
    });

    globalShortcut.register('Control+F', () =>{
        rc.stdin.write('get_time\n');
        rc.stdout.once('data', (data) => {
            const time = data.toString().split('\n')[0];
            socket.emit('action', 'seek ' + time + '\n');
        });
    });
};
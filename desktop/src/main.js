const { app, Menu, Tray, globalShortcut } = require('electron');
const { resolve } = require('path');
const { spawn } = require('child_process');

const appIcon = resolve(__dirname, '..', 'assets', 'heart.png');

let tray = null;
let rc = null;

const tempPath = '"/media/paulo/WData/Torrents/Séries/Rick1/rick01"';

app.on('ready', () => {
    createTray();  
    
    //rc = spawn('vlc', ['-I rc', tempPath], { shell: true });
    vlc = spawn('vlc', 
            ['-I http', '--http-password 123', tempPath], 
            { shell: true }
            );
    
    
    addShortcuts();
});

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});

const createTray = () => {
    tray = new Tray(appIcon);
};

const addShortcuts = () => {
    globalShortcut.register('Control+Space', () => {
        rc.stdin.write('seek 800');
    });
};
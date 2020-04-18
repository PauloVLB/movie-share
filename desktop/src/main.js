const { app, Menu, Tray, globalShortcut } = require('electron');
const { resolve } = require('path');
const { spawn } = require('child_process');

const appIcon = resolve(__dirname, '..', 'assets', 'heart.png');

let tray = null;
let paused = true;

app.on('ready', () => {
    createTray();    
    addShortcuts();
});

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});

const createTray = () => {
    tray = new Tray(appIcon);
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Item1', type: 'radio' },
        { label: 'Item2', type: 'radio', checked: true },
        { label: 'Item3', type: 'radio' }
    ]);

    tray.setContextMenu(contextMenu);
};

const addShortcuts = () => {
    globalShortcut.register('Control+Space', () => {
        spawn('dbus-send', 
        ['--type=method_call', 
        '--dest=org.mpris.MediaPlayer2.vlc', 
        '/org/mpris/MediaPlayer2', 
        'org.mpris.MediaPlayer2.Player.PlayPause']);
    });
};
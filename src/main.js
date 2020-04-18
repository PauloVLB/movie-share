const { app, Menu, Tray, globalShortcut } = require('electron');
const path = require('path');

const appIcon = path.join(__dirname, '..', 'assets', 'heart.png');

let tray = null;
let paused = true;

app.on('ready', () => {
    tray = new Tray(appIcon);
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Item1', type: 'radio' },
        { label: 'Item2', type: 'radio', checked: true },
        { label: 'Item3', type: 'radio' }
    ]);

    tray.setContextMenu(contextMenu);
    
    globalShortcut.register('Control+Space', () => {
        console.log(paused ? 'play' : 'pause');
        paused = !paused;
    });
});

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});
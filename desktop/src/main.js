const { app } = require('electron');
const { resolve } = require('path');

const tray = require('./utils/tray');
const vlc = require('./utils/vlc');
const shortcuts = require('./utils/shortcuts');

const tempPath = '"/media/paulo/WData/Torrents/Séries/Rick1/rick01"';

app.on('ready', async () => {  
    tray.create(app);  
    vlc.open(tempPath);
    vlc.execute();
    vlc.sync();
    shortcuts.addAll();
});

app.on('will-quit', () => {
    shortcuts.removeAll();
});

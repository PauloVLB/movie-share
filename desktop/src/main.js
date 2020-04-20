const { app, dialog } = require('electron');
const { resolve } = require('path');

const tray = require('./utils/tray');
const vlc = require('./utils/vlc');
const shortcuts = require('./utils/shortcuts');

const tempPath = '"/media/paulo/WData/Torrents/Séries/Rick1/rick01"';


app.on('ready', async () => {  
    tray.create(app);

    await dialog.showOpenDialog({ 
        properties: ['openFile'], 
        buttonLabel: 'Choose Video',
        filters: [{ extensions: ['mkv', 'mp4', 'wmv']}], 
    }).then(res => {
        const [path] = res.filePaths;
        vlc.open(path.toString());
    });

    vlc.execute();
    vlc.sync();
    shortcuts.addAll();
});

app.on('will-quit', () => {
    shortcuts.removeAll();
});

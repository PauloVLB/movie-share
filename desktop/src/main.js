const Store = require('electron-store');
const { resolve } = require('path');

const app = require('./app');
const ui = require('./utils/ui');
const vlc = require('./utils/vlc');
const shortcuts = require('./utils/shortcuts');

const store = new Store();

app.on('ready', async () => {  
    let vlcPath = null;
    
    if (process.platform == "win32") {
        const storedPath = store.get('vlc-path');
        
        if (storedPath) {
            vlcPath = storedPath;
        } else {
            vlcPath = await ui.dialogPath('openDirectory', 'Choose VLC directory');
            store.set('vlc-path', vlcPath);
        }
    } 
    
    ui.createTray();

    const path = await ui.dialogPath('openFile', 'Choose Video');
    vlc.open(path, vlcPath);

    vlc.execute();
    vlc.sync();
    shortcuts.addAll();
});

app.on('will-quit', () => {
    shortcuts.removeAll();
});

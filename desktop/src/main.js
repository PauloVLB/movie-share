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
    
    ui.createTray(vlcPath);
    vlc.execute();
    shortcuts.addAll();
});

app.on('will-quit', () => {
    shortcuts.removeAll();
    vlc.close();
});

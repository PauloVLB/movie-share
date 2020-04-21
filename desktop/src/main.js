const Store = require('electron-store');
const { resolve } = require('path');

const app = require('./app');
const ui = require('./utils/ui');
const vlc = require('./utils/vlc');
const shortcuts = require('./utils/shortcuts');

const store = new Store();

store.clear();
app.on('ready', async () => {  
    if (!(process.platform == "win32")) {
        console.log('test');
        const storedPath = store.get('vlc-path');
        let vlcPath = null;
        if (storedPath) {
            vlcPath = storedPath;
        } else {
            vlcPath = await ui.dialogPath('openDirectory', 'Choose VLC directory');
            store.set('vlc-path', vlcPath);
        }
        console.log(vlcPath);
    } 
    
    ui.createTray();

    const path = await ui.dialogPath('openFile', 'Choose Video');
    vlc.open(path);

    vlc.execute();
    vlc.sync();
    shortcuts.addAll();
});

app.on('will-quit', () => {
    shortcuts.removeAll();
});

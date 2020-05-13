const { Tray, Menu, dialog } = require('electron');
const { resolve } = require('path');

const app = require('./../app');
const vlc = require('./vlc');

const appIcon = resolve(__dirname, '..', 'assets', 'heart.png');

module.exports = {
    createTray(vlcPath) {
        tray = new Tray(appIcon);
        const contextMenu = Menu.buildFromTemplate([
            {
                label: 'Choose Video',
                type: 'normal',
                click: async () => {
                    const path = await this.dialogPath('openFile', 'Choose Video');
                    vlc.open(path, vlcPath);
                }
            },
            {   
                label: 'Quit', 
                type: 'normal', 
                click: () => { 
                    vlc.close();
                    app.quit();
                } 
            },
        ]);
    
        tray.setContextMenu(contextMenu);
    },

    async dialogPath(type, label) {
        const res = await dialog.showOpenDialog({ 
            properties: [type], 
            buttonLabel: label,
            filters: [{ extensions: ['mkv', 'mp4', 'wmv']}], 
        });

        const [path] = res.filePaths;
        return path.toString();
    },
};
const { Tray, Menu, dialog } = require('electron');
const { resolve } = require('path');

const app = require('./../app');
const appIcon = resolve(__dirname, '..', 'assets', 'heart.png');

module.exports = {
    createTray() {
        tray = new Tray(appIcon);
        const contextMenu = Menu.buildFromTemplate([
            {   
                label: 'Quit', 
                type: 'normal', 
                click: () => { 
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
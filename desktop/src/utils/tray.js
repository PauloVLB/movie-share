const { Tray, Menu } = require('electron');
const { resolve } = require('path');

const appIcon = resolve(__dirname, '..', 'assets', 'heart.png');

module.exports = {
    create(app) {
        tray = new Tray(appIcon);
        const contextMenu = Menu.buildFromTemplate([
            { label: 'Quit', type: 'normal', click: () => { app.quit(); } },
        ]);
    
        tray.setContextMenu(contextMenu);
    },
};
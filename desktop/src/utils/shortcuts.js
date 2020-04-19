const { globalShortcut } = require('electron');

const vlc = require('./vlc');

module.exports = {
    addAll() {
        globalShortcut.register('Control+Space', () => { vlc.pause(); });   
        globalShortcut.register('Control+Left', () => { vlc.backwards(); });
        globalShortcut.register('Control+Right', () => { vlc.foward(); });
        globalShortcut.register('S', () => { vlc.sync(); });
    },

    removeAll() {
        globalShortcut.unregisterAll();
    },
};
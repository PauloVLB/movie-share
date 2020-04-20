const { spawn } = require('child_process');

const socket = require('./io');

let vlc = null;

module.exports = {
    open(path) {
        vlc = spawn('vlc', 
            [`"${path}"`, 
                '--extraintf rc', 
                '--start-paused', 
                '--no-qt-system-tray',
            ],       
            { shell: true });     
          
    },
    
    pause() { socket.emit('action', 'pause\n'); },
    foward() { socket.emit('action', 'seek +10\n'); },
    backwards() { socket.emit('action', 'seek -10\n'); },

    sync() {
        vlc.stdin.write('get_time\n');
        vlc.stdout.once('data', (data) => {
            const time = data.toString().split('\n')[0];
            socket.emit('action', 'seek ' + time + '\n');
        });
    },

    execute() {
        socket.on('broadcast', (action) => {
            vlc.stdin.write(action);
        });
        vlc.stdout.once('data', (data) =>{
            data.toString();    
        });
    }, 
};
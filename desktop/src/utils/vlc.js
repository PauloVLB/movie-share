const axios = require('axios');
const cheerio = require('cheerio');
const { spawn } = require('child_process');

const socket = require('./io');

let vlc = null;

const POST_URL = "http://:123@localhost:8080/requests/status.xml?command=";
const GET_URL = "http://:123@localhost:8080/requests/status.xml";

module.exports = {
    open(moviePath, vlcPath=null) {
        vlc = spawn('vlc', 
            [`"${moviePath}"`, 
                '--extraintf http', 
                '--start-paused', 
                '--no-qt-system-tray',
                '--http-password 123',
            ],       
            { shell: true, cwd: vlcPath });             
    },

    close() {
        vlc.kill();
    },

    pause() { socket.emit('action', 'pl_pause'); },
    foward() { socket.emit('action', 'seek&val=+10\n'); },
    backwards() { socket.emit('action', 'seek&val=-10\n'); },
    
    async sync() {
        const res = await axios.get(GET_URL);
        const $ = cheerio.load(res.data);
        const time = $('time');
        socket.emit('action', 'seek&val='+time.text());
    },

    execute() {
        socket.on('broadcast', async (action) => {
            await axios.post(POST_URL+action);
        });
        vlc.stdout.once('data', (data) => {
            console.log(data.toString());    
        });
    }, 
};
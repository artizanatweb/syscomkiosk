const {app, BrowserWindow, ipcMain} = require('electron');

const path = require('path');
const url = require('url');
const EmailService = require('./modules/EmailService');

// require('electron-reload')(__dirname);

process.title = "SyscomKiosk";

let win;

function createWindow() {
    win = new BrowserWindow({width: 1330, height: 760});
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'src/main.html'),
        protocol: 'file',
        slashes: true
    }));

    win.on('closed', function(evt) {
        win = null;
    });

    //  win.openDevTools();

    win.setFullScreen(true);
}

app.on('ready', createWindow);

app.on('window-all-closed', function(evt) {
    app.quit();
});

app.on('activate', function(evt) {
    if (win == null) {
        createWindow();
    }
});

try {
    let emailService = new EmailService();
} catch (error) {
    console.log(error.message);
    app.quit();
}
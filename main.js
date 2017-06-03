"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
var mainWindow = null;
electron_1.app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('ready', function () {
    mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 500
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
});
//# sourceMappingURL=main.js.map
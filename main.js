"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_setup_1 = require("./core/main_setup");
const electron = require("electron");
const electron_1 = require("electron");
var mainWindow = null;
//begin 程序安装和卸载处理
if (!main_setup_1.handleSetupFun()) {
    electron_1.app.on('window-all-closed', function () {
        if (process.platform != 'darwin') {
            electron_1.app.quit();
            electron.globalShortcut.unregisterAll();
        }
    });
    electron_1.app.on('ready', function () {
        mainWindow = new electron_1.BrowserWindow({
            width: 800,
            height: 500,
            frame: false
        });
        mainWindow.loadURL(`file://${__dirname}/index.html`);
        // mainWindow.loadURL('http://www.bootcss.com/p/buttons/');
        mainWindow.on('closed', function () {
            mainWindow = null;
        });
        //mainWindow.webContents.openDevTools();
        //注册全局快捷键
        let regResult = electron.globalShortcut.register('ctrl+k', function () {
            // console.log('Global Shortcut Ctrl+K');
            if (mainWindow.webContents.isDevToolsOpened())
                mainWindow.webContents.closeDevTools();
            else
                mainWindow.webContents.openDevTools();
        });
        if (!regResult) {
            console.log('register failed!');
        }
        ;
    });
    electron_1.app.on('activate', () => {
    });
    electron_1.app.on('select-client-certificate', (e, wc, url, cers, callbak) => {
    });
    electron_1.app.setUserTasks([
        {
            program: process.execPath,
            arguments: '--new-window',
            iconPath: process.execPath,
            iconIndex: 0,
            title: 'New Window',
            description: 'Create a new window'
        }
    ]);
    electron_1.ipcMain.on('r1', function (event, arg) {
        event.returnValue = 'xxxmain';
    });
}
//end
//# sourceMappingURL=main.js.map
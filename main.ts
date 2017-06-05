import { handleSetupFun } from './core/main_setup';
import * as electron from 'electron';
import { app, BrowserWindow, ipcMain } from 'electron';
var mainWindow: Electron.BrowserWindow = null;

//begin 程序安装和卸载处理
if (!handleSetupFun()) {
    
    app.on('window-all-closed', function () {
        if (process.platform != 'darwin') {
            app.quit();
            electron.globalShortcut.unregisterAll();
        }
    });

    app.on('ready', function () {
        mainWindow = new BrowserWindow({
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
        };
    });

    app.on('activate', () => {
    });

    app.on('select-client-certificate', (e, wc, url, cers, callbak) => {

    });

    app.setUserTasks([
        {
            program: process.execPath,
            arguments: '--new-window',
            iconPath: process.execPath,
            iconIndex: 0,
            title: 'New Window',
            description: 'Create a new window'
        }
    ]);

    ipcMain.on('r1', function (event, arg) {
        event.returnValue = 'xxxmain';
    });

}
//end

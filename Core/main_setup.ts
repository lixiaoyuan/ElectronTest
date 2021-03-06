import * as electron from 'electron'
import * as childProcess from 'child_process'
import * as filesystem from 'fs'


export let handleSetupFun = function (): boolean {
    if (process.platform !== 'win32') {
        return false;
    }
    process.argv.forEach(a => {
        filesystem.appendFile("d:\\Tselectron.txt", '# '+a);
    });

    var squirrelCommand = process.argv[1];

    switch (squirrelCommand) {
        case '--squirrel-instala':
        case '--squirrel-updated':
            install();
            return true;
        case '--squirrel-uninstall':
            uninstall();
            electron.app.quit();
            return true;
        case '--squirrel-obsolete':
            electron.app.quit();
            return true;
        default:
            return false;
    }
    function install() {
        let path = require('path')
        let updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
        let target = path.basename(process.execPath);
        let child = childProcess.spawn(updateDotExe, ["--createShortcut", target], { detached: true });
        child.on('close', function (code) {
            electron.app.quit();
        });
    }
    function uninstall() {
        let path = require('path')
        let updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
        let target = path.basename(process.execPath);
        let child = childProcess.spawn(updateDotExe, ["--removeShortcut", target], { detached: true });
        child.on('close', function (code) {
            electron.app.quit();
        })
    }
}
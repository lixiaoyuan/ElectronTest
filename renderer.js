"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron = require("electron");
const electron_1 = require("electron");
let Menu = electron_1.remote.Menu;
let MenuItem = electron_1.remote.MenuItem;
let menu = new Menu();
let menuItem = [
    { label: '已注册Ctrl+K热键!', enabled: false },
    {
        label: '调用主进程', submenu: [
            { label: '调主进程1', click: tomain1 },
            { label: '调主进程2', click: tomain2 }
        ]
    },
    {
        label: '缩放', submenu: [
            { label: '放大', click: zoom },
            { label: '缩小', click: zoom2 }
        ]
    },
    { label: '获取剪切板文本', click: getcliptxt },
    { label: '获取显示信息', click: getDisplay },
    { label: '获取程序信息', click: getAppInfo },
    { label: '系统消息框', click: sysDialg },
    { label: '关闭', role: 'close' }
];
menuItem.forEach(e => {
    menu.append(new MenuItem(e));
});
window.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    menu.popup(electron_1.remote.getCurrentWindow());
}, false);
function tomain1() {
    // alert(123)
    // electron.desktopCapturer.getSources({types:['window','screen']}, (d: Error, capSource: Electron.DesktopCapturerSource[]) => {
    //     capSource.forEach(element => {
    //         alert(element.name);
    //     });
    // });
    alert(electron.ipcRenderer.sendSync('r1'));
}
function tomain2() {
    let win = new electron_1.remote.BrowserWindow({ width: 800, height: 600 });
    win.loadURL('http://www.baidu.com');
}
function zoom() {
    electron.webFrame.setZoomFactor(2);
}
function zoom2() {
    electron.webFrame.setZoomFactor(1);
}
function getcliptxt() {
    alert(electron.clipboard.readText());
}
function getDisplay() {
    let display = electron.screen.getPrimaryDisplay();
    alert(`x:${display.workArea.x},y:${display.workArea.y},width:${display.workArea.width},height:${display.workArea.height}`);
}
function getAppInfo() {
    let info = `AppPath:${electron_1.remote.app.getAppPath()}\nPathType(userData):${electron_1.remote.app.getPath('userData')}\nVersion:${electron_1.remote.app.getVersion()}`;
    alert(info);
}
function sysDialg() {
    electron_1.remote.dialog.showMessageBox({ type: 'error', buttons: ['确定', '取消', '打开', '自定义'], defaultId: 0, title: '消息', message: '系统消息框!' });
}
//# sourceMappingURL=renderer.js.map
const { app, BrowserWindow, ipcMain } = require("electron");
const { getData } = require("./converter.js");

class appWindow {
    constructor(_width, _height) {
        this.win = new BrowserWindow({
            width: _width,
            height: _height,
            maximizable: false,
            resizable: false,
            title: "Vulnus Converter",
            icon: "./vulnus-icon.ico",
            autoHideMenuBar: true,

            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        });
        this.win.center();
    }
}

let window;

app.on("ready", () => {
    window = new appWindow(400, 800);
    window.win.loadFile("./page/index.html");

    app.on("window-all-closed", () => {
        app.quit();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin")
        app.quit();
});

ipcMain.on("convert", (evt, data) => {
    getData(data, evt);
});

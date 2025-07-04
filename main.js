const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 738,
    height: 404,
    webPreferences: {
      preload: path.join(__dirname, 'src/renderer.js'),
      contextIsolation: false,
      nodeIntegration: true
    }
  });

  // win.webContents.openDevTools(); // Debug

  win.loadFile(path.join(__dirname, 'src/renderer.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

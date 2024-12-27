import { app as electronApp, BrowserWindow, ipcMain } from 'electron';

if (require('electron-squirrel-startup')) {
  electronApp.quit();
}

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};



electronApp.on('ready', () => {
  createWindow();
});

electronApp.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    electronApp.quit();
  }
});

// mac
electronApp.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('send-message', async (event, message) => {
  event.reply('message-response', "dddd");
  console.log(message)
});

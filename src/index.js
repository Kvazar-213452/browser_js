import { app as electronApp, BrowserWindow } from 'electron';
import { initializeIpcHandlers } from './main_com/ipcHandlers.js';

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

  mainWindow.loadFile('web/index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

electronApp.allowRendererProcessReuse = false;

electronApp.on('ready', () => {
  initializeIpcHandlers();
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

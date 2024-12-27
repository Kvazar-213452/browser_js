import { app as electronApp, BrowserWindow, ipcMain } from 'electron';
import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

if (require('electron-squirrel-startup')) {
  electronApp.quit();
}

let mainWindow;

// Функція для створення вікна
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

// Запуск сервера Express
const startExpressServer = () => {
  const expressApp = express();
  const PORT = 3000;

  // Middleware для обробки JSON
  expressApp.use(bodyParser.json());

  // Маршрут для POST-запитів
  expressApp.post('/data', (req, res) => {
    const { message } = req.body;
    console.log(`Отримано повідомлення: ${message}`);

    // Відповідь серверу
    res.json({ response: `Сервер отримав: ${message}` });
  });

  // Запуск сервера
  expressApp.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
  });
};

// Подія готовності Electron
electronApp.on('ready', () => {
  // Запуск сервера Express
  startExpressServer();

  // Створення головного вікна
  createWindow();
});

// Подія закриття всіх вікон
electronApp.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    electronApp.quit();
  }
});

// Подія активації (для macOS)
electronApp.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Обробка запитів із рендерного процесу
ipcMain.on('send-message', async (event, message) => {
  try {
    // Використовуємо node-fetch для відправки POST-запиту
    const response = await fetch('http://localhost:3000/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from the server');
    }

    const data = await response.json();
    // Відправляємо відповідь назад у рендерний процес
    event.reply('message-response', "dddd");
  } catch (error) {
    console.error('Помилка під час запиту:', error);
    event.reply('message-response', 'Сервер недоступний');
  }
});

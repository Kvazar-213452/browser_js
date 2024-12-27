import { ipcMain } from 'electron';
const fs = require('fs');
const path = require('path');

const history_file = path.join(__dirname, '../data/history.json');

export const initializeIpcHandlers = () => {
  ipcMain.on('history', async (event, message) => {
    fs.readFile(history_file, 'utf8', (err, data) => {
      if (err) {
        event.reply('message-response', 'error');
        return;
      }
      
      try {
        const jsonData = JSON.parse(data);
        event.reply('message-response', jsonData);
      } catch (parseError) {
        event.reply('message-response', 'error');
      }
    });
  });

  ipcMain.on('history_add', async (event, message) => { 
      let data = [];
      if (fs.existsSync(history_file)) {
          const fileContent = fs.readFileSync(history_file, 'utf-8');
          data = JSON.parse(fileContent);
      }

      data.push(message);

      fs.writeFileSync(history_file, JSON.stringify(data, null, 2));
  });

  ipcMain.on('history_del', async (event, message) => { 
    let data = [];
    if (fs.existsSync(history_file)) {
        const fileContent = fs.readFileSync(history_file, 'utf-8');
        data = JSON.parse(fileContent);
    }

    data = [];

    fs.writeFileSync(history_file, JSON.stringify(data, null, 2));
  });
};

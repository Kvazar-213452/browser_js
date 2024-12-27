import { ipcMain } from 'electron';

export const initializeIpcHandlers = () => {
  ipcMain.on('send-message', async (event, message) => {
    event.reply('message-response', 'dddd');
    console.log(message);
  });
};

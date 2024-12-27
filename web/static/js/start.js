function start() {
    ipcRenderer.send('settings_get', null);

    ipcRenderer.on('settings_get_response', (event, response) => {
        shrech_url(response["start_site"]);
    });
}
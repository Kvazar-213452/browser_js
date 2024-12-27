const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', function () {
    const webview = document.getElementById('webview');
    const searchInput = document.getElementById('shrech');
    const searchButton = document.getElementById('button_Search');
    const reloadButton = document.getElementById('button_reload');

    // src webview ch
    webview.addEventListener('did-navigate', function () {
        const currentURL = webview.getURL();
        searchInput.value = currentURL;

        const date = new Date();
        const timestamp = date.toLocaleString();

        const message = [currentURL, timestamp];

        ipcRenderer.send('history_add', message);
    });

    // search
    searchButton.addEventListener('click', function () {
        const newURL = searchInput.value;
        if (newURL) {
            webview.setAttribute('src', newURL);
        }
    });

    // enter
    searchInput.addEventListener('keypress', function (e) {
        if (e.which === 13) { // 13 - код клавіші Enter
            const newURL = searchInput.value;
            if (newURL) {
                webview.setAttribute('src', newURL);
            }
        }
    });

    // reload
    reloadButton.addEventListener('click', function () {
        webview.reload();
    });
});

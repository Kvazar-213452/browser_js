function clos(name) {
    const element = document.getElementById(name);
    element.style.display = 'none'; 
}

function openModal(name) {
    const element = document.getElementById(name);
    element.style.display = 'block'; 
}

function hist() {
    openModal('modal');
    render_history();
}

function render_history() {
    ipcRenderer.send('history', null);
  
    ipcRenderer.on('message-response', (event, response) => {
        document.getElementById("hist").innerHTML = null;

        for (let i = 0; i < response.length; i++) {
            let div = document.createElement('div');
            div.classList.add('hist_div');

            let urlPara = document.createElement('p');
            urlPara.classList.add('url_hist');
            urlPara.textContent = response[i][0];

            let timePara = document.createElement('p');
            timePara.classList.add('time_hist');
            timePara.textContent = response[i][1];

            div.appendChild(urlPara);
            div.appendChild(timePara);

            document.getElementById("hist").appendChild(div);
        }
    });
}

function del_hist() {
    ipcRenderer.send('history_del', null);
    
    render_history();
}

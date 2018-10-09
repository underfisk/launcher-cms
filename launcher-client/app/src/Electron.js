//Electron ipc here
const electron = window.require('electron'), 
    ipcRenderer = electron.ipcRenderer;

export default {
    electron,
    ipcRenderer
}
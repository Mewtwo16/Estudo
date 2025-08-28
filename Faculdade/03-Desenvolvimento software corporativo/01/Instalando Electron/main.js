// Defino uma constant para requisitar as bibliotecas do Electron
const {app , BrowserWindow} = require('electron');

const createWindow = () => {
    const mainwindow = new BrowserWindow({
        width: 800,
        height: 800,
    });
    mainwindow.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow()
});

// Fecho a aplicação quando todas as janelas forem fechadas
app.on('window-all-closed', () => {
    if(process.plataform !== 'darwin') {
        app.quit();
    }
})

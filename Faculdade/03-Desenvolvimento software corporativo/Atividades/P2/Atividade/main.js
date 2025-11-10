const { app, BrowserWindow } = require('electron');
const path = require('path');
const http = require('http');
require('dotenv').config();

// Iniciar o servidor Express dentro do Electron
let servidorIniciado = false;
function iniciarServidor() {
  if (servidorIniciado) return;
  try {
    require(path.join(__dirname, 'server', 'index.js'));
    servidorIniciado = true;
  } catch (err) {
    console.error('Falha ao iniciar o servidor Express:', err);
  }
}

const PORTA = process.env.PORT || 3000;

function esperarServidor(url, timeoutMs = 15000, intervaloMs = 300) {
  const inicio = Date.now();
  return new Promise((resolve, reject) => {
    const tentar = () => {
      const req = http.get(url, (res) => {
        res.resume();
        if (res.statusCode === 200) return resolve();
        if (Date.now() - inicio > timeoutMs) return reject(new Error('Servidor não respondeu a tempo'));
        setTimeout(tentar, intervaloMs);
      });
      req.on('error', () => {
        if (Date.now() - inicio > timeoutMs) return reject(new Error('Servidor não respondeu a tempo'));
        setTimeout(tentar, intervaloMs);
      });
    };
    tentar();
  });
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true,
    },
  });
  const url = `http://localhost:${PORTA}`;
  win.loadURL(url);
};

app.whenReady().then(async () => {
  iniciarServidor();
  try {
    await esperarServidor(`http://localhost:${PORTA}/saude`);
  } catch {}
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

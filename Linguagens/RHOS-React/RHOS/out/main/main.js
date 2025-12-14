"use strict";
const electron = require("electron");
const path = require("node:path");
const utils = require("@electron-toolkit/utils");
let serverIsOn = false;
let mainWindow = null;
async function startServer() {
  if (serverIsOn) return;
  try {
    await Promise.resolve().then(() => require("./server-B7-wMIWI.js"));
    serverIsOn = true;
    console.log("Servidor iniciado com sucesso");
  } catch (e) {
    console.error(`[Server Fatal]: Falha ao iniciar servidor: ${e}`);
  }
}
function createLoginWindow() {
  const loginWindow = new electron.BrowserWindow({
    width: 900,
    height: 580,
    show: true,
    frame: false,
    transparent: true,
    autoHideMenuBar: true,
    resizable: false,
    ...process.platform === "linux" ? {
      icon: path.join(__dirname, "../../build/icon.png")
    } : process.platform === "win32" && {
      icon: path.join(__dirname, "resources", "icon.png")
    },
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false
    }
  });
  loginWindow.on("ready-to-show", () => {
    loginWindow.show();
  });
  loginWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    loginWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    loginWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
  electron.ipcMain.once("login-success", () => {
    loginWindow.close();
    createMainWindow();
  });
}
function createMainWindow() {
  mainWindow = new electron.BrowserWindow({
    width: 1200,
    height: 800,
    show: true,
    frame: true,
    transparent: false,
    autoHideMenuBar: false,
    ...process.platform === "linux" ? {
      icon: path.join(__dirname, "../../build/icon.png")
    } : process.platform === "win32" && {
      icon: path.join(__dirname, "resources", "icon.png")
    },
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false
    }
  });
  mainWindow.on("ready-to-show", () => {
    mainWindow?.show();
  });
  mainWindow.on("closed", () => {
    const { session } = require("electron");
    session.defaultSession.clearStorageData({
      storages: ["localstorage"]
    }).then(() => {
      console.log("Token de autenticação limpo");
    });
    mainWindow = null;
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(`${process.env["ELECTRON_RENDERER_URL"]}#/home`);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"), { hash: "/home" });
  }
}
electron.app.whenReady().then(() => {
  utils.electronApp.setAppUserModelId("com.electron");
  const { session } = require("electron");
  session.defaultSession.clearStorageData({
    storages: ["localstorage", "sessionstorage", "cookies", "cachestorage"]
  }).then(() => {
    console.log("Sessões antigas limpas ao iniciar");
  });
  startServer();
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  electron.ipcMain.on("ping", () => console.log("pong"));
  electron.ipcMain.on("logout", () => {
    if (mainWindow) {
      mainWindow.close();
      mainWindow = null;
    }
    createLoginWindow();
  });
  createLoginWindow();
  electron.app.on("activate", function() {
    if (electron.BrowserWindow.getAllWindows().length === 0) createLoginWindow();
  });
});
electron.app.on("window-all-closed", () => {
  const { session } = require("electron");
  session.defaultSession.clearStorageData({
    storages: ["localstorage", "sessionstorage", "cookies"]
  }).then(() => {
    console.log("Storage limpo ao fechar aplicação");
  });
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});

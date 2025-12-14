"use strict";
const electron = require("electron");
const preload = require("@electron-toolkit/preload");
const API_BASE = `http://localhost:${process.env.EXPRESS_PORT || 3e3}`;
const api = {
  async submitLogin(user, password) {
    const res = await fetch(`${API_BASE}/api/login`, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ user, password })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { success: false, message: data?.message || `HTTP ${res.status}` };
    return data;
  },
  notifyLoginSuccess() {
    electron.ipcRenderer.send("login-success");
  },
  notifyLogout() {
    electron.ipcRenderer.send("logout");
  }
};
if (process.contextIsolated) {
  try {
    electron.contextBridge.exposeInMainWorld("electron", preload.electronAPI);
    electron.contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = preload.electronAPI;
  window.api = api;
}

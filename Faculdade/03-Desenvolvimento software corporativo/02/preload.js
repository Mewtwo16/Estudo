const {contextBridge} = require('electron')

contextBridge.executeInMainWorld('api', {
    // Possibilidade de rodar funções no render
})
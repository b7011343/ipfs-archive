const { contextBridge, ipcRenderer } = require("electron");


process.once("loaded", () => {
  contextBridge.exposeInMainWorld("versions", process.versions);
  
  contextBridge.exposeInMainWorld('control', {
    minimize: () => ipcRenderer.invoke('min'),
    close: () => ipcRenderer.invoke('close')
  });

  contextBridge.exposeInMainWorld('service', {
    backup: () => {
      console.log('Backup');
      ipcRenderer.invoke('backup');
    },
    recover: (cid) => {
      console.log('Backup');
      ipcRenderer.invoke('recover', undefined, cid);
    }
  });
});

const { contextBridge, ipcRenderer } = require('electron');


process.once("loaded", () => {
  contextBridge.exposeInMainWorld('versions', process.versions);

  contextBridge.exposeInMainWorld('system', {
    minimize: () => ipcRenderer.invoke('min'),
    close: () => ipcRenderer.invoke('close'),
    openRecoverDirDialog: async () => {
      const dir = await ipcRenderer.invoke('select-dirs');
      return dir;
    },
  });

  contextBridge.exposeInMainWorld('service', {
    backup: (apiKey) => {
      console.log('Backup');
      ipcRenderer.invoke('backup', apiKey);
    },
    recover: (cid, destDir, apiKey) => {
      console.log('Recover');
      ipcRenderer.invoke('recover', cid, destDir, apiKey);
    }
  });

  contextBridge.exposeInMainWorld('storage', {
    get: (key) => ipcRenderer.invoke('get', key),
    set: (key, val) => ipcRenderer.invoke('set', key, val)
  });

  ipcRenderer.on('backup-update', (evt, message) => {
    const currentLog = ipcRenderer.invoke('get', 'backupLog');
    ipcRenderer.invoke('set', currentLog || [message]);
    console.log(message);
  });
});

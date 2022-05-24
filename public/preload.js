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
      console.log('Backup', apiKey);
      ipcRenderer.invoke('backup', apiKey);
    },
    recover: (cid, apiKey) => {
      console.log('Recover');
      ipcRenderer.invoke('recover', cid, apiKey);
    }
  });

  contextBridge.exposeInMainWorld('settings', {
    setApiKey: null
  });
});

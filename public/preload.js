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
    backup: () => {
      console.log('Backup');
      ipcRenderer.invoke('backup');
    },
    recover: (cid) => {
      console.log('Recover');
      ipcRenderer.invoke('recover', cid);
    }
  });

  contextBridge.exposeInMainWorld('settings', {
    setApiKey: null
  });
});

const { app, BrowserWindow, protocol, ipcMain, dialog, crashReporter } = require('electron');
const { store } = require('../src/utils/store');
const { backup } = require('../src/services/backup');
const { recover } = require('../src/services/recover');
const path = require('path');
const url = require('url');


let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 850,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
    show: false,
    fullscreenable: false,
    fullscreen: false,
    resizable: false,
    frame: false
  });

  mainWindow.setMenuBarVisibility(false);
  mainWindow.once('ready-to-show', () => mainWindow.show());

  // Window control
  ipcMain.handle('min', () => mainWindow.minimize());
  ipcMain.handle('close', () => app.quit());

  // App functions
  ipcMain.handle('backup', (event, apiKey, backupDirList) => backup(apiKey, backupDirList));
  ipcMain.handle('recover', (event, cid, destDir, apiKey) => recover(cid, destDir, apiKey, mainWindow));

  // Storage
  ipcMain.handle('get', (event, key) => (store.get(key)));
  ipcMain.handle('set', (event, key, val) => store.set(key, val));

  // Directory dialog
  ipcMain.handle('select-dirs', async (event, arg) => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory']
    });
    const dir = result.filePaths[0];
    return dir;
  });

  mainWindow.webContents.on('plugin-crashed', (_ev, name, version) => console.error(_ev, name, version));
  mainWindow.webContents.on('crashed', (ev, killed) => console.error(ev, killed));

  // Log crashes
  crashReporter.start({ submitURL: '', uploadToServer: false });
  console.log(app.getPath('crashDumps'));
  console.log(app.getPath('temp'));

  // In production, set the initial browser path to the local bundle generated
  // by the Create React App build process.
  // In development, set it to localhost to allow live/hot-reloading.
  const appURL = app.isPackaged
    ? url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true,
      })
    : "http://localhost:3000";
  mainWindow.loadURL(appURL);

  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }
}

// Setup a local proxy to adjust the paths of requested files when loading
// them from the local production bundle (e.g.: local fonts, etc...).
const setupLocalFilesNormalizerProxy = () => {
  protocol.registerHttpProtocol(
    "file",
    (request, callback) => {
      const url = request.url.substr(8);
      callback({ path: path.normalize(`${__dirname}/${url}`) });
    },
    (error) => {
      if (error) console.error("Failed to register protocol");
    }
  );
}

// This method will be called when Electron has finished its initialization and
// is ready to create the browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  setupLocalFilesNormalizerProxy();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS.
// There, it's common for applications and their menu bar to stay active until
// the user quits  explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// If your app has no need to navigate or only needs to navigate to known pages,
// it is a good idea to limit navigation outright to that known scope,
// disallowing any other kinds of navigation.
const allowedNavigationDestinations = [];
app.on("web-contents-created", (event, contents) => {
  contents.on("will-navigate", (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    if (!allowedNavigationDestinations.includes(parsedUrl.origin)) {
      event.preventDefault();
    }
  });
});

app.on('gpu-process-crashed', (_event, killed) => console.error(_event, killed));
app.on('renderer-process-crashed', (_e, _w, killed) => console.error(_e, _w, killed));

exports.store = store;

const backupUpdate = (win, message) => win.webContents.send('backup-update', message);

exports.backupUpdate = backupUpdate;

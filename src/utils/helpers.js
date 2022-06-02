const backupUpdate = (store, message) => {
  const currentLog = store.get('backupLog');
  const newLog = currentLog ? [...currentLog, message] : [message];
  store.set('backupLog', newLog);
  console.log(newLog);
};

const updateBackupStatus = (store, status) => {
  const { message, progress } = status;
  store.set('backupStatusMessage', message);
  store.set('backupProgress', progress);
};

exports.backupUpdate = backupUpdate;
exports.updateBackupStatus = updateBackupStatus;

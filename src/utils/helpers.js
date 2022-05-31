const backupUpdate = (store, message) => {
  const currentLog = store.get('backupLog');
  const newLog = currentLog ? [...currentLog, message] : [message];
  store.set('backupLog', newLog);
  console.log(newLog);
};

exports.backupUpdate = backupUpdate;

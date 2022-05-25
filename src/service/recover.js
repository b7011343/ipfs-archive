const { Web3Storage } = require('web3.storage');
const settings = require('electron-settings');


let apiKey;
let storageClient;

const recover = async (cid) => {
  apiKey = await settings.get('apiKey');
  storageClient = new Web3Storage({ token: apiKey });
  const storageRes = await storageClient.get(cid);
  const resFiles = await storageRes.files();
  console.log(resFiles);
};

exports.recover = recover;

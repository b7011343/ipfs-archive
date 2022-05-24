const { Web3Storage } = require('web3.storage');


let apiKey;
let storageClient;

const recover = async (cid, _apiKey) => {
  apiKey = _apiKey;
  storageClient = new Web3Storage({ token: _apiKey });
  const storageRes = await storageClient.get(cid);
  const resFiles = await storageRes.files();
  console.log(resFiles);
};

exports.recover = recover;

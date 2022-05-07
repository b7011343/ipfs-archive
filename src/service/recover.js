const { Web3Storage } = require('web3.storage');

const apiKey = '';
const storageClient = new Web3Storage({ token: apiKey });

const recover = async (cid) => {
  const storageRes = await storageClient.get(cid);
  const resFiles = await storageRes.files();
  console.log(resFiles);
};

exports.recover = recover;

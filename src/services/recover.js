const { Web3Storage } = require('web3.storage');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const crypto = require('crypto');
const CryptoJS = require('crypto-js');


let apiKey;
let storageClient;

const recover = async (cid, destDir, _apiKey) => {
  console.log('Starting recovery', cid, _apiKey)
  apiKey = _apiKey;
  storageClient = new Web3Storage({ token: apiKey });

  const storageRes = await storageClient.get(cid);
  const resFiles = await storageRes.files();
  const fileNames = resFiles.map((x) => x._name);
  const encryptionKey = CryptoJS.MD5(apiKey).toString();
  const decipher = crypto.createDecipher('aes-256-cbc', encryptionKey);

  for (const fileName of fileNames) {
    try {
      const fileRes = await axios.get(`https://dweb.link/ipfs/${cid}/${fileName}`, { responseType: 'text', responseEncoding: 'base64' });
      const fileNameUnencrypted = fileName.substring(4, fileName.length);
      const destinationDir = path.normalize(`${destDir.replace(/\\/g,"/")}/${fileNameUnencrypted}`);
      console.log('Destination', destinationDir);
      let decryptedData = decipher.update(fileRes.data, 'base64');
      decryptedData += decipher.final();
      console.log('Data decrypted')
      fs.writeFileSync(destinationDir, decryptedData, { encoding: 'base64' });
      console.log(`Recovered to ${destinationDir}`);
    } catch (err) {
      console.error('Recovery failed', err);
    }
  }
};

exports.recover = recover;

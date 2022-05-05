const CryptoJS = require('crypto-js');
const fs = require('fs');
const zip = require('bestzip');
const { Web3Storage } = require('web3.storage');


const apiKey = '3b4jk13l4j32412kj34nl1j4lk32j4ll4j23l4[f3094f0232ftq';

const dirs = [
  "D://"
];

const getDestinationFileName = () => {
  return "test";
};

const compress = (srcDir, destinationName) => { // TODO: May want to test zipping the file multiple times to decrease the storage space used
  zip({
    source: srcDir,
    destination: `./temp-compress/${destinationName}.zip`
  }).then(() => {
    console.log('Compression complete');
  }).catch((err) => {
    throw new Error(err);
  });
};

const uploadIPFS = async (file) => {
  const storage = new Web3Storage({ token: apiKey });
  const cid = await storage.put(file);
  console.log('Content added with CID:', cid);
  return cid;
};

const _backup = async (dir) => {
  const destinationName = getDestinationFileName();
  const compressedDir = `./temp-compress/${destinationName}.zip`;
  await compress(dir, destinationName);

  let zipFile = '';
  const compressedDirFileStream = fs.createReadStream(compressedDir, { encoding: 'base64' });

  compressedDirFileStream.on('data', (chunk) => zipFile += chunk);

  compressedDirFileStream.on('end', async () => {
    const encryptedZipFile = CryptoJS.AES.encrypt(zipFile, apiKey).toString();
    const cid = await uploadIPFS(encryptedZipFile);
    
    fs.unlink(compressedDir, (err) => {
      if (err) throw err;
    });
  });

};

const backup = async () => {
  for (const dir of dirs) {
    _backup(dir);
  }
};

export default backup

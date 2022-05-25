const { v1: uuid } = require('uuid');
const CryptoJS = require('crypto-js');
const fs = require('fs');
const archiver = require('archiver');
const { Web3Storage, getFilesFromPath } = require('web3.storage');
const crypto = require('crypto');
const settings = require('electron-settings');
 

let apiKey;
let storageClient;

const dirs = [
  "D:\\Bandicam"
];

const getDestinationDir = () => (`./${uuid()}.zip`);

// eslint-disable-next-line no-unused-vars
const cleanupTempFiles = () => {

};

const uploadIPFS = async (filePath) => {
  const file = await getFilesFromPath(filePath);
  console.log(file)
  const cid = await storageClient.put(file);
  console.log('Content added with CID:', cid);
  return cid;
};

const compress = async (dir) => {
  console.log(`Compressing ${dir}`);
  const destinationDir = getDestinationDir();
  const outputStream = fs.createWriteStream(destinationDir);
  const archive = archiver('zip', { zlib: { level: 9 }});
  return new Promise((resolve, reject) => {
    archive.directory(dir, false)
           .on('error', (err) => reject(err))
           .pipe(outputStream);

    outputStream.on('close', () => resolve(destinationDir));
    archive.finalize();
  });
};

const encrypt = async (dir) => {
  console.log(`Encrypting ${dir}`);
  const destinationDir = `./aes-${dir.substring(2, dir.length)}`;
  return new Promise((resolve, reject) => {
    const compressedDirReadStream = fs.createReadStream(dir, { encoding: 'base64' });
    const outputStream = fs.createWriteStream(destinationDir, { encoding: 'base64' });
    const encryptionKey = CryptoJS.MD5(apiKey).toString();    
    const cipher = crypto.createCipher('aes-256-cbc', encryptionKey);
    compressedDirReadStream.pipe(cipher).pipe(outputStream);
    outputStream.on('error', (err) => reject(err));
    outputStream.on('finish', () => resolve(destinationDir));
    compressedDirReadStream.on('error', (err) => {
      reject(err);
    });
  });
};

const _backup = async (dir) => {
  console.log(`Backing up ${dir}`);
  const compressedDir = await compress(dir);
  console.log('-----Compressed', compressedDir)
  const encryptedZipFile = await encrypt(compressedDir);
  console.log('-----Encrypted', encryptedZipFile)
  const cid = await uploadIPFS(encryptedZipFile, compressedDir);
  console.log(cid);
};

const backup = async () => {
  apiKey = await settings.get('apiKey');
  console.log('key', apiKey);
  storageClient = new Web3Storage({ token: apiKey });
  console.log('Starting backup');
  for (const dir of dirs) {
    await _backup(dir);
  }
  console.log('Backup complete');
};

exports.backup = backup;

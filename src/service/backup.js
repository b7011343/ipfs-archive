import { v1 as uuid } from 'uuid';
const CryptoJS = require('crypto-js');
const fs = require('fs');
const { archiver } = require('archiver');
const { Web3Storage } = require('web3.storage');
 

const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDcxMjBFM2Y0Y2E0NWM1RmI3MzQ5NmFhMzk4OWU5MjI2MjdGMDkzNzQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTA3MjIxNDIyNzIsIm5hbWUiOiJCYWNrdXAifQ.BOmYNu27PzV12uVE0xTOkCU4ab-ZK4pReXDi14cjEpo[f3094f0232ftq';

const dirs = [
  "D:\\Bandicam"
];

const getDestinationDir = () => (`./${uuid()}.zip`);

const uploadIPFS = async (file) => {
  const storage = new Web3Storage({ token: apiKey });
  const cid = await storage.put(file);
  console.log('Content added with CID:', cid);
  return cid;
};

const compress = (dir) => {
  console.log(`Compressing ${dir}`);
  const destinationDir = getDestinationDir();
  const outputStream = fs.createWriteStream(destinationDir);
  const archive = archiver('zip', { zlib: { level: 9 }});
  return new Promise((resolve, reject) => {
    archive.directory(dir, false)
           .on('error', err => reject(err))
           .pipe(outputStream);

    outputStream.on('close', () => resolve(destinationDir));
    archive.finalize();
  });
};

const encrypt = (dir) => {
  console.log(`Encrpting ${dir}`);
  return new Promise((resolve, reject) => {
    let zipFile = '';
    const compressedDirReadStream = fs.createReadStream(dir, { encoding: 'base64' });
    
    compressedDirReadStream.on('data', (chunk) => zipFile += chunk);
    
    compressedDirReadStream.on('end', async () => {
      const encryptedZipFile = CryptoJS.AES.encrypt(zipFile, apiKey).toString();
      resolve(encryptedZipFile);
    });

    compressedDirReadStream.on('error', (err) => {
      console.error(err);
      reject(err);
    });
  });
};

const _backup = async (dir) => {
  console.log(`Backing up ${dir}`);
  const compressedDir = await compress(dir);
  const encryptedZipFile = await encrypt(compressedDir);
  const cid = await uploadIPFS(encryptedZipFile);
  console.log(cid);
};

export const backup = async () => {
  console.log('Starting backup');
  for (const dir of dirs) {
    _backup(dir);
  }
  console.log('Backup complete');
};

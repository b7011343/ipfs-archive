const CryptoJS = require('crypto-js');
const fs = require('fs');
const zip = require('bestzip');

const encryptionPassword = 'Test123!';

const dirs = [
  "D://"
];

const getDestinationFileName = () => {
  return "";
};

const compress = (srcDir, destinationName) => {
  zip({
    source: srcDir,
    destination: './destination.zip'`./${destinationName}.zip`
  }).then(() => {
    console.log('Compression complete');
  }).catch((err) => {
    throw new Error(err);
  });
};

const _backup = async (dir) => {
  const destinationName = getDestinationFileName();
  await compress(dir, destinationName);
  
};

const backup = async () => {
  for (const dir of dirs) {

  }
};

export default backup

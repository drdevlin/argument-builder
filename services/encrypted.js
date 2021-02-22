const crypto = require('crypto');

const forStorage = async (password) => {
  try {
    const salt = await new Promise(resolve => resolve(crypto.randomBytes(16).toString('hex')));
    const hash = await new Promise(resolve => resolve(crypto.pbkdf2Sync(password, salt,  
      1000, 64, `sha512`).toString(`hex`)));
    const forStorage = salt + ':' + hash;
    return forStorage;
  } catch(error) {
    return error;
  }
}

const forVerification = async (passwordAttempt, storedPassword) => {
  try {
    const salt = storedPassword.split(':')[0];
    const hash = await new Promise(resolve => resolve(crypto.pbkdf2Sync(passwordAttempt, salt,  
      1000, 64, `sha512`).toString(`hex`)));
    const forVerification = salt + ':' + hash;
    return forVerification;
  } catch(error) {
    return error;
  }
}

const encrypted = (password) => {
  const matches = async (storedPassword) => {
    try {
      const reconstruct = await forVerification(password, storedPassword);
      return storedPassword === reconstruct;
    } catch(error) {
      return error;
    }
  }
  return { forStorage: forStorage(password), matches }
}

module.exports = encrypted;
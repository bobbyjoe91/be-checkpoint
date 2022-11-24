const crypto = require('crypto');

function encodePassword(password) {
  const key = crypto.randomBytes(16).toString('hex');
  const encoded = crypto.createHash('sha256').update(key + password).digest('hex');

  return `${encoded}:${key}`;
}

function validate(password, hash) {
  const [encoded, key] = hash.split(':');
  const hashedPasswordInput = crypto.createHash('sha256').update(key + password).digest('hex');

  return hashedPasswordInput === encoded;
}

module.exports = { encodePassword, validate };
var CryptoJS = require("crypto-PBKDF2");
const config = require("config");
var DEFAULT_HASH_ITERATIONS = 4000;

var SALT = config.get("SALT");

var KEY_SIZE = 768 / 32;

class cryptoHelp {
  static async hashPassword(value) {
    var key = CryptoJS.PBKDF2(value, SALT, {
      keySize: KEY_SIZE,
      iterations: DEFAULT_HASH_ITERATIONS,
    });

    return key.toString(CryptoJS.enc.Base64);
  }

  static async checkPassword(candidate, hashed) {
    return (await this.hashPassword(candidate)) === hashed;
  }
}

module.exports = cryptoHelp;

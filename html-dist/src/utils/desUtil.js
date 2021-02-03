import CryptoJS from 'crypto-js';
const des = {
  resetPwd(pwd) {
    pwd += "";
    var str = "";
    if (pwd.length < 8) {
      for (var i = 0; i < (8 - pwd.length); i++) {
        str += "0";
      }
      str += pwd;
      return str;
    }
    return pwd;
  },
  decryptByDES(ciphertext, key) { 
    //DES 解密
    key = this.resetPwd(key);
    ciphertext = ciphertext.replace(/\s*/g, "");
    var keyHex = CryptoJS.enc.Utf8.parse(key);
    // direct decrypt ciphertext
    var decrypted = CryptoJS.DES.decrypt({
        ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
    }, keyHex, {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        iv: CryptoJS.enc.Latin1.parse("12345678")
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  },
  encryptByDES(message, key) { 
    //DES 加密
    key = this.resetPwd(key);
    var keyHex = CryptoJS.enc.Utf8.parse(key);
    var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        iv:CryptoJS.enc.Latin1.parse("12345678")
    });
    return encrypted.toString();
  },
}
export default des

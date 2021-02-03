
import CryptoJS from "crypto-js";
const AES_KEY = 'APTX4869';
const IV = 'APTX4869';
export const Crypto = {

  encrypt(params) {
    var key = CryptoJS.enc.Utf8.parse(AES_KEY);
    var iv = CryptoJS.enc.Utf8.parse(IV);
    var jsonData = JSON.stringify(params);
    var data = CryptoJS.enc.Utf8.parse(jsonData);
    var encrypted = CryptoJS.AES.encrypt(data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString();
    return encrypted;
  },

  decrypt(params) {
    //解密
    var key = CryptoJS.enc.Utf8.parse(AES_KEY);
    var iv = CryptoJS.enc.Utf8.parse(IV);
    var decrypt = CryptoJS.AES.decrypt(params, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);
    return decrypt;
},
encryptByMd5(str) { 
  return CryptoJS.MD5(str).toString();
},
}


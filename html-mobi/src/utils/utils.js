import CryptoJS from 'crypto-js';

export const Util = {
  setCookie(cname, cvalue, ex) {
    var d = new Date()
    d.setTime(ex)
    var expires = "expires=" + d.toUTCString()
    document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/;"
  },
  getCookie(cname) {
    var name = cname + "="
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) == ' ') c = c.substring(1)
      if (c.indexOf(name) != -1)  return c.substring(name.length, c.length)
    }
    return ""
  },
  clearCookie(name) {
    this.setCookie(name, "", -1)
  },
  checkCookie(name) {
    var user = this.getCookie(name);
    return new Promise((resolve, reject) => {
      if (user != "") {
        resolve(user);
      } else {
        reject();
      }
    });
  },
  setStore(name, content) {
    if (!name) return;
    if (typeof content !== 'string')  content = JSON.stringify(content)
    window.localStorage.setItem(name, content)
  },
  getStore(name) {
    if (!name) return
    return window.localStorage.getItem(name)
  },
  removeStore(name) {
    if (!name) return
    window.localStorage.removeItem(name)
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
  encryptByMd5(str) { 
		//md5 加密
    return CryptoJS.MD5(str).toString();
  },
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
  getEnvironmet(){
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent))  return 'IOS'
    else if (/(Android)/i.test(navigator.userAgent)) return window.device = 'Android'
    else return  'PC'
  }
}
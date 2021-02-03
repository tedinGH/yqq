var  utfx  =  require("utfx");
var ByteBuffer = require("bytebuffer");
var Long = require("long")

export const msgUtil = {
  /**
 * 字符串转二进制
 * @param {*} token token
 * @param {*} interfaceName 接口名
 * @param {*} msg 数据
 */
msgEntityToBuffer(token,interfaceName,msg) {
  if(interfaceName!=undefined&&interfaceName!=null){
    //4位随机数+8位时间戳+4位接口长度+4位token长度

    let length=21,interfaceLen=0,tokenLen=0,strLength=0;
    if(interfaceName!=undefined&&interfaceName!=null){
      let strCodes = this.stringSource(interfaceName);
      interfaceLen = utfx.calculateUTF16asUTF8(strCodes)[1];
      length+=interfaceLen
    }

    if(token!=undefined&&token!=null){
      let strCodes = this.stringSource(token);
      tokenLen = utfx.calculateUTF16asUTF8(strCodes)[1];
      if(tokenLen==undefined){
        tokenLen=0;
      }
      length+=tokenLen
    }

    if(msg!=undefined&&msg!=null&&msg!=""){
      let strCodes = this.stringSource(msg);
      strLength = utfx.calculateUTF16asUTF8(strCodes)[1];
      if(strLength==undefined){
        strLength=0;
      }
      length+=strLength
    }
    let randomNum=Math.round(Math.random()*256);

    let buffer = new ArrayBuffer(length);
    let view = new DataView(buffer);
    view.setUint8(0,randomNum);
    let dateLong=Long.fromNumber(new Date().getTime());
    view.setUint32(1,dateLong.high);
    view.setUint32(5,dateLong.low);
    // this.longToBytes(view,new Date().getTime())
    // view.setBigUint64(1, JSBI.BigInt(new Date().getTime()));
    view.setUint32(9,interfaceLen);
    for(let i=0;i<interfaceLen;i++){
      view.setUint8(13+i,interfaceName.charCodeAt(i)^randomNum);
    }
    view.setUint32(13+interfaceLen,tokenLen);
    
    if(tokenLen>0){
      for(let i=0;i<tokenLen;i++){
        view.setUint8(17+interfaceLen+i,token.charCodeAt(i)^randomNum);
      }
    }
    view.setUint32(17+interfaceLen+tokenLen,strLength);
    if(strLength>0){    
      for(let i=0;i<strLength;i++){
        let offset=21+interfaceLen+tokenLen;
        utfx.encodeUTF16toUTF8(this.stringSource(msg), function (b) {
          view.setUint8(offset++, b^randomNum);
        }.bind(this));

        // view.setUint8(21+interfaceLen+tokenLen+i,msg.charCodeAt(i)^randomNum);
      }
    }

    return buffer;
  }
  return null;
},

/**
 * 字符串+文件流 转二进制
 * @param {*} token token
 * @param {*} interfaceName 接口名
 * @param {*} msg 数据
 */
msgEntityToBufferV1(token,interfaceName,msg,myArray) {
  if(interfaceName!=undefined&&interfaceName!=null){
    //4位随机数+8位时间戳+4位接口长度+4位token长度

    let length=25,interfaceLen=0,tokenLen=0,strLength=0;
    if(interfaceName!=undefined&&interfaceName!=null){
      let strCodes = this.stringSource(interfaceName);
      interfaceLen = utfx.calculateUTF16asUTF8(strCodes)[1];
      length+=interfaceLen
    }

    if(token!=undefined&&token!=null){
      let strCodes = this.stringSource(token);
      tokenLen = utfx.calculateUTF16asUTF8(strCodes)[1];
      if(tokenLen==undefined){
        tokenLen=0;
      }
      length+=tokenLen
    }

    if(msg!=undefined&&msg!=null&&msg!=""){
      let strCodes = this.stringSource(msg);
      strLength = utfx.calculateUTF16asUTF8(strCodes)[1];
      if(strLength==undefined){
        strLength=0;
      }
      length+=strLength
    }

    let bufLen=0   
    if(myArray){
      bufLen=myArray.byteLength;
    }
    length+=bufLen

    let randomNum=Math.round(Math.random()*256);

    let buffer = new ArrayBuffer(length);
    let view = new DataView(buffer);
    view.setUint8(0,randomNum);

    let dateLong=Long.fromNumber(new Date().getTime());
    view.setUint32(1,dateLong.high);
    view.setUint32(5,dateLong.low);
    // this.longToBytes(view,new Date().getTime())
    // view.setBigUint64(1, JSBI.BigInt(new Date().getTime()));
    view.setUint32(9,interfaceLen);
    for(let i=0;i<interfaceLen;i++){
      view.setUint8(13+i,interfaceName.charCodeAt(i)^randomNum);
    }
    view.setUint32(13+interfaceLen,tokenLen);
    
    if(tokenLen>0){      
      for(let i=0;i<tokenLen;i++){
        view.setUint8(17+interfaceLen+i,token.charCodeAt(i)^randomNum);
      }
    }
    view.setUint32(17+interfaceLen+tokenLen,strLength);
    if(strLength>0){
      // bb.writeIString(msg);      
      for(let i=0;i<strLength;i++){
        let offset=21+interfaceLen+tokenLen;
        utfx.encodeUTF16toUTF8(this.stringSource(msg), function (b) {
          view.setUint8(offset++, b^randomNum);
        }.bind(this));
        // view.setUint8(21+interfaceLen+tokenLen+i,msg.charCodeAt(i)^randomNum);
      }
    }
    
    view.setUint32(21+interfaceLen+tokenLen+strLength,bufLen);
    if(bufLen>0){
      var uint8Array = new Uint8Array(myArray);
      for(let i=0;i<bufLen;i++){
        view.setUint8(25+interfaceLen+tokenLen+strLength+i,uint8Array[i]);
      }
    }
    return buffer;
  }
  return null;
},
stringSource(s) {
    var i = 0;
    return function () {
        return i < s.length ? s.charCodeAt(i++) : null;
    };
},
longToBytes(view,values){
  for(let i=0;i<8;i++){
    let offset=64-(i+1)*8;
    let byt=(values>>offset)&0xff
    view.setInt8(1+i,byt)
  }
}
};



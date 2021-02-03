import "@/common/pinyin";
import store from "../store";
export const toFace = {
  inserted(el, binding) {
    let content = el.innerHTML;
    content = brtext(content);
    content = resetUrl(content);
    content = toall(content);
    el.innerHTML = content;
  },
  // update(el, binding) {
  //   let content = el.innerHTML;
  //   content = content + '0'
  //   el.innerHTML = content;
  // },
}
let brtext = function (str) {
  str = str.replace("<", "&lt;").replace(">", "&gt;");
  str = str.replace(/[\n\r]/g, "<br/>");
  return str
}

let toall = function(str){
  let reg =RegExp(/@全体成员/)
  let reg2 =RegExp(/@လူတိုင်း/)
  let reg3 =RegExp(/@All/)
  if(reg.test(str) == true){
      str = str.replace(reg, function (a, b, c) {
      return '@'+store.state.lang.msgPanel.all
    })
  }else if(reg2.test(str) == true){
    str = str.replace(reg2, function (a, b, c) {
    return '@'+store.state.lang.msgPanel.all
  })
  }else{
      str = str.replace(reg3, function (a, b, c) {
      return  '@'+store.state.lang.msgPanel.all
    })
  }
  return str
} 

let resetUrl = function (str) {
  str = str.replace(/&amp;/g, "&");
  str = str.replace(/ /g, "||nbsp|");
  let reg = /((https|http|ftp|rtsp|mms)?:\/\/)?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}\.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6})(:[0-9]{1,5})?((\/?)\b([-a-zA-Z0-9@;():%,_\+.~#?&\/\/=]*))?/gi;
  // let reg = /(http(s)?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.([a-z]{2,6})?\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/gi;
  str = str.replace(reg, function (a, b, c) {
    let url = a;   
    if (
      !(
        url.indexOf("ftp") >= 0 ||
        url.indexOf("http") >= 0 ||
        url.indexOf("https") >= 0
      )
    ) {
      url = "https://" + a;
    }
    return '<a href="javascript:void(0);">' + a + "</a>";
  });
  str = str.replace(/\|\|nbsp\|/g, "&nbsp;");
  
  return str;
}
import "@/common/pinyin";
export const toUrl = {
  inserted(el, binding) {
    let content = el.innerHTML;
    content = resetUrl(content);
    el.innerHTML = content;
  },
}
let resetUrl = function (str) {
  str = str.replace(/ /g, "||nbsp|");
  let reg = /((https|http|ftp|rtsp|mms)?:\/\/)?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}\.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6})(:[0-9]{1,5})?((\/?)(\/?[0-9a-z_!~*^'().;?/:@&=+$,%#-]+)+)?/gi;
  // var Expression="(?:(?:http|https)://)?[\\w./?:@=#-]+\\.([\\w./?:@=#-])*"
  // var reg=new RegExp(Expression);
  // let reg = /(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/
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
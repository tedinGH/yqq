import "@/common/pinyin";
export const keyWord = {
  inserted(el, binding) {
    let content = el.innerHTML;
    let key = binding.value;
    let m = PinyinMatch.match(content, key);
    if (m) content = redFont(content, m[0], m[1]);
    content = resetUrl(content)
    el.innerHTML = content;
  },
  update(el, binding) {
    let content = el.innerHTML;
    let key = binding.value;
    let m = PinyinMatch.match(content, key);
    if (m) content = redFont(content, m[0], m[1]);
    content = resetUrl(content)
    el.innerHTML = content;
  },
}

let redFont = function (str, start, end) {
  return (
    str.substring(0, start) +
    '<span class="search-key">' +
    str.substring(start, end + 1) +
    "</span>" +
    str.substring(end + 1)
  );
}
let resetUrl = function (str) {
  // str = str.replace(/ /g, "||nbsp|");
  str = str.replace(/&amp;/g, "&");
  let reg = /((https|http|ftp|rtsp|mms)?:\/\/)?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}\.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6})(:[0-9]{1,5})?((\/?)\b([-a-zA-Z0-9@;():%,_\+.~#?&\/\/=]*))?/gi;
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
  // str = str.replace(/\|\|nbsp\|/g, "&nbsp;");
  return str;
}
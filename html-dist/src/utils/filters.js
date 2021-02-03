const filters = {
  filterPhone(value) {
    // 手机号码过滤显示
    if(!value) return 'null'
    let start,
        end = value.substr(value.length-3, 3),
        str = ''
    if (value.length > 10) {
      start = value.substr(0, 5)
      for(let i=1;i<value.length-7;i++){
        str += '*'
      }
    }else{
      start = value.substr(0, 4)
      for(let i=1;i<value.length-6;i++){
        str += '*'
      }
    }
    return start + str + end
  },
  filterEmail(value) {
    // 邮箱号过滤显示
    if (String(value).indexOf('@') == -1) return value
    let str = value.split('@'),
        _s = ''
    for(let i=1;i<str[0].length - 1;i++){
      _s += '*'
    }
    _s = str[0].substr(0,1) + _s + str[0].substr(str[0].length - 1,1)
    return _s + '@' + str[1]
  },
  filterMoney(value,n) {
    if(!value) return 0.00
    // 金额过滤显示
    n = n > 0 && n <= 20 ? n : 2;   
    value = parseFloat((value + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
    var l = value.split(".")[0].split("").reverse(),   
    r = value.split(".")[1],
    t = "";   
    for(var i = 0; i < l.length; i ++ ){
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
    }
    return t.split("").reverse().join("") + "." + r;   
  },
  filterPercentage(value) {
    // 百分比过滤显示
    return (value*100).toFixed(2) + "%";   
  },
  filterDate(date, fmt = 'YYYY-MM-DD HH:mm:ss') {
    if (!date) return '';
    if (typeof date === 'string') date = new Date(date.replace(/-/g, '/'));
    if (typeof date === 'number') date = new Date(date);
    var o = {
      'M+': date.getMonth() + 1,
      'D+': date.getDate(),
      'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3), 
      'S': date.getMilliseconds()
    }
    var week = {
      '0': '\u65e5',
      '1': '\u4e00',
      '2': '\u4e8c',
      '3': '\u4e09',
      '4': '\u56db',
      '5': '\u4e94',
      '6': '\u516d'
    }
    if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    if (/(E+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + ''])
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  },
  filterDate2(timestamp) {
    let time = new Date(timestamp)
    let str
    let format = (fmt) => {
      const o = {
        "y+": time.getFullYear(),
        "M+": time.getMonth()+1,
        "d+": time.getDate(),
        "H+": time.getHours(),
        "m+": time.getMinutes(),
        "s+": time.getSeconds()
      }
      for(var k in o) {
        if(new RegExp("("+k+")", "g").test(fmt)) {
          const len = RegExp.$1.length
          fmt = fmt.replace(RegExp.$1, len==1?o[k]:("00"+o[k]).substr(-len))
        }
      }
      return fmt
    }
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate()-1)
    const beforeYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate()-2)
    const monday = new Date(today)
    monday.setDate(today.getDate()-(today.getDay()?today.getDay()-1:6))
    const year = new Date(now.getFullYear(),0,1)
    if(time.getTime() > today.getTime()) {
      str = ""
    } else if(time.getTime() > yesterday.getTime()) {
      str = "昨天"
    } else if(time.getTime() > beforeYesterday.getTime()) {
      str = "前天"
    } else if(time.getTime() > monday.getTime()) {
      const week = {"0":"周日","1":"周一","2":"周二","3":"周三","4":"周四","5":"周五","6":"周六"}
      str = week[time.getDay()+""]
    } else if(time.getTime() >= year.getTime()){
      const hour = ["凌晨","早上","下午","晚上"]
      const h=time.getHours()
      if(h==12) str = "中午"
      else str = hour[parseInt(h/6)];
      str = format("MM月dd日 ") + str
    }else{
      const hour = ["凌晨","早上","下午","晚上"]
      const h=time.getHours()
      if(h==12) str = "中午"
      else str = hour[parseInt(h/6)]
      str = format("yy年MM月dd日 ") + str
    }
    str += format("HH:mm")
    return str
  }
}
export default filters

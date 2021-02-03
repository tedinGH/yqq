export const timeUtil = {
  add0(m) {
    return m < 10 ? "0" + m : m;
  },
  /**
   * 时间戳转时间 精确到分钟
   * @param {Long} timeStamp 毫秒级别时间戳
   */
  toTime(timeStamp) {
    var time = new Date(timeStamp);
    // var y = time.getFullYear()
    // var m = time.getMonth() + 1
    // var d = time.getDate()
    var h = time.getHours();
    var mm = time.getMinutes();
    // var s = time.getSeconds()
    return this.add0(h) + ":" + this.add0(mm);
  },
  /**
   * 时间戳转日期
   * @param {Long} timeStamp
   */
  toDate(timeStamp) {
    var time = new Date(timeStamp);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    // var h = time.getHours()
    // var mm = time.getMinutes()
    // var s = time.getSeconds()
    return y + "-" + this.add0(m) + "-" + this.add0(d);
  },
  /**
   * 获取当前时间
   */
  nowDate() {
    var time = new Date();
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    // var h = time.getHours()
    // var mm = time.getMinutes()
    // var s = time.getSeconds()
    return y + "-" + this.add0(m) + "-" + this.add0(d);
  },
  /**
   * 获取当前时间戳
   */
  nowTimestamp() {
    return new Date().getTime();
  },
  getDateRangeTimestamp(range, mode) {
    let rangeDay = 0,
      startTime = new Date().getTime(),
      endTime = new Date().getTime(),
      year = new Date().getFullYear(),
      month = new Date().getMonth(),
      todayTimeStamp = new Date(new Date().toLocaleDateString()).getTime(),
      todayNumber = new Date().getDate(), // 当天是这个月第几天;
      oneDayStamp = 86400000; // 24 * 3600 * 1000;

    // // 当月天数
    // const getThisMonthDays = (num = 1) => {
    //   var month = month + num;
    //   var d = new Date(year, month, 0).getDate();
    //   return d.getDate();
    // };

    switch (range) {
      case "today":
        startTime = todayTimeStamp;
        endTime = todayTimeStamp + oneDayStamp - 1;
        break;
      case "yesterday":
        startTime = todayTimeStamp - oneDayStamp;
        endTime = todayTimeStamp - 1;
        break;
      case "last7day":
        startTime = todayTimeStamp - oneDayStamp * 7;
        endTime = todayTimeStamp + oneDayStamp - 1;
        break;
      case "thisMonth":
        startTime = todayTimeStamp - oneDayStamp * (todayNumber - 1);
        endTime = todayTimeStamp + oneDayStamp - 1;
        break;
      case "lastMonth":
        startTime = new Date(year, month, -new Date(year, month, 0).getDate() + 1).getTime();
        // 上个月 + 上个月的总天数
        //  new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1) + new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate()
        endTime = new Date(new Date(year, month - 1, 1)).getTime() + new Date(year, month, 0).getDate() * oneDayStamp - 1;
        break;
      case "last30day":
        startTime = todayTimeStamp - oneDayStamp * 30;
        endTime = todayTimeStamp + oneDayStamp - 1;
        break;
      default:
        break;
    }

    console.log(startTime, endTime);

    return {
      startTime,
      endTime
    };
  }
};

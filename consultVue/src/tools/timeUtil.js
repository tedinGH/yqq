export const timeUtil = {
    add0(m) { return m < 10 ? '0' + m : m },
    /**
     * 时间戳转时间 精确到分钟
     * @param {Long} timeStamp 毫秒级别时间戳 
     */
    toTime(timeStamp) {
        var time = new Date(timeStamp);
        // var y = time.getFullYear();
        // var m = time.getMonth() + 1;
        // var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        // var s = time.getSeconds();
        return this.add0(h) + ':' + this.add0(mm);
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
        // var h = time.getHours();
        // var mm = time.getMinutes();
        // var s = time.getSeconds();
        return y + '-' + this.add0(m) + '-' + this.add0(d);
    },
    /**
     * 获取当前时间
     */
    nowDate() {
        var time = new Date();
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        // var h = time.getHours();
        // var mm = time.getMinutes();
        // var s = time.getSeconds();
        return y + '-' + this.add0(m) + '-' + this.add0(d);
    },
    /**
     * 获取当前时间戳
     */
    nowTimestamp(){
        return new Date().getTime();
    }
}
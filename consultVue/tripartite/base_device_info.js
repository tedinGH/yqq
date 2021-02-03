/**
 * 获取基础信息
 */
let baseDeviceInfo = {
    /**
     * 获取当前访问URL
     */
    getUrl: function () {
      var url = window.location.href;
      return url
    },
    /**
     * 获取JS参数
     */
    getJsParam: function () {
      var js = document.getElementsByTagName("script");
      let url = undefined;
      for (let i = 0; i < js.length; i++) {
        let a = js[i];
        if (a.src.startsWith(BASE_URL.VISITOR_URL)) {
          url = a.src;
          break;
        }
      }
      //得到当前引用a.js一行的script，并把src用'?'分隔成数组
      if (url) {
        var arraytemp = url.split('?');
        var obj = new Object();
        //如果不带参数，则不执行下面的代码
        if (arraytemp.length > 1) {
          var params = arraytemp[1].split('&');
          for (var i = 0; i < params.length; i++) {
            var parm = params[i].split("=");
            //将key和value定义给obj
            obj[parm[0]] = parm[1];
          }
        }
        return obj;
      } else {
        return;
      }
    },
    /**
     * 获取访问者设备信息
     */
    getDevice: function () {
      let device = {
        isMobile: false,//是否手机设备
        type: 1,
        device: navigator.userAgent,
        platform: navigator.platform,//操作系统
      }
      if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) {
        device.isMobile = true;
        device.type = 2;
      }
      return device;
    },
    /**
     * 获取站点页面标题
     */
    getWebTitle: function () {
      return document.title;
    },
  }
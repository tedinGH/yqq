import api from '@/api'
import { Util } from '@/utils/utils';

export default {
  name: 'download',
  data() {
    return {
      device: Util.getEnvironmet(),
      isWx: false,
      os: "",
      screenWidth: document.body.clientWidth,
      type: this.$route.params.temp,
      androidurl: [],
      elseandroidurl: [],
      gugeurl: [],
      iosurl: [],
      osurl: [],
      elseiosurl: [],
      addType: '',
      addFriend: 'bcircleapp://callmainmodel?model=82100&otherID=',
      openFriend: 'bcircleapp://callmainmodel?model=82102&otherID=',
      openFriend2: "bcircleapp://callmainmodel?model=82103&otherID=",
      addGroup: 'bcircleapp://callmainmodel?model=82101&groupID=',
      addAlias: 'bcircleapp://callmainmodel?model=80800&type=0&alias=',
      tellApp:'bcircleapp://callmainmodel'
    }
  },
  methods: {
    urlInit(content) {
      if (content.indexOf("@") > -1) {
        this.tellApp = this.addAlias + content.substr(1);
      } else {
        content = content.replace(/-/g, "/");
        var url = Util.decryptByDES(content, 'echat000');
        console.log(url)
        //旧链接只传userID
        if (url.length == 7) {
          this.addType == 'echat';
          this.tellApp = this.addFriend + url;
        } else {
          var urlArr = url.split('/');
          this.addType = urlArr[0];
          if (this.addType == 'echat') {
            if (urlArr[2] == 'f') {
              this.tellApp = this.addFriend + urlArr[1];
            }
            else if (urlArr[2] == 'q') {
              this.tellApp = this.openFriend + urlArr[1];
            }
            else if (urlArr[2] == 't') {
              this.tellApp = this.openFriend2 + urlArr[1];
            }

          } else if (this.addType == 'group') {
            this.tellApp = this.addGroup + urlArr[1] + '&inviterId=' + urlArr[2];
          }
        }
      }
      setTimeout(() => {
        document.getElementById("test").click();
      }, 500);
    }
  },
  mounted() {
    if (this.type != 0) {
      this.urlInit(this.$route.params.temp);
    } else {
      this.addType = 0;
      setTimeout(function () {
        document.getElementById("test").click();
      }, 500);
    }

    var u = navigator.userAgent;
    var ua = navigator.userAgent.toLowerCase();

    if (ua.match(/MicroMessenger/i) == "micromessenger" || ua.match(/\sQQ/i) == " qq") {
      this.isWx = true;
    }

    var os = (this.device == 'IOS') ? "ios-ipa" : "android";
    this.os = os
    console.log(this.os);

    api.getUrl().then(
      data => {
        this.androidurl = data.filter(item => item.os == "android")
        this.iosurl = data.filter(item => item.os == "ios-ipa")
    
        if (this.androidurl.length == 1 && this.androidurl[0].channelCode == "google_pay") {
          this.gugeurl = this.androidurl.filter(item => item.channelCode == "google_pay")[0].filePath
        }
        if (this.androidurl.length == 1 && this.androidurl[0].channelCode == "official_android") {
          this.gugeurl = this.androidurl.filter(item => item.channelCode == "official_android")[0].filePath
        }

        if (this.iosurl.length == 1 && this.iosurl[0].channelCode == "appstore_ios") {
          this.osurl = this.iosurl.filter(item => item.channelCode == "appstore_ios")[0].filePath
        }
        if (this.iosurl.length == 1 && this.iosurl[0].channelCode == "official_ios") {
          this.osurl = this.iosurl.filter(item => item.channelCode == "official_ios")[0].filePath
        }
        if (this.iosurl.length >= 1 || this.androidurl.length >= 1) {
          this.gugeurl = this.androidurl.filter(item => item.channelCode == "google_pay")[0].filePath
          this.osurl = this.iosurl.filter(item => item.channelCode == "appstore_ios")[0].filePath
          this.elseandroidurl = this.androidurl.filter(item => item.channelCode != "google_pay")
          this.elseiosurl = [{ filePath: 'https://testflight.apple.com/join/evPvwAWm' }]
        }

      }, () => { }
    )

    //修改rem值
    window.onresize = () => {
      window.screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      this.screenWidth = window.screenWidth;
    }
    if (document.body.clientWidth >= 750) {
      document.getElementsByTagName('html')[0].style.fontSize = '100px';
    } else {
      document.getElementsByTagName('html')[0].style.fontSize = 100 * (document.body.clientWidth / 750) + 'px';
    }

  }
}
import QRCode from 'qrcode'
import BcircleHeader from '@/components/common/BcircleHeader.vue'
import BcircleFooter from '@/components/common/BcircleFooter.vue'
import api from '@/api'
import { Util } from '@/utils/utils';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css'
export default {
  data() {
    return {
      filePath: '',
      showService: false,//客服弹层
      showDownload: 0,  //0 隐藏下载二维码 1 安卓下载二维码 2 IOS下载二维码
      showDownload_bottom: 0,  //0 底部隐藏下载二维码 1 安卓下载二维码 2 IOS下载二维码
      showBanner: false,
      screenWidth: document.body.clientWidth,
      mobiDownload: false,
      locales: this.$store.state.langData,
      data: {},
      macData: {},
      imgList: [
        require('../../assets/images/index/banner-1.png'),
        require('../../assets/images/index/panel1-1.png'),
        require('../../assets/images/index/panel1-2.png'),
        require('../../assets/images/index/panel2-1.png'),
        require('../../assets/images/index/panel3-1.png'),
        require('../../assets/images/index/panel4-1.png'),
        require('../../assets/images/index/panel5-1.png'),
        require('../../assets/images/index/panel6-1.png'),
        require('../../assets/images/index/panel6-2.png'),
        require('../../assets/images/index/panel6-3.png'),
        require('../../assets/images/index/panel6-4.png'),
        require('../../assets/images/index/panel6-5.png'),
        require('../../assets/images/index/panel6-6.png')
      ],
      showIOS: false,
      showAndroid: false,
      AndroidList: [],
      IOSList: [
        {
          filePath: 'https://testflight.apple.com/join/evPvwAWm',
          id: "base"
        }
      ],
      showIOS_bottom: false,
      showAndroid_bottom: false,
      AndroidList_bottom: [],
      IOSList_bottom: [
        {
          filePath: 'https://testflight.apple.com/join/evPvwAWm',
          id: "base-bottom"
        }
      ],
    }
  },
  components: {
    BcircleHeader,
    BcircleFooter,
    QRCode
  },
  watch: {
    screenWidth() {
      if (this.screenWidth < 1080) {
        let winWidth = Math.min(window.innerWidth ? window.innerWidth : 1e5, window.screen.availWidth ? window.screen.availWidth : 1e5);
        let size = (winWidth / 7.5);
        document.getElementsByTagName('html')[0].style.fontSize = size + 'px';
        let first = true;
        this.showDownload = 0;

        if (first) {
          this.mobiDownload = true;
          first = false;
        }
      } else {
        this.mobiDownload = false;
      }
    }
  },
  methods: {
    useqrcode(path, id) {
      let canvas = document.getElementById(id);
      canvas.width = 134;
      canvas.height = 134;
      QRCode.toCanvas(canvas, path, error => {
        if (error) console.error(error)
      })
    },
    download(i) {
      if (this.showDownload == i) this.showDownload = 0;
      else this.showDownload = i;
    },
    download_bottom(i) {
      if (this.showDownload_bottom == i) this.showDownload_bottom = 0;
      else this.showDownload_bottom = i;
    },
    gochat() {
      let url = window.location.origin + '/dist/' + this.$store.state.language + '/#/scan-login';
      var subWindow = window.open(url, '_blank');
      //监听 message 事件
      window.addEventListener('message', function (e) {
        if (e.data == 'logout') sessionStorage.removeItem("eUcShEaRt");
        window.location.reload();
      })
			/*Util.checkCookie("eUcShEaRt").then(
				() => { 
					window.location = window.location.origin + '/otc/#/';
				},
				()=>{
					let info = sessionStorage.getItem("eUcShEaRt");
			        if (info) {
			          	//window.location.href = window.location.origin + '/otc/#/';
			          	window.open(window.location.origin + '/otc/#/', '_blank');
			        } else {
			          	//this.$router.push({name: 'scan-login'});
			          	let url = window.location.origin + '/dist/' + this.$store.state.language + '/#/scan-login';
						var subWindow = window.open(url, '_blank');
				        //监听 message 事件
				        window.addEventListener('message', function (e) {
				        	if(e.data=='logout') sessionStorage.removeItem("eUcShEaRt");
				            window.location.reload();
				        })
			        }
				}
			);*/
    },
    hideDownload() {
      this.mobiDownload = false;
    },
    goDownloadIOS() {
      if (/(Android)/i.test(navigator.userAgent)) {
        this.$toast(this.locales.android_download);
        return false;
      }
      window.location.href = this.filePath;
    },
    goDownloadAndriod() {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        this.$toast(this.locales.ios_download);
        return false;
      }
      window.location.href = this.filePath;
    },
    qrcodeInit(list) {
      if (list && list.length) {
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          this.useqrcode(item.filePath, item.id);
        }
      }
    },
    createQrCode() {
      api.loadUrl({ channelCode: 'windows' }).then(
        data => {
          for (let i = 0; i < data.length; i++) {
            if (data[i].os == "windows") {
              this.data = data[i];
            }
            if (data[i].os == "mac") {
              this.macData = data[i];
            }
          }
          this.showBanner = true;
        }, () => { }
      )
      //获取安卓IOS下载
      api.getUrl({}).then(
        data => {
          for (let i = 0; i < data.length; i++) {

            let item = data[i];
            // 1 顶部
            item.id = "qrcodeId_" + (i + 1);
            if (item.os == "ios-ipa") {
              //显示苹果商店
              if (item.channelCode == "appstore_ios") {
                setTimeout(() => {
                  this.showIOS = true;
                  this.useqrcode(item.filePath, "apple");
                }, 100)
              }
              //  else {
              //   if (item.channelCode == "official_ios") {
              //     item.filePath = "https://testflight.apple.com/join/evPvwAWm";
              //   }
              //   this.IOSList.push(item)
              // }
              // console.log(this.IOSList);

            }
            if (item.os == "android") {
              //显示谷歌商店
              if (item.channelCode == "google_pay") {
                setTimeout(() => {
                  this.showAndroid = true;
                  this.useqrcode(item.filePath, "google");
                }, 100)
              } else {
                this.AndroidList.push(item)
              }
            }

            // 2底部
            let item_bottom = JSON.parse(JSON.stringify(data[i]));
            item_bottom.id = "bottom" + (i + 1);
            if (item_bottom.os == "ios-ipa") {
              //显示苹果商店
              if (item_bottom.channelCode == "appstore_ios") {
                setTimeout(() => {
                  this.showIOS_bottom = true;
                  this.useqrcode(item_bottom.filePath, "apple_bottom");
                }, 100)
              }
              //  else {
              //   if (item_bottom.channelCode == "official_ios") {
              //     item_bottom.filePath = "itms-services://?action=download-manifest&url=" + item_bottom.filePath;
              //   }
              //   this.IOSList_bottom.push(item_bottom)
              // }
            }
            if (item_bottom.os == "android") {
              //显示谷歌商店
              if (item_bottom.channelCode == "google_pay") {
                setTimeout(() => {
                  this.showAndroid_bottom = true;
                  this.useqrcode(item_bottom.filePath, "google_bottom");
                }, 100)
              } else {
                this.AndroidList_bottom.push(item_bottom)
              }
            }


          }
          setTimeout(() => {
            this.qrcodeInit(this.AndroidList);
            this.qrcodeInit(this.IOSList);

            this.qrcodeInit(this.AndroidList_bottom);
            this.qrcodeInit(this.IOSList_bottom);
            //this.useqrcode(this.filePath, "qrcode");
          }, 100)
        }, () => { }
      )
    },
    copy(text) {
      let oInput = document.createElement('input');
      oInput.value = text;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy");
      document.body.removeChild(oInput);
      this.$toast(this.$t('msg').tip.copy_success);
    },
  },
  mounted() {

    //修改rem值
    window.onresize = () => {
      window.screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      this.screenWidth = window.screenWidth;
    }

    let size = (this.screenWidth / 7.5);
    document.getElementsByTagName('html')[0].style.fontSize = size + 'px';

    if (this.screenWidth < 1080) this.mobiDownload = true;

    let lang = localStorage.getItem('lang');

    if (lang) {
      //lang = lang.toLowerCase().replace(/_/,"-");
      this.filePath = window.location.origin + '/dist/' + lang + '/#/download/0/0';
    } else {
      this.filePath = window.location.origin + '/dist/en_US/#/download/0/0';
    }

    this.createQrCode();

    //隐藏二维码框

    //隐藏二维码框
    document.onclick = () => {
      this.showDownload = 0;
      this.showDownload_bottom = 0;
    }

    new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      direction: 'vertical',
      slidesPerView: 1,
      paginationClickable: true,
      spaceBetween: 30,
      mousewheelControl: true
    })

    //按Esc或X关闭弹层
    document.onkeydown = (e) => {
      var e = e || window.event;  //标准化事件处理
      console.log(e.keyCode)
      if (e.keyCode == 27 || e.keyCode == 88) this.showService = false;
    }

  }
}
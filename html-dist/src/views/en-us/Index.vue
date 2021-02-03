<template>
  <div class="wrap">
    <header class="index-header">
      <bcircle-header ref="Header"></bcircle-header>
    </header>
    <div class="version-wrapper">
      <!-- 轮播图 -->
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide first">
            <div class="container">
              <div class="content-right" v-lazy:background-image="imgList[0]"></div>
              <div class="content-left">
                <h3 class="title en">Communication, in everywhere</h3>
                <div class="description en" v-show="showDownload==0">
                  <p>Safe, reliable and comprehensive;</p>
                  <p>Powering the experience with high-performance features;</p>
                  <p>Chat social is in your hands;</p>
                  <p>Download EchatAPP now and speak freely anytime, anywhere.</p>
                  <div class="download en">Installation package download:</div>
                </div>
                <div class="qrcode-box en" v-show="showDownload != 0">
                  <p>{{ showDownload == 1 ? 'Android' : 'IOS' }} scan QR code download</p>
                  <ul>
                    <li class="scan-code" v-show="showDownload==1 && showAndroid">
                      <canvas id="google"></canvas>
                      <p>Google Play Download</p>
                    </li>
                    <li class="scan-code" v-show="showDownload==2 && showIOS">
                      <canvas id="apple"></canvas>
                      <p>App Store Download</p>
                    </li>
                    <li class="scan-code" v-for="(item, index) in AndroidList" :key="index" v-show="showDownload==1">
                      <canvas :id="item.id"></canvas>
                      <p>Beta version Download </p>
                    </li>
                    <li class="scan-code" v-for="(item, index) in IOSList" :key="index" v-show="showDownload==2">
                      <canvas :id="item.id"></canvas>
                      <p>Beta version Download </p>
                    </li>
                  </ul>
                </div>
                <ul class="download-type">
                  <li class="download-item" @click.stop="download(1)">
                    <i class="icon android"></i>
                    <div class="en">Download for<br />Android</div>
                    <div class="line"></div>
                  </li>
                  <li class="download-item" @click.stop="download(2)">
                    <i class="icon iphone"></i>
                    <div class="en">Download for<br />IOS</div>
                    <div class="line"></div>
                  </li>
                  <li class="download-item">
                    <a :href="data.filePath || 'javascript:;'">
                      <i class="icon win"></i>
                      <div class="en">Download for<br />Windows</div>
                    </a>
                    <div class="line"></div>
                  </li>
                  <li class="download-item">
                    <a :href="macData.filePath || 'javascript:;'">
                      <i class="icon mac"></i>
                      <div class="en">Download for<br />Mac</div>
                    </a>
                    <div class="line"></div>
                  </li>
                  <li class="download-item" @click="gochat">
                    <i class="icon web"></i>
                    <div class="en">Web chat<br />&emsp;</div>
                    <div class="line"></div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="mobi-download" v-show="mobiDownload">
              <i class="mobi-logo"></i>
              <i class="mobi-close" @click="hideDownload"></i>
              <div class="text">
                <p>EchatAPP</p>
                <p>Encrypt chat | Cryptocurrency Exchange</p>
              </div>
              <a :href="filePath||'javascript:;'" class="download-btn">Download</a>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="panel panel2">
              <h3 class="title en">People nearby</h3>
              <div class="clearfix">
                <div class="panel1-item">
                  <img class="panel1-img" src="../../assets/images/index/panel1-2.png">
                  <div class="description en">
                    <p>Looking for boys?</p>
                    <p>Looking for girls?</p>
                    <p>Nearby people function.</p>
                    <p>Let communication be no<br> longer restricted to friends.</p>
                  </div>
                </div>
                <div class="panel1-item">
                  <img class="panel1-img" src="../../assets/images/index/panel1-1.png">
                  <div class="description en">
                    <p>Finding like-minded confidants.</p>
                    <p>Unlimited business </p>
                    <p>opportunities are in your hands.</p>
                    <p>Break the last communication<br> barrier for you.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="mobi-download" v-show="mobiDownload">
              <i class="mobi-logo"></i>
              <i class="mobi-close" @click="hideDownload"></i>
              <div class="text">
                <p>EchatAPP</p>
                <p>Encrypt chat | Cryptocurrency Exchange</p>
              </div>
              <a :href="filePath||'javascript:;'" class="download-btn">Download</a>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="panel panel3">
              <div class="panel2-item floatR">
                <h3 class="title en">Chat information security</h3>
                <div class="description">
                  <p>Protect your privacy with </p>
                  <p>point-to-point encryption, any third party,</p>
                  <p>EchatAPP can't get your message and call content.</p>
                </div>
              </div>
              <div class="floatL">
                <img class="panel2-img" src="../../assets/images/index/panel2-1.png">
              </div>
            </div>
            <div class="mobi-download" v-show="mobiDownload">
              <i class="mobi-logo"></i>
              <i class="mobi-close" @click="hideDownload"></i>
              <div class="text">
                <p>EchatAPP</p>
                <p>Encrypt chat | Cryptocurrency Exchange</p>
              </div>
              <a :href="filePath||'javascript:;'" class="download-btn">Download</a>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="panel panel4">
              <div class="panel3-item floatL en">
                <h3 class="title en">Multi-end random<br> switching</h3>
                <div class="description en">
                  <p>Multi-level sync your friends list</p>
                  <p>and chat content,</p>
                  <p>Allows you to switch chat</p>
                  <p> devices at any time.</p>
                </div>
              </div>
              <div class="floatR">
                <img class="panel3-img en" src="../../assets/images/index/panel3-1.png">
              </div>
            </div>
            <div class="mobi-download" v-show="mobiDownload">
              <i class="mobi-logo"></i>
              <i class="mobi-close" @click="hideDownload"></i>
              <div class="text">
                <p>EchatAPP</p>
                <p>Encrypt chat | Cryptocurrency Exchange</p>
              </div>
              <a :href="filePath||'javascript:;'" class="download-btn">Download</a>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="panel panel5 en">
              <div class="panel4-item floatR en">
                <h3 class="title en">Diverse social approach</h3>
                <div class="description">
                  <p>Private chat, secret, group chat,</p>
                  <p> voice, video call, circle of friends.</p>
                  <p>People nearby</p>
                  <p>Social styles are available,</p>
                  <p> group chat members are not limited.</p>
                </div>
              </div>
              <div class="floatL">
                <img class="panel4-img" src="../../assets/images/index/panel4-1.png">
              </div>
            </div>
            <div class="mobi-download" v-show="mobiDownload">
              <i class="mobi-logo"></i>
              <i class="mobi-close" @click="hideDownload"></i>
              <div class="text">
                <p>EchatAPP</p>
                <p>Encrypt chat | Cryptocurrency Exchange</p>
              </div>
              <a :href="filePath||'javascript:;'" class="download-btn">Download</a>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="panel panel6">
              <div class="panel5-item floatL">
                <h3 class="title en">Privacy protection</h3>
                <div class="description">
                  <p>Self-destruct timer, prohibit forwarding.</p>
                  <p>Screen capture reminder, burn after reading.</p>
                  <p>Come and go without leaving traces. </p>
                  <p>We all think of it for you, feel free to speak at any time.</p>
                </div>
              </div>
              <div class="floatR">
                <img class="panel5-img" src="../../assets/images/index/panel5-1.png">
              </div>
            </div>
            <div class="mobi-download" v-show="mobiDownload">
              <i class="mobi-logo"></i>
              <i class="mobi-close" @click="hideDownload"></i>
              <div class="text">
                <p>EchatAPP</p>
                <p>Encrypt chat | Cryptocurrency Exchange</p>
              </div>
              <a :href="filePath||'javascript:;'" class="download-btn">Download</a>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="panel panel7 en">
              <div class="overflow">
                <h3 class="title en">Applicable industry</h3>
                <div class="description en">
                  <p>Personal social, corporate, media entertainment, finance</p>
                  <p>Services, education, health care, triggering the value of real-time video </p>
                  <p>communications across multiple industries to drive interaction and tremendous productivity</p>
                </div>
                <ul>
                  <li class="panel6-list-item en">
                    <img class="item-icon" v-lazy="imgList[7]">
                    <p class="item-title">Personal social</p>
                  </li>
                  <li class="panel6-list-item en">
                    <img class="item-icon" v-lazy="imgList[8]">
                    <p class="item-title">Enterprise</p>
                  </li>
                  <li class="panel6-list-item en">
                    <img class="item-icon" v-lazy="imgList[9]">
                    <p class="item-title">Media entertainment</p>
                  </li>
                  <li class="panel6-list-item en">
                    <img class="item-icon" v-lazy="imgList[10]">
                    <p class="item-title">Financial Services</p>
                  </li>
                  <li class="panel6-list-item en">
                    <img class="item-icon" v-lazy="imgList[11]">
                    <p class="item-title">Education</p>
                  </li>
                  <li class="panel6-list-item en">
                    <img class="item-icon" v-lazy="imgList[12]">
                    <p class="item-title">Health care</p>
                  </li>
                </ul>
              </div>
              <!-- <div class="overflow communi mt35"> -->
              <div class="overflow communi">

                <h3 class="title-Communicate" v-show="!showDownload_bottom">Communication, in everywhere</h3>


                <div class="qrcode-box-bottom en" :class="{active:showDownload_bottom==1}" v-show="showDownload_bottom">
                  <p>{{showDownload_bottom==1 ? 'Android' : 'IOS'}} scan QR code download</p>
                  <ul>

                    <li class="scan-code" v-show="showDownload_bottom==1 && showAndroid_bottom">
                      <canvas id="google_bottom"></canvas>
                      <p>Google Play Download</p>
                    </li>

                    <li class="scan-code" v-show="showDownload_bottom==2 && showIOS_bottom">
                      <canvas id="apple_bottom"></canvas>
                      <p>App Store Download</p>
                    </li>

                    <li class="scan-code" v-for="(item, index) in AndroidList_bottom"  :key="index" v-show="showDownload_bottom==1">
                      <canvas :id="item.id"></canvas>
                      <p>Beta version Download </p>
                    </li>
                    <li class="scan-code" v-for="(item, index) in IOSList_bottom"  :key="index" v-show="showDownload_bottom==2">
                      <canvas :id="item.id"></canvas>
                      <p>Beta version Download </p>
                    </li>
                  </ul>
                </div>


                <ul>
                  <li class="panel6-box-item en" @click.stop="download_bottom(1)">
                    <div class="box">
                      <i class="android" :class="{active: showDownload_bottom==1}"></i>
                      <p class="item-title">Andriod</p>
                    </div>
                  </li>
                  <li class="panel6-box-item en" @click.stop="download_bottom(2)">
                    <div class="box">
                      <i class="ios" :class="{active: showDownload_bottom==2}"></i>
                      <p class="item-title">IOS</p>
                    </div>
                  </li>
                  <li class="panel6-box-item en">
                    <div class="box">
                      <a :href="data.filePath || 'javascript:;'">
                        <i class="windows"></i>
                        <p class="item-title">Windows</p>
                      </a>
                    </div>
                  </li>
                  <li class="panel6-box-item en">
                    <div class="box">
                      <a :href="macData.filePath || 'javascript:;'">
                        <i class="mac"></i>
                        <p class="item-title">Mac</p>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="mobi-download" v-show="mobiDownload">
              <i class="mobi-logo"></i>
              <i class="mobi-close" @click="hideDownload"></i>
              <div class="text">
                <p>EchatAPP</p>
                <p>Encrypt chat | Cryptocurrency Exchange</p>
              </div>
              <a :href="filePath||'javascript:;'" class="download-btn">Download</a>
            </div>
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination" id="parent"></div>
      </div>
    </div>
    <!-- <a class="service en" href="javascript:;" @click="showService=true"> <i></i>
      <span>Contact us</span>
    </a> -->
    <a class="service" target="_blank" href="https://www.santapp.com/visitor/#/728324/https%3A%2F%2Fwww.echatapp.com/0/0/1400257192/75febc070478bf200dd559668e403124/EchatApp" @click="showService=true"> 
      <i></i>
      <span>Contact us</span>
    </a>
    <!-- <div class="service-layer" v-show="showService">
      <div class="service-bg" @click="showService=false"></div>
      <div class="service-content" @click.stop=";">
        <div class="service-title">
          Contact us<i @click="showService=false"></i>
        </div>
        <div class="service-detail">
          <p class="mb">Thank you for your support</p>
          <p class="mb">We cannot grow without your advice and support<br>If you would like to give us valuable comments
            or Suggestions, or would like to contact us</p>
          <p>You can contact us through the following ways</p>
        </div>
        <div class="service-info">
          <img src="../../assets/images/index/service-letter.png">
          <p @click="copy('gapk@ecahtapp.com')">gapk@ecahtapp.com</p>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
  import logic from '../mixins/index';
  export default {
    name: 'index',
    mixins: [logic]
  }

</script>

<style lang="scss" scoped>
  @import "../../assets/scss/index.scss";

</style>

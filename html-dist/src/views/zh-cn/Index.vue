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
            <div class="container" v-if="showBanner">
              <div class="content-right" v-lazy:background-image="imgList[0]"></div>
              <div class="content-left">
                <h3 class="title">沟通，无处不在</h3>

                <div class="description" v-show="!showDownload">
                  <p>安全、可靠、全面，</p>
                  <p>通过高性能功能为体验提供动力，</p>
                  <p>聊天社交掌握在你的手里，</p>
                  <p>立即下载EchatAPP，随时随地畅所欲言！</p>
                  <div class="download">安装包下载：</div>
                </div>

                <div class="qrcode-box" v-show="showDownload">
                  <p>{{showDownload==1 ? '安卓' : 'IOS'}}扫描二维码下载</p>
                  <ul>
                    <li class="scan-code" v-show="showDownload==1 && showAndroid">
                      <canvas id="google"></canvas>
                      <p>谷歌商店下载</p>
                    </li>
                    <li class="scan-code" v-show="showDownload==2 && showIOS">
                      <canvas id="apple"></canvas>
                      <p>苹果商店下载</p>
                    </li>
                    <li class="scan-code" v-for="(item, index) in AndroidList" :key="index" v-show="showDownload==1">
                      <canvas :id="item.id"></canvas>
                      <p>体验版下载</p>
                    </li>
                    <li class="scan-code" v-for="(item, index) in IOSList" :key="index" v-show="showDownload==2">
                      <canvas :id="item.id"></canvas>
                      <p>体验版下载</p>
                    </li>
                  </ul>
                </div>

                <ul class="download-type">
                  <li class="download-item" @click.stop="download(1)">
                    <i class="icon android" :class="{active: showDownload==1}"></i>
                    <div>安卓版下载</div>
                    <div class="line"></div>
                  </li>
                  <li class="download-item" @click.stop="download(2)">
                    <i class="icon iphone" :class="{active: showDownload==2}"></i>
                    <div>IOS版下载</div>
                    <div class="line"></div>
                  </li>
                  <li class="download-item">
                    <a :href="data.filePath || 'javascript:;'">
                      <i class="icon win"></i>
                      <div>Windows版下载</div>
                    </a>
                    <div class="line"></div>
                  </li>
                  <li class="download-item">
                    <a :href="macData.filePath || 'javascript:;'">
                      <i class="icon mac"></i>
                      <div>Mac版下载</div>
                    </a>
                    <div class="line"></div>
                  </li>
                  <li class="download-item" @click="gochat">
                    <i class="icon web"></i>
                    <div>网页版聊天</div>
                    <div class="line"></div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="mobi-download" v-if="mobiDownload">
              <i class="mobi-logo"></i>
              <i class="mobi-close" @click="hideDownload"></i>
              <div class="text">
                <p>EchatAPP</p>
                <p>私密社交 多端免费聊天</p>
              </div>
              <a :href="filePath||'javascript:;'" class="download-btn">下载</a>
            </div>
          </div>

          <div class="swiper-slide">
            <div class="panel panel2">
              <h3 class="title">附近的人</h3>
              <div class="clearfix">
                <div class="panel1-item">
                  <img class="panel1-img" v-lazy="imgList[2]">
                  <div class="description">
                    <p>找男生？找女生？ </p>
                    <p>附近的人功能，</p>
                    <p>让沟通不再制约于好友之间。</p>
                  </div>
                </div>
                <div class="panel1-item">
                  <img class="panel1-img" v-lazy="imgList[1]">
                  <div class="description">
                    <p>寻找身边志同道合的知己，</p>
                    <p>无限商机尽在你手，</p>
                    <p>为你打破最后一道沟通屏障。</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="mobi-download" v-if="mobiDownload">
              <i class="mobi-logo"></i>
              <i class="mobi-close" @click="hideDownload"></i>
              <div class="text">
                <p>EchatAPP</p>
                <p>私密社交 多端免费聊天</p>
              </div>
              <a :href="filePath||'javascript:;'" class="download-btn">下载</a>
            </div>
          </div>

          <div class="swiper-slide">
            <div class="panel panel3">
              <div class="panel2-item floatR">
                <h3 class="title">聊天信息安全</h3>
                <div class="description">
                  <p>采用点对点加密技术保障您的隐私，任何第三方，</p>
                  <p>包括EchatAPP都无法取得您的讯息与通话内容。</p>
                </div>
              </div>
              <div class="floatL">
                <img class="panel2-img" v-lazy="imgList[3]">
              </div>
            </div>
            <div class="mobi-download" v-if="mobiDownload">
              <i class="mobi-logo"></i>
              <i class="mobi-close" @click="hideDownload"></i>
              <div class="text">
                <p>EchatAPP</p>
                <p>私密社交 多端免费聊天</p>
              </div>
              <a :href="filePath||'javascript:;'" class="download-btn">下载</a>
            </div>
          </div>

          <div class="swiper-slide">
            <div class="panel panel4">
              <div class="panel3-item floatL">
                <h3 class="title">多端随意切换</h3>
                <div class="description">
                  <p>多端同步您的好友名单和聊天内容，</p>
                  <p>让您可以随时切换聊天的装置。</p>
                </div>
              </div>
              <div class="floatR">
                <img class="panel3-img" v-lazy="imgList[4]">
              </div>
            </div>
            <div class="mobi-download" v-if="mobiDownload">
              <i class="mobi-logo"></i>
              <i class="mobi-close" @click="hideDownload"></i>
              <div class="text">
                <p>EchatAPP</p>
                <p>私密社交 多端免费聊天</p>
              </div>
              <a :href="filePath||'javascript:;'" class="download-btn">下载</a>
            </div>
          </div>

          <div class="swiper-slide">
            <div class="panel panel5">
              <div class="panel4-item floatR">
                <h3 class="title">多元化社交方式</h3>
                <div class="description">
                  <p>私聊、私密、群聊、语音、视频通话、朋友圈、</p>
                  <p>附近的人</p>
                  <p>社交方式应有尽有，群聊成员不设限</p>
                </div>
              </div>
              <div class="floatL">
                <img class="panel4-img" v-lazy="imgList[5]">
              </div>
            </div>
            <div class="mobi-download" v-if="mobiDownload">
              <i class="mobi-logo"></i>
              <i class="mobi-close" @click="hideDownload"></i>
              <div class="text">
                <p>EchatAPP</p>
                <p>私密社交 多端免费聊天</p>
              </div>
              <a :href="filePath||'javascript:;'" class="download-btn">下载</a>
            </div>
          </div>

          <div class="swiper-slide">
            <div class="panel panel6">
              <div class="panel5-item floatL">
                <h3 class="title">私密保障</h3>
                <div class="description">
                  <p>自毁计时器、禁止转发、</p>
                  <p>截屏提醒、阅后即焚、</p>
                  <p>来去无踪、不留痕迹、 </p>
                  <p>我们都帮您想到了，随时畅所欲言</p>
                </div>
              </div>
              <div class="floatR">
                <img class="panel5-img" v-lazy="imgList[6]">
              </div>
            </div>
            <div class="mobi-download" v-if="mobiDownload">
              <i class="mobi-logo"></i>
              <i class="mobi-close" @click="hideDownload"></i>
              <div class="text">
                <p>EchatAPP</p>
                <p>私密社交 多端免费聊天</p>
              </div>
              <a :href="filePath||'javascript:;'" class="download-btn">下载</a>
            </div>
          </div>

          <div class="swiper-slide">
            <div class="panel panel7">
              <div class="overflow">
                <h3 class="title">适用行业广泛</h3>
                <div class="description">
                  <p>个人社交、企业、媒体娱乐、金融服务、教育、卫生保健，触发多行业的实时</p>
                  <p>视频通信的价值，以推动互动和巨大的生产力</p>
                </div>
                <ul>
                  <li class="panel6-list-item">
                    <img class="item-icon" v-lazy="imgList[7]">
                    <p class="item-title">个人社交</p>
                  </li>
                  <li class="panel6-list-item">
                    <img class="item-icon" v-lazy="imgList[8]">
                    <p class="item-title">企业</p>
                  </li>
                  <li class="panel6-list-item">
                    <img class="item-icon" v-lazy="imgList[9]">
                    <p class="item-title">媒体娱乐</p>
                  </li>
                  <li class="panel6-list-item">
                    <img class="item-icon" v-lazy="imgList[10]">
                    <p class="item-title">金融服务</p>
                  </li>
                  <li class="panel6-list-item">
                    <img class="item-icon" v-lazy="imgList[11]">
                    <p class="item-title">教育</p>
                  </li>
                  <li class="panel6-list-item">
                    <img class="item-icon" v-lazy="imgList[12]">
                    <p class="item-title">卫生保健</p>
                  </li>
                </ul>
              </div>
              <!-- <div class="overflow communi mt35"> -->
              <div class="overflow communi">

                <h3 class="title-Communicate" v-show="!showDownload_bottom">沟通，无处不在</h3>

                <div class="qrcode-box-bottom" :class="{active:showDownload_bottom==1}" v-show="showDownload_bottom">
                  <p>{{showDownload_bottom==1 ? '安卓' : 'IOS'}}扫描二维码下载</p>
                  <ul>

                    <li class="scan-code" v-show="showDownload_bottom==1 && showAndroid_bottom">
                      <canvas id="google_bottom"></canvas>
                      <p>谷歌商店下载</p>
                    </li>

                    <li class="scan-code" v-show="showDownload_bottom==2 && showIOS_bottom">
                      <canvas id="apple_bottom"></canvas>
                      <p>苹果商店下载</p>
                    </li>

                    <li class="scan-code" v-for="(item, index) in AndroidList_bottom" :key="index" v-show="showDownload_bottom==1">
                      <canvas :id="item.id"></canvas>
                      <p>体验版下载</p>
                    </li>
                    <li class="scan-code" v-for="(item, index) in IOSList_bottom" :key="index" v-show="showDownload_bottom==2">
                      <canvas :id="item.id"></canvas>
                      <p>体验版下载</p>
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
            <div class="mobi-download" v-if="mobiDownload">
              <i class="mobi-logo"></i>
              <i class="mobi-close" @click="hideDownload"></i>
              <div class="text">
                <p>EchatAPP</p>
                <p>私密社交 多端免费聊天</p>
              </div>
              <a :href="filePath||'javascript:;'" class="download-btn">下载</a>
            </div>
          </div>


        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination" id="parent"></div>
      </div>
    </div>
    <!-- <div class="download-moblie">
			<div class="title">随心聊天 随地交易</div>
			<div class="type">
				<a class="btn" href="javascript:;" @click="goDownloadIOS"><i class="icon ios"></i>IOS下载</a>
				<a class="btn" href="javascript:;" @click="goDownloadAndriod"><i class="icon andriod"></i>Android下载</a>
			</div>
		</div> -->
    <a class="service" target="_blank" href="https://www.santapp.com/visitor/#/728324/https%3A%2F%2Fwww.echatapp.com/0/0/1400257192/75febc070478bf200dd559668e403124/EchatApp" @click="showService=true"> 
      <i></i>
      <span>联系我们</span>
    </a>
    <!-- <div class="service-layer" v-show="showService">
      <div class="service-bg" @click="showService=false"></div>
      <div class="service-content" @click.stop=";">
        <div class="service-title">
          联系我们
          <i @click="showService=false"></i>
        </div>
        <div class="service-detail">
          <p class="mb">感谢您对我们的支持</p>
          <p class="mb">我们的成长离不开您的建议和支持<br>如果您希望给我们提供宝贵的意见或建议，或希望与我们联系</p>
          <p>您可以通过以下方式与我们联系</p>
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

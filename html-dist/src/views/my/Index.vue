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
              <div class="content-right my" v-lazy:background-image="imgList[0]"></div>
              <div class="content-left">
                <h3 class="title my">ဆက်သွယ်မူ,မည်သည့်နေရာမဆ</h3>
                <div class="description my" v-show="!showDownload">
                  <p>လုံခြုံမူ,ရုံကြည်မူ,ဘက်စုံ</p>
                  <p>အဆင့်မြင့်လုပ်ဆောင်ချက်အားဖြင့် ခံစားခွင့်စွမ်းအင်များပေးအပ်ခြင်း</p>
                  <p>လူမူဂွန်ရက်</p>
                  <p>အီချက်ကိုချက်ချင်းတောင်းလိုက်ပါ,နေရာအချိန်မရွေးပြောဆိုနိုင်သည်</p>
                  <div class="download">မိုဘိုင္းနည္းစနစ္ကိုေဒါင္းေလာ့ဆြဲျခင္း</div>
                </div>

                <div class="qrcode-box my" v-show="showDownload">
                  <p>မိုဘိုင္းနည္းစနစ္ျဖင့္စကန္ႏွင့္QRဂုတ္္ကိုေဒါင္းေလာ့ဆြဲျခင္း</p>
                  <ul>
                    <li class="scan-code" v-show="showDownload==1 && showAndroid">
                      <canvas id="google"></canvas>
                      <p>Google စတိုး download</p>
                    </li>
                    <li class="scan-code" v-show="showDownload==2 && showIOS">
                      <canvas id="apple"></canvas>
                      <p>IOS စတိုး download</p>
                    </li>
                    <li class="scan-code" v-for="(item, index) in AndroidList" :key="index" v-show="showDownload==1">
                      <canvas :id="item.id"></canvas>
                      <p>ဒအစမ်းသုံးဗား(လ်)ရှင်းကိုဒေါင်းလုတ်(တ်)လုပ်မည်</p>
                    </li>
                    <li class="scan-code" v-for="(item, index) in IOSList" :key="index" v-show="showDownload==2">
                      <canvas :id="item.id"></canvas>
                      <p>အစမ်းသုံးဗား(လ်)ရှင်းကိုဒေါင်းလုတ်(တ်)လုပ်မည်</p>
                    </li>
                  </ul>
                </div>
                <ul class="download-type">
                  <li class="download-item" @click.stop="download(1)">
                    <i class="icon android" :class="{active: showDownload==1}"></i>
                    <div class="my">Android<br>ဒေါင်းလုပ်ဆွဲခြင်း</div>
                    <div class="line"></div>
                  </li>
                  <li class="download-item" @click.stop="download(2)">
                    <i class="icon iphone" :class="{active: showDownload==2}"></i>
                    <div class="my">IOS<br>ဒေါင်းလုပ်ဆွဲခြင်း</div>
                    <div class="line"></div>
                  </li>
                  <li class="download-item">
                    <a :href="data.filePath||'javascript:;'">
                      <i class="icon win"></i>
                      <div class="my">Windows<br>ဒေါင်းလုပ်ဆွဲခြင်း</div>
                    </a>
                    <div class="line"></div>
                  </li>
                  <li class="download-item">
                    <a :href="macData.filePath||'javascript:;'">
                      <i class="icon mac"></i>
                      <div class="my">Mac<br>ဒေါင်းလုပ်ဆွဲခြင်း</div>
                    </a>
                    <div class="line"></div>
                  </li>
                  <li class="download-item" @click="gochat">
                    <i class="icon web"></i>
                    <div class="my">အင္တာနက္တြင္စကားေျပာျခင္း</div>
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
            <div class="panel panel2 my">
              <h3 class="title my">အနီးနားလူ</h3>
              <div class="clearfix">
                <div class="panel1-item my">
                  <img class="panel1-img my" v-lazy="imgList[2]">
                  <div class="description my">
                    <p>ေယာက်ၤားေလး(သို႔)မိန္းကေလးသူငယ္ခ်င္းကိုရွာလိုပါသလား။</p>
                    <p>အနီးနားလူလုပ်ဆောင်ချက်</p>
                    <p>သူငယ်ချင်းများဆက်သွယ်မူကန့်ကွက်ခြင်းမရှိ</p>
                  </div>
                </div>
                <div class="panel1-item my">
                  <img class="panel1-img my" v-lazy="imgList[1]">
                  <div class="description my">
                    <p>အနီးနားလူရှာဖွေခြင်း</p>
                    <p>စီးပွားဆိုင်ရာအခွင့်ကောင်းများလက်ထဲမှာရှိသည်</p>
                    <p>ဆက်ဆံမူအခွင့်ရေးကိုထိုးဖောက်နိုင်ခြင်း</p>
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
                <h3 class="title my">ချက်မတ်ဆေ့လုံခြုံရေး</h3>
                <div class="description my">
                  <p>သင်၏ကိုယ်ရေးကိုယ်သာကိုလျှိူ၀ှက်ထားပေးခြင်း, ဘယ်အရာမဆို</p>
                  <p>အီချက်အပါအ၀င် ကျွန်ုပ်မတ်ဆေ့အားလုံးကိုဖတ်ရူ၍မရနိုင်ပါ</p>
                </div>
              </div>
              <div class="floatL">
                <img class="panel2-img" v-lazy="imgList[3]">
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
            <div class="panel panel4 my">
              <div class="panel3-item floatL my">
                <h3 class="title my">ကိုယ်ကြိုက်သလိုအမျိူး<br>မျိူးပြောင်းလဲမူ</h3>
                <div class="description my">
                  <p>သူငယ်ချင်းများနှင့်ကောင်းမွန်စွာမတ်ဆေ့ပေးပို့နိုင်ပါသည်</p>
                  <p>အချိန်မရွေး ဆက်သွယ်ရေး‌ကိရိယာပြောင်းရွေ့နိုင်ခြင်း</p>
                </div>
              </div>
              <div class="floatR">
                <img class="panel3-img" v-lazy="imgList[4]">
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
            <div class="panel panel5">
              <div class="panel4-item floatR my">
                <h3 class="title my">ဆက်ဆံရေးပုံစံအမျိူးမျိူး</h3>
                <div class="description my">
                  <p>စာပို့ခြင်း,လျိူ့၀ှက်,အုပ္စုလိုက္ခ်က္ျခင္း,ဖုန်းခေါ်ဆိုမူ,，</p>
                  <p>အခိုက္အတန္႔အနီးနားလူ(ပိတ်ထားသောbetaကိုဖွင့်ရန်)</p>
                  <p>ပတ်၀န်းကျင်ဆက်ဆံရေးအားလုံးရှိပါသည်,</p>
                  <p>အဖြဲ႔ဝင္ထဲလူဦးရေအကန့်သတ်မရှိ</p>
                </div>
              </div>
              <div class="floatL">
                <img class="panel4-img" v-lazy="imgList[5]">
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
            <div class="panel panel6 my">
              <div class="panel5-item my floatL">
                <h3 class="title my">လျိူ့၀ှက်မူအာမခံချက်</h3>
                <div class="description my">
                  <p>ကိုယ်ပိုင်ဖျက်ဆီးကရိရာ,ထပ်ဆင့်ပို့ဆောင်ခြင်း</p>
                  <p>screenshotသတိပေးခြင်း,ဖတ်ရူ့၍ပြန်ဖျက်ခြင်း</p>
                  <p>သွားလာမူခြေရာမထင်ခြင်း,အမှတ်သားမရှိခြင်း </p>
                  <p>ကျွနုပ်တို့အကုန်စဉ်းစားထားပါသည်,အချိန်မရွေးပြောဆိုနိုင်ပါသည်</p>
                </div>
              </div>
              <div class="floatR">
                <img class="panel5-img" v-lazy="imgList[6]">
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
            <div class="panel panel7 my">
              <div class="overflow">
                <h3 class="title my">လုပ်ငန်းကျယ်ပြန့်မူ</h3>
                <div class="description my">
                  <p>လူမူရေး/စီးပွားရေး,အေပ်ာ္ကစားဝိုင္း,ပြည်သူပနာရေး၀န်ဆောင်မူ,သင်ကြားမူ,ကျန်းမာရေးစောင့်ရှောက်မူ,</p>
                  <p>လုပ်ငန်းဆောင်သာvedio file, တုံ့ပြန်မုနှင့်ထုတ်လုပ်မူကိုတွန်းထိုးပေးရန်</p>
                </div>
                <ul>
                  <li class="panel6-list-item my">
                    <img class="item-icon" v-lazy="imgList[7]">
                    <p class="item-title my">လူမူရေး</p>
                  </li>
                  <li class="panel6-list-item my">
                    <img class="item-icon" v-lazy="imgList[8]">
                    <p class="item-title my">စီးပွား‌‌ရေး</p>
                  </li>
                  <li class="panel6-list-item my">
                    <img class="item-icon" v-lazy="imgList[9]">
                    <p class="item-title my">အေပ်ာ္ကစားဝိုင္း</p>
                  </li>
                  <li class="panel6-list-item my">
                    <img class="item-icon" v-lazy="imgList[10]">
                    <p class="item-title my">ပြည်သူပနာရေး၀န်ဆောင်မူ</p>
                  </li>
                  <li class="panel6-list-item my">
                    <img class="item-icon" v-lazy="imgList[11]">
                    <p class="item-title my">သင်ကြားမူ</p>
                  </li>
                  <li class="panel6-list-item my">
                    <img class="item-icon" v-lazy="imgList[12]">
                    <p class="item-title my">ကျန်းမာရေးစောင့်ရှောက်မု</p>
                  </li>
                </ul>
              </div>
              <!-- <div class="overflow communi mt35"> -->
              <div class="overflow communi">
                <h3 class="title-Communicate" v-show="!showDownload_bottom">ဆက်သွယ်မူ,မည်သည့်နေရာမဆ</h3>


                <div class="qrcode-box-bottom" :class="{active:showDownload_bottom==1}" v-show="showDownload_bottom">
                  <!-- <p>{{showDownload_bottom==1 ? '安卓' : 'IOS'}}扫描二维码下载</p> -->
                  <p>မိုဘိုင္းနည္းစနစ္ျဖင့္စကန္ႏွင့္QRဂုတ္္ကိုေဒါင္းေလာ့ဆြဲျခင္း</p>
                  <ul>

                    <li class="scan-code" v-show="showDownload_bottom==1 && showAndroid_bottom">
                      <canvas id="google_bottom"></canvas>
                      <p class="my">Google စတိုး download</p>
                    </li>

                    <li class="scan-code" v-show="showDownload_bottom==2 && showIOS_bottom">
                      <canvas id="apple_bottom"></canvas>
                      <p class="my">Google စတိုး download</p>
                    </li>

                    <li class="scan-code" v-for="(item, index) in AndroidList_bottom" :key="index"
                      v-show="showDownload_bottom==1">
                      <canvas :id="item.id"></canvas>
                      <p class="my">အစမ်းသုံးဗား(လ်)ရှင်းကိုဒေါင်းလုတ်(တ်)လုပ်မည်</p>
                    </li>
                    <li class="scan-code" v-for="(item, index) in IOSList_bottom" :key="index"
                      v-show="showDownload_bottom==2">
                      <canvas :id="item.id"></canvas>
                      <p class="my">အစမ်းသုံးဗား(လ်)ရှင်းကိုဒေါင်းလုတ်(တ်)လုပ်မည်</p>
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
    <!-- <a class="service my" href="javascript:;" @click="showService=true">
      <i></i>
      <span>ကြှနျုပျတို့ကိုဆကျသှယျရနျ</span>
    </a> -->
    <a class="service" target="_blank" href="https://www.santapp.com/visitor/#/728324/https%3A%2F%2Fwww.echatapp.com/0/0/1400257192/75febc070478bf200dd559668e403124/EchatApp" @click="showService=true"> 
      <i></i>
      <span>ကြှနျုပျတို့ကိုဆကျသှယျရနျ</span>
    </a>
    <!-- <div class="service-layer" v-show="showService">
      <div class="service-bg" @click="showService=false"></div>
      <div class="service-content" @click.stop=";">
        <div class="service-title">
          ကြှနျုပျတို့ကိုဆကျသှယျရနျ<i @click="showService=false"></i>
        </div>
        <div class="service-detail">
          <p class="mb">ကျွန်တော်တို့ကိုထောက်ပံ့ပေးသည့်အတွက်ကျေးဇူးတင်ပါသည်</p>
          <p class="mb">
            ကျွန်တော်တို့၏တိုးတက်မူသည်သင်၏ထောက်ခံမူများနှင့်အကြံဥာဏ်များနှင်းမကင်းကွာနိုင်ပါအကယ်၍သင်သည်ကျွန်ုပ်တို့အားအဖိုးတန်သောမှတ်ချက်များသို့မဟုတ်အကြံပြုချက်များပေးလိုပါကသို့မဟုတ်ကျွန်ုပ်တို့ကိုဆက်သွယ်လိုပါက
          </p>
          <p>အောက်ပါနည်းလမ်းများဖြင့်ဆက်သွယ်နိုင်ပါသည်</p>
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

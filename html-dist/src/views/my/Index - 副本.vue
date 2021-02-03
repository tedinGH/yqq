<template>
	<div>
		<header class="index-header">
			<bcircle-header ref="Header"></bcircle-header>
		</header>
		<div class="banner">
			<div class="container" v-if="showBanner">
				<div class="content-right" v-lazy:background-image="imgList[0]"></div>
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
								<p>Google စတိုး download</p>
							</li>
							<li class="scan-code" v-for="(item, index) in AndroidList" v-show="showDownload==1">
								<canvas :id="item.id"></canvas>
								<p>ဒေါင်းလော့လုပ်ဆွဲ {{index+1}}</p>
							</li>
							<li class="scan-code" v-for="(item, index) in IOSList" v-show="showDownload==2">
								<canvas :id="item.id"></canvas>
								<p>ဒေါင်းလော့လုပ်ဆွဲ {{index+1}}</p>
							</li>
							<!-- <li class="scan-code" v-show="(showDownload==1 &&  (AndroidList && AndroidList.length)) || (showDownload==2 &&  (IOSList && IOSList.length))">
								<canvas id="qrcode"></canvas>
								<p v-if="showDownload==1">ဒေါင်းလော့လုပ်ဆွဲ {{AndroidList.length+1}}</p>
								<p v-if="showDownload==2">ဒေါင်းလော့လုပ်ဆွဲ {{IOSList.length+1}}</p>
							</li> -->
						</ul>
					</div>
					<ul class="download-type">
						<li class="download-item" @click.stop="download(1)">
							<i class="icon android" :class="{active: showDownload==1}"></i>
							<div class="my">Android<br>ဒေါင်းလုပ်ဆွဲခြင်း</div>
						</li>
						<li class="download-item" @click.stop="download(2)">
							<i class="icon iphone" :class="{active: showDownload==2}"></i>
							<div class="my">IOS<br>ဒေါင်းလုပ်ဆွဲခြင်း</div>
						</li>
						<li class="download-item">
							<a :href="data.filePath||'javascript:;'">
								<i class="icon win"></i>
								<div class="my">Windows<br>ဒေါင်းလုပ်ဆွဲခြင်း</div>
							</a>
						</li>
						<li class="download-item">
							<a :href="macData.filePath||'javascript:;'">
								<i class="icon mac"></i>
								<div class="my">Mac<br>ဒေါင်းလုပ်ဆွဲခြင်း</div>
							</a>
						</li>
						<li class="download-item" @click="gochat">
							<i class="icon web"></i>
							<div class="my">အင္တာနက္တြင္စကားေျပာျခင္း</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="panel">
			<!-- panel-1 -->
			<div class="panel-1">
				<div class="container p70">
					<h3 class="title">အနီးနားလူ</h3>
					<div class="clearfix">
						<div class="panel1-item my">
							<img class="panel1-img" v-lazy="imgList[1]">
							<div class="description">
								<p>ေယာက်ၤားေလး(သို႔)မိန္းကေလးသူငယ္ခ်င္းကိုရွာလိုပါသလား။</p>
								<p>အနီးနားလူလုပ်ဆောင်ချက်</p>
								<p>သူငယ်ချင်းများဆက်သွယ်မူကန့်ကွက်ခြင်းမရှိ</p>
							</div>
						</div>
						<div class="panel1-item my">
							<img class="panel1-img" v-lazy="imgList[2]">
							<div class="description">
								<p>အနီးနားလူရှာဖွေခြင်း</p>
								<p>စီးပွားဆိုင်ရာအခွင့်ကောင်းများလက်ထဲမှာရှိသည်</p>
								<p>ဆက်ဆံမူအခွင့်ရေးကိုထိုးဖောက်နိုင်ခြင်း</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- panel-2 -->
			<div class="panel-2">
				<div class="container p70 clearfix">
					<div class="panel2-item floatR">
						<h3 class="title">ချက်မတ်ဆေ့လုံခြုံရေး</h3>
						<div class="description">
							<p>သင်၏ကိုယ်ရေးကိုယ်သာကိုလျှိူ၀ှက်ထားပေးခြင်း, ဘယ်အရာမဆို</p>
							<p>အီချက်အပါအ၀င် ကျွန်ုပ်မတ်ဆေ့အားလုံးကိုဖတ်ရူ၍မရနိုင်ပါ</p>
						</div>
					</div>
					<div class="floatL">
						<img class="panel2-img" v-lazy="imgList[3]">
					</div>
				</div>
			</div>
			<!-- panel-3 -->
			<div class="panel-3">
				<div class="container clearfix">
					<div class="panel3-item floatL my">
						<h3 class="title">ကိုယ်ကြိုက်သလိုအမျိူး<br>မျိူးပြောင်းလဲမူ</h3>
						<div class="description">
							<p>သူငယ်ချင်းများနှင့်ကောင်းမွန်စွာမတ်ဆေ့ပေးပို့နိုင်ပါသည်</p>
							<p>အချိန်မရွေး ဆက်သွယ်ရေး‌ကိရိယာပြောင်းရွေ့နိုင်ခြင်း</p>
						</div>
					</div>
					<div class="floatR">
						<img class="panel3-img" v-lazy="imgList[4]">
					</div>
				</div>
			</div>
			<!-- panel-4 -->
			<div class="panel-4">
				<div class="container p70 clearfix">
					<div class="panel4-item floatR my">
						<h3 class="title">ဆက်ဆံရေးပုံစံအမျိူးမျိူး</h3>
						<div class="description">
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
			</div>
			<!-- panel-5 -->
			<div class="panel-5">
				<div class="container clearfix">
					<div class="panel5-item floatL">
						<h3 class="title">လျိူ့၀ှက်မူအာမခံချက်</h3>
						<div class="description">
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
			</div>
			<!-- panel-6 -->
			<div class="panel-6 my">
				<div class="container p70">
					<h3 class="title">လုပ်ငန်းကျယ်ပြန့်မူ</h3>
					<div class="description">
						<p>လူမူရေး/စီးပွားရေး,အေပ်ာ္ကစားဝိုင္း,ပြည်သူပနာရေး၀န်ဆောင်မူ,သင်ကြားမူ,ကျန်းမာရေးစောင့်ရှောက်မူ,</p>
						<p>လုပ်ငန်းဆောင်သာvedio file, တုံ့ပြန်မုနှင့်ထုတ်လုပ်မူကိုတွန်းထိုးပေးရန်</p>
					</div>
					<ul>
						<li class="panel6-list-item en">
							<img class="item-icon" v-lazy="imgList[7]">
							<p class="item-title">လူမူရေး</p>
						</li>
						<li class="panel6-list-item en">
							<img class="item-icon" v-lazy="imgList[8]">
							<p class="item-title">စီးပွား‌‌ရေး</p>
						</li>
						<li class="panel6-list-item en">
							<img class="item-icon" v-lazy="imgList[9]">
							<p class="item-title">အေပ်ာ္ကစားဝိုင္း</p>
						</li>
						<li class="panel6-list-item en">
							<img class="item-icon" v-lazy="imgList[10]">
							<p class="item-title">ပြည်သူပနာရေး၀န်ဆောင်မူ</p>
						</li>
						<li class="panel6-list-item en">
							<img class="item-icon" v-lazy="imgList[11]">
							<p class="item-title">သင်ကြားမူ</p>
						</li>
						<li class="panel6-list-item en">
							<img class="item-icon" v-lazy="imgList[12]">
							<p class="item-title">ကျန်းမာရေးစောင့်ရှောက်မု</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="download-moblie">
			<div class="title">Chat & Trade Anytime,Anywhere</div>
			<div class="type">
				<a class="btn" href="javascript:;" @click="goDownloadIOS"><i class="icon ios"></i>IOS<span class="download"></span></a>
				<a class="btn" href="javascript:;" @click="goDownloadAndriod"><i class="icon andriod"></i>Android<span class="download"></span></a>
			</div>
		</div>
		<!-- <footer class="footer">
			<bcircle-footer ref="footer"></bcircle-footer>
		</footer> -->
		<!-- 联系客服 -->
		<a class="service my" href="https://chat.liveneed.net/chat/Hotline/channel.jsp?cid=5003568&cnfid=4437&j=9533413181&lan=en&s=1" target="_blank"><i></i></a>
		<div class="mobi-download" v-if="mobiDownload">
			<i class="mobi-logo"></i> 
			<i class="mobi-close" @click="hideDownload"></i> 
			<div class="text">
				<p>EchatAPP</p> 
				<p>Encrypt chat | Cryptocurrency Exchange</p> 
			</div>
			<a :href="filePath||'javascript:;'" class="download-btn">Download</a>
		</div>
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

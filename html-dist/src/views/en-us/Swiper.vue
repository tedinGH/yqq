<template>
	<div class="version-wrapper">
		<!-- 轮播图 -->
	    <div class="swiper-container">
		    <div class="swiper-wrapper">
		        <div class="swiper-slide slide1">Slide 1</div>
		        <div class="swiper-slide slide2">Slide 2</div>
		        <div class="swiper-slide slide3">Slide 3</div>
		    </div>
		    <!-- 如果需要分页器 -->
		    <div class="swiper-pagination"></div>
		</div>
	</div>
</template>
<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css'
export default {
	name: 'download',
	data (){
		return {
			list:[]
		}
	},
	methods:{
		init(){
			api.loadVersion({}).then(
		        data => {
		          this.list = data;
		        },() => {}
		    )
		}
	},
	mounted() {
		
		new Swiper ('.swiper-container', {
		 	direction: 'vertical',
		    loop: true,
		    // 如果需要分页器
		    pagination: {
        		el: '.swiper-pagination',
        		clickable: true,
      		},
	  	})
	}
}
</script>
<style lang="scss">
#app{
	width: 100%;
    height: 100%;
    .version-wrapper{
		width: 100%;
	    height: 100%;
	    .swiper-container {
		    width: 100%;
		    height: 100%;
		    .swiper-wrapper{
		    	width: 100%;
		    	height: 100%;
		    	.swiper-slide{
		    		width: 100%;
		    		height: 100%;
					background:url(../../assets/images/index/swiper-1.png);
		    	}
		    }
		}
	}
}
 </style>}

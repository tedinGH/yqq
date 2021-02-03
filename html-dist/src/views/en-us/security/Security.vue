<template>
	<div class="security">
		<div class="security-header">
			<bcircle-header ref="Header"></bcircle-header>
		</div>
		<router-view></router-view>
	</div>
</template>

<script> 
import BcircleHeader from '@/components/common/BcircleHeader.vue';
	
export default {
	data (){
		return {
	}
	},
	components: { 
		BcircleHeader,
	},
	methods: {
	},
	mounted() {
	},
	destroyed(){
		this.$indicator.close()
	}
}
</script>
<style lang="scss">
	@import "../../../assets/scss/security.scss"; 
 </style>

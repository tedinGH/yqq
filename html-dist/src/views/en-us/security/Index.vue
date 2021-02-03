<template>
	<div class="main" v-show="showPage">
		<div class="security-panel">
			<h3 class="main-title">Account Security</h3> 
		</div>
		<div class="security-panel">
			<h3 class="title">Essential Information</h3>
			<div class="row">
				<span class="name">Account Number: </span><span v-if="data.mobile">{{data.mobile | filterPhone}}</span><span v-else>Unbound</span>
			</div>
			<div class="row">
				<span class="name">EchatAPP ID：</span><span>{{data.userId}}</span>
			</div>
			<div class="row">
				<span class="name">Login Password: </span><span>********</span><div class="operation" @click="$router.push({name:'forget-password'})">Modify</div>
			</div>
		</div>
		<div class="security-panel">
			<h3 class="title">Security Verification Information</h3>
			<div class="row"> 
				<div class="left">
					<img class="status-img" v-if="data.mobile" src="../../../assets/images/authenticated.png" />
					<img class="status-img" v-else src="../../../assets/images/uncertified.png"/>
					<span class="name">Phone: </span><span v-if="data.mobile">{{data.mobile | filterPhone}}</span><span v-else>Unbound</span>
				</div>
				<span class="grey">Used for login, password retrieval and related security settings</span>
				<div class="operation" v-if="data.mobile" @click="$router.push({name:'modify-phone'})">Modify</div>
				<div class="operation" v-else @click="$router.push({name:'binding-phone'})">To bind</div>
			</div>
			<div class="row">
				<div class="left">
					<img class="status-img" v-if="data.email" src="../../../assets/images/authenticated.png" />
					<img class="status-img" v-else src="../../../assets/images/uncertified.png" />
					<span class="name">Email: </span><span v-if="data.email">{{data.email | filterEmail}}</span><span v-else>Unbound</span>
				</div>
				<span class="grey">Used for login, password retrieval and related security settings</span>
				<div class="operation" v-if="data.email" @click="$router.push({name:'modify-email'})">Modify</div>
				<div class="operation" v-else @click="$router.push({name:'binding-email'})">To bind</div>
			</div>
			<div class="row">
				<div class="left">
					<img class="status-img" v-if="data.googleSwitch" src="../../../assets/images/authenticated.png" />
					<img class="status-img" v-else src="../../../assets/images/uncertified.png" />
					<span class="name">Google: </span><span>{{data.googleSwitch ? 'Opened' : 'Not yet open'}}</span>
				</div>
				<span class="grey">Used for login and modification of security settings</span>
				<div class="operation" v-if="data.googleSwitch" @click="$router.push({name:'stop-google'})">Close</div>
				<div class="operation" v-else @click="googleVerify">Open</div>
			</div>
		</div>
		<code-component ref="code"  @codeConfirm="codeHandler"></code-component>
		<double-verify v-model="data" @verify="verifyHandler" ref="verify"></double-verify>
		<google-component v-model="data"  @google="googleHandler" ref="google"></google-component>
	</div>
</template>
 
<script> 
import logic from '../../mixins/security/index'
	
export default {
	name: 'security',
	mixins: [logic]
}
</script>


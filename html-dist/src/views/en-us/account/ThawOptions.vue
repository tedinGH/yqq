<template>
	<div class="wraper">
		<ul class="account-operation">
			<li>
				<router-link exact :to="{ name: 'account-thaw'}">
          <div class="box">
            <img class="img" src="../../../assets/images/suo.png">
            <div>
              <p class="account-title">Self-help thawing</p>
              <p class="detail">After you remove the security risk, you can remove the account freeze yourself.</p>
            </div>
          <img class="icon" src="../../../assets/images/right.png">
          </div>
				</router-link>
			</li>
			<li>
				<a href="https://chat.liveneed.net/chat/Hotline/channel.jsp?cid=5003568&cnfid=4437&j=9533413181&s=1">
        <div class="box">
            <img class="img" src="../../../assets/images/ke.png">
            <div>
              <p class="account-title">Contact Customer Service</p>
              <p class="detail">Contact Customer Service to Remove Account Freeze</p>
            </div>
            <img class="icon" src="../../../assets/images/right.png">
          </div>
				</a>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	name: 'thaw-options',
	data (){
		return {}
	},
	methods: {},
	mounted(){}
}
</script>
<style lang="scss" scoped>
 @media only screen and (min-width: 900px){
  .account-operation{
  padding: 50px 0;
  .box {
    display: flex;
    align-items: center;
    padding-top: 30px;
    height: 100%;
    .img {
      display: block;
      width: 80px;
      height: 80px;
      margin: 0 20px;
    }
    .icon{
      width: 1.57rem;
      margin-right: .71rem;
    }
    p {
      width:300px;
    }
  }
}
}

@media only screen and (min-width: 0px) and (max-width: 900px) {
  .box {
    display: flex;
    align-items: center;
    padding-top: 1.07rem;
    height: 100%;
    .img {
      display: block;
      width: 2.85rem;
      height: 2.85rem;
      margin: 0 0.71rem;
    }
    .icon{
      width: 1.57rem;
      margin-right: .71rem;
    }
    p {
      width: 17.9rem;
    }
  }
}
</style>

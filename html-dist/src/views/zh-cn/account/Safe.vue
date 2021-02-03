<template>
  <div class="wraper">
    <ul class="account-operation">
      <li>
        <router-link exact :to="{ name: 'account-frozen'}">
          <div class="box">
            <img class="img" src="../../../assets/images/dong.png">
            <div>
              <p class="account-title">冻结账号</p>
              <p class="detail">自己的账号被盗，手机丢失，可以冻结EchatAPP账号</p>
            </div>
            <img class="icon" src="../../../assets/images/right.png">
          </div>
        </router-link>
      </li>
      <li>
        <router-link exact :to="{ name: 'thaw-options'}">
          <div class="box">
            <img class="img" src="../../../assets/images/suo.png">
            <div>
              <p class="account-title">解冻账号</p>
              <p class="detail">解除安全风险后，你可以解冻EchatAPP账号</p>
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
            <p class="account-title">联系客服</p>
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
    name: 'account-safe',
    data() {
      return {}
    },
    methods: {},
    mounted: function () {}
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
      width: 17.9rem;
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

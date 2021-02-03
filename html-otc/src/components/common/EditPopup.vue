<template>
  <transition name="scale-x">
    <div class="my-popup edit-input" @click.stop="">
      <div class="my-popup-content">
        <h3 class="my-popup-title">
          {{ title }}
        </h3>
        <!-- <span class="my-popup-close" @click="$emit('input', false)"></span> -->
        <div class="search-box">
          <div class="search-input">
            <input
              type="text"
              :placeholder="placeholderText"
              maxlength="20"
              v-model="text"
            />
            <i class="icon-delete" @click="text = ''" v-show="text"></i>
          </div>
        </div>
        <div class="btn">
        <button class="two-btn cannel"  @click="$emit('input', false)">
          {{ $t("msg.common.cancel") }}
        </button>
        <button class="two-btn comfirm" @click="comfirm()">
          {{ $t("msg.common.confirm") }}
        </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "EditPopue",
  data() {
    return {
      text: "",
    };
  },
  props: {
    value: {
      type: Boolean,
    },
    title: {
      type: String,
    },
    defaultText: {
      type: String,
    },
    placeholderText: {
      type: String,
    },
  },
  methods: {
    comfirm() {
      this.$emit("change", this.text);
    },
  },
  mounted() {
    this.text = this.defaultText;
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/var";

.edit-input {
  .my-popup-content {
    width: 420px;
    height: 200px;
    background: #ffffff;
    box-shadow: 0px 4px 20px 0px rgba(83, 112, 193, 0.24);
    
    border-radius: 8px;
    .search-box {
      margin-top: 10px;
      padding: 15px 20px;
      .search-input {
        width: 379px;
        height: 44px;
        background: #f7f8fd;
        border: 1px solid #e1e6ec;
        border-radius: 4px;
        input {
          width: 379px;
          height: 44px;
          border-radius: 4px;
        }
      }
    }
    .btn{
      display: flex;
      justify-content: flex-end;
      margin-top: 40px;
      .cannel{
        margin-right: 10px;
      }
      .comfirm{
        margin-right: 20px;
      }
    }
  }
}
</style>

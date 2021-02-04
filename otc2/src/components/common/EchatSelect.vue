<template>
  <div
    class="select-box"
    :style="{ width: width + 'px' }"
    @click.stop="hideOther"
  >
    <p class="title" v-if="selectList[value]">{{ selectList[value].name }}</p>
    <span
      class="triangle"
      :class="{ active: showBox }"
      :style="{ top: (height - 10) / 2 + 'px' }"
    ></span>
    <transition name="drop">
      <ul
        class="select-list"
        :style="{ top: height + 'px', 'line-height': height - 4 + 'px' }"
        @click.stop=";"
        v-if="showBox"
       
      >
        <li
          class="list-item"
          :class="{ active: value == index }"
          v-for="(item, index) in selectList"
          :key="index"
          @click="selected(index)"
        >
          {{ item.name }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  name: "echat-select",
  data() {
    return {
      showBox: false
    };
  },
  props: {
    value: {
      type: String | Number
    },
    title: {
      type: String
    },
    width: {
      type: String
    },
    height: {
      default: "26",
      type: String
    },
    list: {
      type: Array
    }
  },
  computed: {
    selectList() {
      return this.list;
    }
  },
  methods: {
    hideOther(){
      this.showBox = !this.showBox
      // if(this.showBox){
      //   this.$emit("hideOther", '');
      // }
      // else{
      //   this.$emit("hideOther", '');
      //   this.showBox = !this.showBox
      // } 
    },
    selected(idx) {
      this.showBox = false;
      this.$emit("change", idx);
    }
  },
  mounted() {
    window.addEventListener("click", event => {
      this.showBox = false;
    });
  },
  beforeDestroy() {
    window.removeEventListener("click", event => {
      this.showBox = false;
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/var";

.select-box {
  position: relative;
  height: 26px;
  padding: 0 8px;
  line-height: 24px;
  border-radius: 3px;
  border: 1px solid $border-color;
  text-align: left;
  cursor: pointer;
  z-index: 100;
  .title {
    padding-right: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: right;
  }
  .select-list {
    position: absolute;
    left: 0;
    z-index: 9;
    width: 100%;
    max-height: 120px;
    // padding: 5px 0;
    border-radius: 10px;
    box-shadow: 0 2px 8px #ccc;
    background-color: #fff;
    .list-item {
      padding: 8px 28px;
      cursor: pointer;
      &:hover,
      &.active {
        background-color: $active-backgroup;
        color: $color-theme;
      }
    }
  }
  .triangle {
    position: absolute;
    right: 8px;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 8px solid #5F717F;
    &.active {
    border-top:none;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 8px solid $color-theme;
    }
  }
}
</style>

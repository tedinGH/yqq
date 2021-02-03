<template>
<div class="emoji" @click.stop="">
  <div class="emoji-detail" v-scrollBar>
        <ul >
          <a href="javascript: ;" v-for="(item, index) in emojiDetailList" :key="index" @click.stop="checkFace(item)">
            <li class="emoji-detail-item">
              {{item}}
            </li>

          </a>
        </ul>
      </div>
  </div>
</template>

<script>
//  import {face} from "@/tools/emoji.js";
//  import {faceUrlMap} from "@/tools/emoji.js";
  export default {
    name: "emoji",
    data() {
      return {
        defaulturl:"static/img/emoji/",
        emojiDetailList:["\uD83D\uDE00", "\uD83D\uDE03", "\uD83D\uDE04", "\uD83D\uDE01", "\uD83D\uDE06", "\uD83D\uDE05", "\uD83D\uDE02", "\uD83D\uDE42",
"\uD83D\uDE43", "\uD83D\uDE09", "\uD83D\uDE0A", "\uD83D\uDE07", "\uD83D\uDE0D", "\uD83D\uDE18", "\uD83D\uDE17", "\uD83D\uDE1A",
"\uD83D\uDE19", "\uD83D\uDE0B", "\uD83D\uDE1B", "\uD83D\uDE1C", "\uD83D\uDE1D", "\uD83E\uDD11", "\uD83E\uDD17", "\uD83E\uDD14",
"\uD83E\uDD10", "\uD83D\uDE10", "\uD83D\uDE11", "\uD83D\uDE36", "\uD83D\uDE0F", "\uD83D\uDE12", "\uD83D\uDE44", "\uD83D\uDE2C",
"\uD83D\uDE0C", "\uD83D\uDE14", "\uD83D\uDE2A", "\uD83D\uDE34", "\uD83D\uDE37", "\uD83E\uDD12", "\uD83E\uDD15", "\uD83D\uDE35",
"\uD83D\uDE0E", "\uD83E\uDD13", "\uD83D\uDE15", "\uD83D\uDE1F", "\uD83D\uDE41", "\uD83D\uDE2E", "\uD83D\uDE2F", "\uD83D\uDE32",
"\uD83D\uDE33", "\uD83D\uDE26", "\uD83D\uDE27", "\uD83D\uDE28", "\uD83D\uDE30", "\uD83D\uDE25", "\uD83D\uDE22", "\uD83D\uDE2D",
"\uD83D\uDE31", "\uD83D\uDE16", "\uD83D\uDE23", "\uD83D\uDE1E", "\uD83D\uDE13", "\uD83D\uDE29", "\uD83D\uDE2B", "\uD83D\uDE24",
"\uD83D\uDE21", "\uD83D\uDE20", "\uD83D\uDE08", "\uD83D\uDC7F", "\uD83D\uDC80", "☠",           "\uD83D\uDCA9", "\uD83D\uDC79",
"\uD83D\uDC7A", "\uD83D\uDC7B", "\uD83D\uDC7D", "\uD83D\uDC7E", "\uD83E\uDD16", "\uD83D\uDE3A", "\uD83D\uDE38", "\uD83D\uDE39",
"\uD83D\uDE3B", "\uD83D\uDE3C", "\uD83D\uDE3D", "\uD83D\uDE40", "\uD83D\uDE3F", "\uD83D\uDE3E", "\uD83D\uDE48", "\uD83D\uDE49",
"\uD83D\uDE4A", "\uD83D\uDC8B", "\uD83D\uDC8C", "\uD83D\uDC98", "\uD83D\uDC9D", "\uD83D\uDC96", "\uD83D\uDC97", "\uD83D\uDC93",
"\uD83D\uDC9E", "\uD83D\uDC95", "\uD83D\uDC9F", "❣",            "\uD83D\uDC94", "❤",           "\uD83D\uDC9B", "\uD83D\uDC9A",
"\uD83D\uDC99", "\uD83D\uDC9C", "\uD83D\uDCAF", "\uD83D\uDCA2", "\uD83D\uDCA5", "\uD83D\uDCAB", "\uD83D\uDCA6", "\uD83D\uDCA8",
"\uD83D\uDD73", "\uD83D\uDCA3", "\uD83D\uDCAC", "\uD83D\uDDE8", "\uD83D\uDDEF", "\uD83D\uDCAD", "\uD83D\uDCA4", "\uD83D\uDC4B",
"\uD83D\uDD90", "✋",           "\uD83D\uDD96", "\uD83D\uDC4C", "✌",            "\uD83E\uDD18", "\uD83D\uDC48", "\uD83D\uDC49",
"\uD83D\uDC46", "\uD83D\uDD95", "\uD83D\uDC47", "☝",            "\uD83D\uDC4D", "\uD83D\uDC4E", "✊",           "\uD83D\uDC4A",
"\uD83D\uDC4F", "\uD83D\uDE4C", "\uD83D\uDC50", "\uD83D\uDE4F", "✍",           "\uD83D\uDC85",  "\uD83D\uDCAA", "\uD83D\uDC42",
"\uD83D\uDC43", "\uD83D\uDC40", "\uD83D\uDC41", "\uD83D\uDC45", "\uD83D\uDC44", "\uD83D\uDC76", "\uD83D\uDC66", "\uD83D\uDC67",
"\uD83D\uDC68", "\uD83D\uDC71\u200D", "\uD83D\uDC69",   "\uD83D\uDC74", "\uD83D\uDC75", "\uD83D\uDE4D\u200D", "\uD83D\uDE4E\u200D", "\uD83D\uDE45\u200D",
"\uD83D\uDE46\u200D", "\uD83D\uDC81\u200D",  "\uD83D\uDE4B\u200D",  "\uD83D\uDE47\u200D", "\uD83D\uDC6E\u200D", "\uD83D\uDD75\u200D", "\uD83D\uDC82\u200D", "\uD83D\uDC77\u200D",
"\uD83D\uDC78", "\uD83D\uDC73\u200D", "\uD83D\uDC72", "\uD83D\uDC70",   "\uD83D\uDC7C", "\uD83C\uDF85", "\uD83D\uDC83", "\uD83D\uDD74",
"\uD83C\uDFC7", "⛷",           "\uD83C\uDFC2", "\uD83D\uDECC", "\uD83D\uDC6D", "\uD83D\uDC6B",  "\uD83D\uDC6C", "\uD83D\uDC8F",
"\uD83D\uDC91", "\uD83D\uDDE3", "\uD83D\uDC64", "\uD83D\uDC65", "\uD83D\uDC63", "\uD83D\uDEC0"]
      }
    },
  
    methods:{
      checkFace(item){
          this.$parent.insertEmoji(item);
      }
    },
    mounted(){
      
    }
  };
</script>

<style lang="scss" scoped>
.emoji-detail {
      position: relative;
      width: 100%;
      height: 258px;
      padding: 24px 10px ;

      &-item {
        float: left;
        width: 32px;
        margin: 5px 0;
        font-size: 22px;
        text-align: center;
        cursor: pointer;      
      }
    }
  
</style>
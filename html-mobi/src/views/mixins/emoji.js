import api from "@/api";
import { Util } from "@/utils/utils";
export default {
  name: "emoji",
  data() {
    return {
      device: Util.getEnvironmet(),
      list: [],
      downloaded: [],
      showPopup: 0,
      emojiDetail: [],
      adding: 0, //0-无下载 1-弹窗提示 2-当前下载中 3-添加成功 4-已下载
      pageNum: 1,
      pageSize: 20,
      timer: null,
      base: base,
      loading:false
    };
  },
  methods: {
    // swipeleft: function () {
    //   this.$router.push({'path':'/myemoji'});
    // },
    loadEmoji() {
      let obj = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      api.loadEmoji(obj).then(
        (data) => {
          this.changeState(data.list);
        },
        () => {}
      );
    },
    addEmoji(id, idx) {
      if (this.list[idx].download == 1) {
        this.adding = 4;
        this.timer = setTimeout(() => {
          this.adding = 0;
        }, 2000);
        return;
      }
      this.timer = setTimeout(() => {
        this.adding = 2;
      }, 2000);
      if (this.adding == 2) {
        this.adding = 1;
        return;
      }
      if (this.device == "IOS") {
        window.webkit.messageHandlers.addEmoji.postMessage([id, idx]);
      } else if (this.device == "Android") {
        native.addEmoji(id, idx);
      }
      this.adding = 1;
    },
    seeItem(id, i) {
      api.seeItem({ bqbId: id }).then(
        (data) => {
          this.emojiDetail = data.listPackageDetails;
          this.showPopup = i + 1;
        },
        () => {}
      );
    },
    changeState(list) {
      let last = this.pageNum == 0 ? 0 : this.pageSize - this.pageNum * 20;
      for (let j = last; j < list.length - last; j++) {
        for (let i = 0; i < this.downloaded.length; i++) {
          if (list[j].bqbId == this.downloaded[i]) {
            list[j].download = 1;
          } else {
            if (!list[j].download) {
              list[j].download = 0;
            }
          }
        }
        list[j].progress = 0;
      }
      this.list = list;
    },
    changeStates(list) {
      for (let j = 0; j < list.length ; j++) {
        for (let i = 0; i < this.downloaded.length; i++) {
          if (list[j].bqbId == this.downloaded[i]) {
            list[j].download = 1;
          } else {
            if (!list[j].download) {
              list[j].download = 0;
            }
          }
        }
        list[j].progress = 0;
        this.list.push(list[j])
      }
    },
    loadMore() {
      this.loading=true
      if(this.pageNum>0){
        let obj = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        };
        this.pageNu=this.pageNum++
          api.loadEmoji(obj).then(
          data => {
            if(data.pageNum<this.pageNum-1) {
              return
            }else{
              this.changeStates(data.list);
              this.loading=false
            }
          },() => {}
        )
      }
    },
  },
  mounted() {
    //设置title
    document.title = this.$t("msg").menu.emoji;

    if (this.device == "IOS") {
      window.webkit.messageHandlers.loadDownloaded.postMessage("");
    } else if (this.device == "Android") {
      native.loadDownloaded();
    }
    window.getData = (data) => {
      this.success = true;
      this.downloaded = data.split(",");
    };
    window.getProgress = (idx, progress) => {
      if (+progress == 500) {
        this.list[idx].progress = 0;
        this.list[idx].download = 2;
        this.adding = 0;
        return;
      }
      if (+progress == 100) {
        this.list[idx].progress = 0;
        this.list[idx].download = 1;
        clearTimeout(this.timer);
        this.adding = 3;
        this.showPopup = 0;
        this.timer = setTimeout(() => {
          this.adding = 0;
        }, 2000);
        return;
      }
      this.list[idx].progress = +progress;
    };
    // this.loadEmoji();
  },
};

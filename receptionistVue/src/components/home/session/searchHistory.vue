<template>
  <div class="searchHistory" @click.stop="">
    <div class="genre">
      <div class="id">
        <p class="title">Visitor ID</p>
        <input type="text" onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="Please enter" v-model="visID" />
      </div>
      <div style="margin-right:38px">
        <p class="title">Platform</p>
        <el-select v-model="value1" clearable placeholder="please choose" class="selects">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </div>
      <div style="margin-right:38px">
        <p class="title">Service</p>
        <el-select v-model="id" clearable placeholder="please choose" class="selects">
          <el-option v-for="item in listcustomer" :key="item.id" :label="item.name" :value="item.id"> </el-option>
        </el-select>
      </div>
      <div>
        <p class="title">Evaluation type</p>
        <el-select v-model="Evaluation" clearable placeholder="please choose" class="selects">
          <el-option v-for="item in luation" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </div>
    </div>
    <div style="margin-top:33px">
      <p class="title" style=" margin-bottom: 13px;">Time limit</p>
      <el-date-picker
        class="time"
        v-model="time"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="to"
        value-format="timestamp"
        start-placeholder="Start date"
        end-placeholder="Ending date"
        align="right"
      >
      </el-date-picker>
    </div>
    <!-- <span>{{time}}</span> -->
    <div class="condition">
      <div class="duration">
        <p style="margin-top:33px;margin-bottom: 13px;">Session duration</p>
        <el-radio-group v-model="radio1">
          <el-radio :label="1" @click.native.prevent="radioChange1(1)">Less than</el-radio>
          <el-radio :label="2" @click.native.prevent="radioChange1(2)">Equal</el-radio>
          <el-radio :label="3" @click.native.prevent="radioChange1(3)">More than</el-radio>
        </el-radio-group>
        <input type="text" onkeyup="value=value.replace(/[^\d]/g,'')" v-model="durationTime" /><span>s</span>
      </div>
    </div>
    <div class="condition">
      <div class="duration">
        <p style="margin-top:33px;margin-bottom: 13px;">Number of messages</p>
        <el-radio-group v-model="radio2">
          <el-radio :label="1" @click.native.prevent="radioChange2(1)">Less than</el-radio>
          <el-radio :label="2" @click.native.prevent="radioChange2(2)">Equal</el-radio>
          <el-radio :label="3" @click.native.prevent="radioChange2(3)">More than</el-radio>
        </el-radio-group>
        <input type="text" onkeyup="value=value.replace(/[^\d]/g,'')" v-model="messagesNum" />
      </div>
    </div>
    <div class="foot-but">
      <div class="reset" @click="reset">Reset</div>
      <div class="search" @click="search()">Search</div>
    </div>
  </div>
</template>

<script>
import filter from "@/common/filters";
export default {
  name: "searchHistory",
  data() {
    return {
      listcustomer: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "Last week",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "Last month",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "Last three months",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "Last half of years",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      options: [
        {
          value: "1",
          label: "PC"
        },
        {
          value: "2",
          label: "Phone"
        }
      ],
      luation: [
        {
          value: "1",
          label: "Praise"
        },
        {
          value: "2",
          label: "Average"
        },
        {
          value: "3",
          label: "Negative Ratings"
        },
        {
          value: "-1",
          label: "Not evaluated"
        }
      ],
      value1: null,
      id: null,
      Evaluation: null,
      visID: null,
      time: [],
      radio1: null,
      radio2: null,
      durationTime: "",
      messagesNum: ""
    };
  },
  watch: {},
  methods: {
    radioChange1(txt) {
      if (this.radio1 == txt) {
        this.radio1 = null;
        return;
      }
      this.radio1 = txt;
    },
    radioChange2(txt) {
      if (this.radio2 == txt) {
        this.radio2 = null;
        return;
      }
      this.radio2 = txt;
    },
    // 搜索
    search() {
      if (
        this.visID == null &&
        this.id == null &&
        this.Evaluation == null &&
        this.value1 == null &&
        (this.time == null || this.time.length == 0) &&
        this.radio1 == null &&
        this.radio2 == null &&
        this.durationTime == "" &&
        this.messagesNum == ""
      ) {
        window.sessionStorage.setItem("condition", null);
      } else if ((this.durationTime != "" && this.radio1 == null) || (this.messagesNum != "" && this.radio2 == null)) {
        this.$message({
          message: "Please select at least one restriction",
          type: "error"
        });
        return;
      } else {
        let condition = {
          visitorId: this.visID == null ? null : "-" + this.visID,
          userId: this.id,
          type: this.Evaluation,
          source: this.value1,
          startTime: this.time ? this.time[0] : null,
          endTime: this.time ? this.time[1] : null,
          timeType: this.radio1,
          msgNumType: this.radio2,
          sessionTime: this.durationTime == "" ? null : this.durationTime,
          msgAmount: this.messagesNum == "" ? null : this.messagesNum,
          currentPage: 1,
          pageSize: 20
        };
        window.sessionStorage.setItem("condition", JSON.stringify(condition));
      }
      this.$parent.endpageNum = 1;
      this.$parent.newsearch();
      this.$store.dispatch("setLayout", ["", "", false]);
    },
    //重置
    reset() {
      this.visID = null;
      this.id = null;
      this.Evaluation = null;
      this.value1 = null;
      this.time = [];
      this.radio1 = null;
      this.radio2 = null;
      this.durationTime = "";
      this.messagesNum = "";
    }
  },
  created() {
    this.$api.getlistcustomer().then(res => {
      this.listcustomer = res.data;
      let all = {
        name: "All",
        id: -1
      };
      this.listcustomer.push(all);
    });
    let content = window.sessionStorage.getItem("condition");
    if (content) {
      content = JSON.parse(content);
      this.visID = content?.visitorId ? filter.name(content.visitorId) : null;
      this.id = content.userId;
      this.value1 = content.source;
      this.Evaluation = content.type;
      if (content.startTime && content.endTime) {
        this.time[0] = content.startTime;
        this.time[1] = content.endTime;
      } else {
        this.time = [];
      }
      this.radio1 = content.timeType;
      this.radio2 = content.msgNumType;
      this.durationTime = content.sessionTime ? content.sessionTime : "";
      this.messagesNum = content.msgAmount ? content.msgAmount : "";
    }
  }
};
</script>
·

<style lang="scss" scoped>
.el-select-dropdown {
  .el-select-dropdown__item {
    color: #000000;
  }
  .selected {
    color: $color-theme;
  }
}
.searchHistory {
  position: absolute;
  z-index: 2;
  width: 901px;
  height: 564px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #999;
  top: 34px;
  left: -137px;
  padding: 23px;
  z-index: 999;
  &::after {
    content: "";
    position: absolute;
    top: -12px;
    left: 145px;
    width: 0;
    height: 0;
    margin-left: -11px;
    border-left: 11px solid transparent;
    border-right: 11px solid transparent;
    border-bottom: 12px solid #fff;
  }
  .genre {
    display: flex;
    .id {
      input {
        width: 182px;
        height: 38px;
        border: 1px solid #e1e6ec;
        margin-right: 38px;
        padding: 10px;
      }
    }
    .title {
      margin-bottom: 13px;
    }
    .selects {
      width: 182px;
      /deep/.el-input.is-focus .el-input__inner {
        border-color: $color-theme;
      }
      /deep/.el-input__inner:focus {
        border-color: $color-theme;
      }
    }
  }
  /deep/.el-date-editor {
    &.is-active {
      border-color: $color-theme;
    }
    i {
      font-size: 20px;
    }
  }
  .condition {
    display: flex;
    /deep/.el-radio-group {
      .el-radio__input {
        .el-radio__inner {
          width: 18px;
          height: 18px;
          &::after {
            width: 10px;
            height: 10px;
            background: $color-theme;
          }
        }
        .el-radio__inner:hover {
          border-color: $color-theme;
        }
        &.is-checked {
          .el-radio__inner {
            background: #fff;
            border: 2px solid $color-theme;
          }
        }
      }
      .is-checked > .el-radio__label {
        color: $color-theme;
      }
    }
    .duration {
      input {
        width: 155px;
        height: 38px;
        border: 1px solid #e1e6ec;
        margin-left: 4px;
        margin-right: 10px;
        padding: 10px;
      }
    }
  }
  .foot-but {
    position: absolute;
    bottom: 72px;
    display: flex;
    width: 100%;
    justify-content: center;
    .reset {
      width: 78px;
      height: 34px;
      border: 1px solid $color-theme;
      border-radius: 5px;
      color: $color-theme;
      text-align: center;
      line-height: 34px;
      margin-right: 31px;
      cursor: pointer;
    }
    .search {
      margin-left: 31px;
      width: 78px;
      height: 34px;
      background: $color-theme;
      border-radius: 5px;
      color: #fff;
      text-align: center;
      line-height: 34px;
      cursor: pointer;
    }
  }
}
</style>

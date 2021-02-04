<template>
  <div class="warp">
    <div class="box" v-if="!success">
      <div class="top">Leave us a message</div>
      <div class="content">
        <ul class="list" v-scrollBar>
          <span class="tag" v-html="tag"></span>
          <li v-for="(item, idx) in question" :key="idx" class="question">
            <span v-if="item.isRequired == 1" style="color:#ff5959;margin-right:8px">*</span>
            <span class="title">{{ item.title }}</span>
            <input type="text" v-if="item.elementType == 1" class="text" v-model="item.models" />
            <textarea class="textarea" v-if="item.elementType == 2" v-model="item.models"></textarea>
            <input type="number" v-if="item.elementType == 3" class="text" v-model="item.models" />
            <el-date-picker
              class="time"
              style="display:block;"
              v-if="item.elementType == 4"
              v-model="item.models"
              type="datetime"
              value-format="timestamp"
              placeholder="Select date and time"
            ></el-date-picker>
            <div v-if="item.elementType == 5" class="select">
              <input
                class="text"
                type="text"
                placeholder="please select"
                v-model="item.models"
                disabled="disabled"
              />
              <el-dropdown trigger="click" @command="handleCommand">
                <div class="selects arrow-down">
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </div>
                <el-dropdown-menu
                  slot="dropdown"
                  style="height:210px;width:460px;
                overflow-y: scroll;
                  scrollbar-width: none;
                  -ms-overflow-style: none;"
                >
                  <el-dropdown-item
                    v-for="(i, index) in JSON.parse(item.content)"
                    :key="index"
                    :command="i + '/' + idx"
                  >{{ i }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="checkbox" v-if="item.elementType == 6">
              <el-checkbox-group v-model="item.models">
                <el-checkbox v-for="(i, index) in JSON.parse(item.content)" :key="index" :label="i"></el-checkbox>
              </el-checkbox-group>
            </div>
          </li>
        </ul>
        <p class="tag">
          Fields with
          <span style="color:#ff5959">*</span> are required
        </p>
        <div class="btn" @click="submit">Submit</div>
      </div>
    </div>
    <div class="success" v-if="success">
      <div class="top">Leave us a message</div>
      <div class="content">
        <div class="img">
          <img src="../assets/img/success.png" />
        </div>
        <p class="p1">Message successfully</p>
        <p class="p2">We'll contact you as soon as possible</p>
        <p class="p3" @click="back">Leave a message again</p>
      </div>
    </div>
  </div>
</template>

<script>
import { validate } from "@/tools/validate";
export default {
  name: "leavemsg",
  data() {
    return {
      tag: "",
      question: [],
      success: false,
    };
  },
  methods: {
    handleCommand(command) {
      command = command.split("/");
      this.question[command[1]].models = command[0];
    },
    submit() {
      for (let i = 0; i < this.question.length; i++) {
        if (this.question[i].isRequired == 1 && (this.question[i].models == "" || this.question[i].models.length == 0)) {
          // console.log(this.question[i].title);
          this.$message.error("A required field is not entered or selected, please check");
          return;
        }
        if (this.question[i].name == "email" && this.question[i].models != "") {
          if (!validate.isEmail(this.question[i].models)) {
            this.$message({
              message: "Email is entered incorrectly",
              type: "error",
            });
            return;
          }
        }
      }
      let obj = {
        companyId: this.$route.query.id,
        source: this.$route.query.url,
        visitorId: this.$route.query.userid,
        activaData: {},
      };
      let obj2 = {};
      for (let i = 0; i < this.question.length; i++) {
        obj2[this.question[i].name] = this.question[i].models;
      }
      obj.activaData = JSON.stringify(obj2);
      this.$api.saveleavemsg(obj).then((res) => {
        if (res.data == 1) {
          this.success = true;
        }
      });
    },
    back() {
      this.success = false;
      for (let i = 0; i < this.question.length; i++) {
        if (this.question[i].elementType == 6) {
          this.question[i].models = [];
        } else {
          this.question[i].models = "";
        }
      }
    },
  },
  created() {
    let data = {
      companyId: this.$route.query.id,
    };
    this.$api.getcustomfield(data).then((res) => {
      this.tag = res.data.replyContent;
      res.data.customFields.forEach((e) => {
        this.question.push({
          channel: e.channel,
          companyId: e.companyId,
          content: e.content,
          createTime: e.createTime,
          createUserId: e.createUserId,
          elementType: e.elementType,
          fieldSort: e.fieldSort,
          id: e.id,
          isRequired: e.isRequired,
          isSysElement: e.isSysElement,
          name: e.name,
          status: e.status,
          title: e.title,
          updateTime: e.updateTime,
          updateUserId: e.updateUserId,
          verifyType: e.verifyType,
          models: "",
        });
      });
      this.question.forEach((v) => {
        if (v.elementType == 6) {
          v.models = [];
        }
      });
    });
  },
};
</script>

<style lang="scss" scoped>
.warp {
  width: 100%;
  height: 100vh;
  background: #e9f3ff;
  input {
    -moz-appearance: textfield;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
  }
  .box {
    width: 516px;
    height: 727px;
    background: rgba(255, 255, 255, 0.99);
    box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.24);
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .top {
      height: 65px;
      background: #809ae3;
      border-radius: 10px 10px 0 0;
      color: #fff;
      font-size: 20px;
      padding-left: 28px;
      line-height: 65px;
    }

    .content {
      width: 516px;
      flex: 1;
      padding: 20px 0 0 25px;

      .tag {
        display: block;
        color: #949ca4;
        margin-bottom: 10px;
      }
    }

    .list {
      position: relative;
      height: 480px;
      // padding-bottom: 20px;

      .question {
        margin-bottom: 22px;
        .title {
          display: inline-block;
          width: 464px;
          word-break: break-all;
          word-wrap: break-word;
        }
        .text {
          width: 464px;
          height: 31px;
          background: #ffffff;
          border: 1px solid #dce0e7;
          border-radius: 5px;
          margin-top: 6px;
          padding: 0 8px;
          display: block;
        }

        .textarea {
          margin-top: 6px;
          resize: none;
          outline: none;
          width: 464px;
          height: 125px;
          padding: 5px;
          background: #ffffff;
          border: 1px solid #dce0e7;
          border-radius: 5px;
        }

        .time {
          margin-top: 6px;
          /deep/.el-input__inner {
            background: #ffffff;
            border: 1px solid #dce0e7;
            border-radius: 5px;
          }
        }

        .select {
          margin-top: 6px;
          position: relative;

          /deep/.el-dropdown {
            position: absolute;
            width: 464px;
            left: 0;
            top: 6px;

            .el-icon--right {
              // float: right;
              margin-left: 440px;
            }
          }
        }

        .checkbox {
          margin-top: 6px;

          /deep/.el-checkbox__input.is-checked .el-checkbox__inner {
            background: #809ae3;
          }

          /deep/.el-checkbox__inner {
            border-color: #809ae3;

            &:hover {
              border-color: #809ae3;
            }
          }

          /deep/.is-checked {
            .el-checkbox__label {
              color: #809ae3;
            }
          }
        }
      }
    }
    .btn {
      width: 458px;
      height: 34px;
      background: #809ae3;
      border-radius: 5px;
      color: #fff;
      text-align: center;
      line-height: 34px;
      margin-top: 50px;
      cursor: pointer;
    }
  }
  .success {
    width: 516px;
    height: 568px;
    background: rgba(255, 255, 255, 0.99);
    box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.24);
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .top {
      height: 65px;
      background: #809ae3;
      border-radius: 10px 10px 0 0;
      color: #fff;
      font-size: 20px;
      padding-left: 28px;
      line-height: 65px;
    }
    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      .img {
        margin-top: 50px;
        display: flex;
        justify-content: center;
      }
      .p1 {
        color: #373737;
        font-size: 20px;
        margin-top: 20px;
      }
      .p2 {
        color: #949ca4;
        margin-top: 23px;
      }
      .p3 {
        color: #8099e3;
        margin-top: 37px;
        cursor: pointer;
        font-size: 18px;
        text-decoration: underline;
      }
    }
  }
}
</style>

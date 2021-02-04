<template>
  <div class="dashboard">
    <el-container :style="{ height: `calc(100vh - 60px` }">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu default-active="2">
          <!-- <el-menu-item index="1">
            <i class="el-icon-message"></i>
            <span slot="title">在线客服报表 | Online customer service report</span>
          </el-menu-item>-->
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">座席报表 | Agent report</span>
          </el-menu-item>
          <!-- <el-menu-item index="3">
            <i class="el-icon-setting"></i>
            <span slot="title">会话报表</span>
          </el-menu-item>-->
        </el-menu>
      </el-aside>

      <el-container style="background: #F0F2F7">
        <el-header
          style="font-size: 12px;"
          :style="{ height: openOtherQueryStatus ? '260px' : 'auto' }"
        >
          <div class="card-content" style="margin-bottom: 0; padding: 0">
            <el-form :inline="true" ref="form" :model="form" class="search-form" label-width="80px">
              <el-form-item label="Range">
                <el-select v-model="form.dateRange" placeholder="Please Select Report Type">
                  <el-option label="Daily report" value="day"></el-option>
                  <el-option label="Weekly report" value="week"></el-option>
                  <el-option label="Monthly report" value="month"></el-option>
                  <el-option label="Annual report" value="year"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-date-picker
                  v-if="form.dateRange == 'day'"
                  v-model="dateDay"
                  value-format="timestamp"
                  type="date"
                  placeholder="选择时间"
                ></el-date-picker>
                <el-date-picker
                  v-if="form.dateRange == 'week'"
                  v-model="dateWeek"
                  value-format="timestamp"
                  type="week"
                  format="yyyy 第 WW 周"
                  placeholder="选择周"
                ></el-date-picker>
                <el-date-picker
                  v-if="form.dateRange == 'month'"
                  v-model="dateMonth"
                  value-format="timestamp"
                  type="month"
                  placeholder="选择月"
                ></el-date-picker>
                <el-date-picker
                  v-if="form.dateRange == 'year'"
                  v-model="dateYear"
                  value-format="timestamp"
                  type="year"
                  placeholder="选择年"
                ></el-date-picker>
              </el-form-item>
              <el-form-item>
                <a href="javascript:;" @click="openOtherQuery">其它查询条件 Other query conditions</a>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">Search</el-button>
              </el-form-item>
              <el-form-item
                :style="{ clear: 'both' }"
                class="radio-group"
                v-show="openOtherQueryStatus"
              >
                <el-radio-group v-model="form.deparmentRadio">
                  <el-radio :label="0">全部</el-radio>
                  <div class="radio-group-item">
                    <el-radio :label="1">
                      <el-form-item label="按分组查询
                  Query by group">
                        <el-select v-model="form.groupSelect" placeholder="Query by group">
                          <el-option
                            v-for="(item, index) in deparmentRadioGroupData.group"
                            :key="index"
                            :label="item.groupingName"
                            :value="item.id"
                          >
                            {{
                            item.groupingName
                            }}
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-radio>
                  </div>
                  <div class="radio-group-item">
                    <el-radio :label="2">
                      <el-form-item label=" 按部门查询
                  Query by department">
                        <el-select
                          v-model="form.departmentSelect"
                          placeholder="Query by department"
                        >
                          <el-option
                            v-for="(item, index) in deparmentRadioGroupData.deparment"
                            :key="index"
                            :label="item.departmentName"
                            :value="item.id"
                          >{{ item.departmentName }}</el-option>
                        </el-select>
                      </el-form-item>
                    </el-radio>
                  </div>
                  <div class="radio-group-item">
                    <el-radio :label="3" :style="{ clear: 'both' }">
                      <el-form-item label="按座席查询
                  Query by agent">
                        <el-select v-model="form.agentSelect" placeholder="Query by agent">
                          <el-option
                            v-for="(item, index) in deparmentRadioGroupData.agent"
                            :key="index"
                            :label="item.name"
                            :value="item.id"
                          >
                            {{
                            item.name
                            }}
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-radio>
                  </div>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div>
        </el-header>

        <el-main>
          <div class="card-content">
            <div class="card-title">座席满意度概况 Overview of agent satisfaction</div>
            <el-row :gutter="12">
              <el-col
                :span="4"
                :style="{ width: '20%', marginBottom: '12px' }"
                v-for="(item, index) in countData"
                :key="index"
              >
                <el-card shadow="hover">
                  {{ item.name }}
                  <br />
                  {{ item.value || 0 }}
                </el-card>
              </el-col>
            </el-row>
          </div>
          <div class="card-content" style="height: 620px;position: relative;">
            <div class="card-title">座席满意度报表 Agent Satisfaction Report</div>
            <BarChart :height="200" :chartdata="chartData"></BarChart>
            <div>注： 点亮，图中显示对应数据 变暗，图中隐藏对应数据</div>
          </div>
          <div class="card-content">
            <div class="card-title">
              <span @click="openFieldDesc">表字段说明 Table field description</span>
              <a href="javascript:;" @click="exportExcel">导出到Excel</a>
            </div>
            <div class="field-list" v-show="fieldDescStatus">
              <ul>
                <li>1. 会话总数：座席处理完毕已关闭的会话数 1. Total number of sessions: the number of sessions closed by the agent after processing</li>
                <li>2. 总评价数：包含满意度评价的会话数 2. Total number of evaluations: the number of sessions including satisfaction evaluation</li>
                <li>
                  3. 座席邀请评价数：座席主动发起评价邀请的会话数（一次会话中，座席点击了多次邀请按钮，只算作一次 ） 3. Number of agent invitation
                  evaluations: the number of sessions the agent actively initiates evaluation invitations (in one session, if an agent clicks the
                  invitation button several times, it will only be counted as one time)
                </li>
                <li>
                  4. 发起评价总数：座席、系统邀请评价数和访客主动点击评价数之和 4. Total number of initiated evaluations: the sum of the number of
                  agent, system invitation evaluations, and the number of visitors’ active click evaluations
                </li>
                <li>5. 座席邀请率：座席邀请数/发起评价总数 5. Agent invitation rate: number of agent invitations / total number of initiated evaluations</li>
                <li>
                  6. 发起评价占比：发起评价总数/会话总数 6. Proportion of initiated evaluations: total number of initiated evaluations/total number of
                  sessions
                </li>
                <li>7. 参评率：总评价数 / 发起评价总数 7. Participation rate: total number of evaluations / total number of initiated evaluations</li>
              </ul>
            </div>
            <el-table style="width: 100%" :data="chartData.dataList" v-show="!tablefoldStatus">
              <!-- TODO固定右列 :fixed="`${item.value == 'countGood' || item.value == 'countMedium' || item.value == 'countPoor' ? 'right' : ''}`" -->
              <el-table-column
                v-for="(item, index) in tableLabelData.columns"
                :key="index"
                :prop="`${item.value}`"
                :label="item.name"
                width="140"
                sortable
              >
                <template slot-scope="scope">
                  <el-button
                    v-if="item.value == 'countGood'"
                    @click.native.prevent="openGradeDetail(scope.$index, evaluateCSEnum.grade.good)"
                    type="text"
                    size="small"
                  >{{scope.row[item.value]}}</el-button>
                  <el-button
                    v-if="item.value == 'countMedium' "
                    @click.native.prevent="openGradeDetail(scope.$index, evaluateCSEnum.grade.medium)"
                    type="text"
                    size="small"
                  >{{scope.row[item.value]}}</el-button>
                  <el-button
                    v-if="item.value == 'countPoor'"
                    @click.native.prevent="openGradeDetail(scope.$index, evaluateCSEnum.grade.normal)"
                    type="text"
                    size="small"
                  >{{scope.row[item.value]}}</el-button>
                  <div
                    v-if="item.value != 'countGood' && item.value != 'countMedium' && item.value != 'countPoor'"
                  >{{scope.row[item.value]}}</div>
                </template>
              </el-table-column>
            </el-table>
            <!-- <el-table :data="tableData" v-show="tablefoldStatus">
            <el-table-column
              v-for="(item, index) in tableLabelData"
              :key="index"
              :prop="`${tableLabelData[index].id}`"
              :label="item.lableContent"
              width="140"
            ></el-table-column>
            </el-table>-->
          </div>
        </el-main>
      </el-container>
    </el-container>
    <gradeListDetail
      v-if="layout.module=='gradListDetail'&&layout.child=='hf'"
      :gradeTableData="tableGradeData"
    ></gradeListDetail>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import XLSX from "xlsx";
import FileSaver from "file-saver";
import { actionApi } from "@/api";
import { evaluateCSEnum } from "@/common/enum";
import BarChart from "./BarChart";
import gradeListDetail from "./gradeListDetail";

export default {
  name: "dashboard",
  data() {
    return {
      evaluateCSEnum,
      tableGradeData: {
        columns: [],
        dataList: [],
      },
      tableLabelData: {
        columns: [],
        good: [],
        moderate: [],
        Poor: [],
      },
      countData: {}, // 概括时间
      chartData: {
        dataList: [],
      },
      dateWeek: [],
      dateDay: "",
      dateMonth: "",
      dateYear: "",
      departMentData: [],
      openOtherQueryStatus: false,
      fieldDescStatus: false,
      tablefoldStatus: false,
      // 下拉显示列表
      deparmentRadioGroupData: {
        group: [],
        deparment: [],
        agent: [],
      },
      form: {
        deparmentRadio: 0,
        dateRange: "day",
        groupSelect: [],
        departmentSelect: [],
        agentSelect: [],
      },
    };
  },
  components: {
    BarChart,
    gradeListDetail,
  },
  computed: {
    ...mapGetters(["layout", "currentSession", "userInfo"]),
  },
  methods: {
    openOtherQuery() {
      this.openOtherQueryStatus = !this.openOtherQueryStatus;
      if (this.openOtherQueryStatus) {
        // 分组数据
        actionApi
          .getEvaluateDeparmentType({
            type: evaluateCSEnum.groupType.agent,
          })
          .then((res) => {
            console.log(res);
            if (res.code == 0) {
              this.deparmentRadioGroupData.agent = res.data;
            }
          });

        actionApi
          .getEvaluateDeparmentType({
            type: evaluateCSEnum.groupType.department,
          })
          .then((res) => {
            console.log(res);
            if (res.code == 0) {
              this.deparmentRadioGroupData.deparment = res.data;
            }
          });

        actionApi
          .getEvaluateDeparmentType({
            type: evaluateCSEnum.groupType.group,
          })
          .then((res) => {
            console.log(res);
            if (res.code == 0) {
              this.deparmentRadioGroupData.group = res.data;
            }
          });
      }
    },
    openFieldDesc() {
      this.fieldDescStatus = !this.fieldDescStatus;
    },
    openGradeDetail(index, gradeType) {
      console.log(index, gradeType);
      const payload = {
        type: gradeType,
      };
      this.onSubmit(payload, "getGradeTable");
    },
    renderTableColumn() {
      // companyId	企业id	integer
      // date	统计日期	integer
      // id	统计表id	integer
      // name	客服姓名	string
      // userId	客服id
      this.tableLabelData.columns = [
        {
          name: "会话总数",
          value: "totalSessions",
        },
        {
          name: "总评价数",
          value: "totalEval",
        },
        {
          name: "参评率",
          value: "evalRate",
        },
        {
          name: "坐席邀请评价数",
          value: "totalInviteEval",
        },
        {
          name: "发起评价总数",
          value: "totalInitiate",
        },
        {
          name: "发起评价占比",
          value: "initiateRate",
        },
        {
          name: "坐席邀请率",
          value: "inviteRate",
        },
        {
          name: "好评",
          value: "countGood",
        },
        {
          name: "中评",
          value: "countMedium",
        },
        {
          name: "差评",
          value: "countPoor",
        },
      ];
    },
    getGradeTable(payload) {
      actionApi.getEvaluatelableTable(payload).then((res) => {
        console.log(res);
        if (res.code == 0) {
          this.tableGradeData.columns = [];
          this.tableGradeData.columns = res.data.lableName;
          this.tableGradeData.columns.unshift({
            id: "visitorId",
            lableContent: "VisitorId",
            satisfalId: null,
          });
          this.tableGradeData.columns.push({
            id: "remark",
            lableContent: "Remark",
            satisfalId: null,
          });
          this.tableGradeData.dataList = res.data.dataList;
          this.$store.dispatch("setLayout", ["gradListDetail", "hf", true]);
        }
      });
    },
    exportExcel2() {
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
      /* get binary string as output */
      var wbout = XLSX.write(wb, { bookType: "xlsx", bookSST: true, type: "array" });
      try {
        FileSaver.saveAs(new Blob([wbout], { type: "application/octet-stream" }), "Seat_satisfaction_evaluation_report.xlsx");
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    exportExcel() {
      /* generate workbook object from table */
      console.log(this.chartData.dataList, this.tableLabelData.columns);
      let sels = this.chartData.dataList;
      let arr = [];
      let arrLabel = [];
      this.tableLabelData.columns.map((item) => {
        arrLabel.push(item.value);
      });
      arr.push(arrLabel);
      // console.log(arr);
      for (let i = 0; i < sels.length; i++) {
        let arr2 = [];
        // arr2.push(sels[i].type == 1 ? this.$t("questionManagement.commonIssues") : this.$t("questionManagement.hotIssues"));
        // arr2.push(sels[i].title);
        for (const key in sels[i]) {
          if (Object.hasOwnProperty.call(sels[i], key)) {
            const element = sels[i][key] || "";
            arr2.push(element.toString().replace(/<[^>]+>/g, ""));
          }
        }
        // arr2.push(sels[i].state == 1 ? this.$t("button.ednable") : this.$t("button.disable"));
        arr.push(arr2);
      }
      console.log(arr);
      const ws = XLSX.utils.aoa_to_sheet(arr);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, "Seat_satisfaction_evaluation_report.xlsx");
    },
    onSubmit(payload, mode) {
      // TODO: 自动更新为轮询更新，每隔10分钟轮询一次进行更新。
      //   this.$store.dispatch("setLayout", ["", "", false]);
      console.log(this.form, this.dateDay);
      payload = {
        ...payload,
        //   departmentId: 0,
        //   groupingId: 0,
        userId: this.userInfo.id,
      };
      payload.userId = this.userInfo.id;
      switch (this.form.dateRange) {
        case "day":
          payload.startDate = this.dateDay == "" ? new Date(new Date().toLocaleDateString()).getTime() : this.dateDay;
          payload.endDate = new Date(new Date().toLocaleDateString()).getTime() + 24 * 3600000 - 1;
          break;
        case "week":
          payload.startDate = this.dateWeek == "" ? new Date(new Date().toLocaleDateString()).getTime() : this.dateWeek;
          payload.endDate = new Date(new Date().toLocaleDateString()).getTime() + 24 * 3600000 * 7 - 1;
          break;
        case "month":
          payload.startDate = this.dateMonth == "" ? new Date(new Date().toLocaleDateString()).getTime() : this.dateMonth;
          payload.endDate = new Date(new Date().toLocaleDateString()).getTime() + 24 * 3600000 * 7 - 1;
          break;
        case "year":
          payload.startDate = this.dateYear == "" ? new Date(new Date().toLocaleDateString()).getTime() : this.dateYear;
          payload.endDate = new Date(new Date().toLocaleDateString()).getTime() + 24 * 3600000 * 7 - 1;
          break;
        default:
          break;
      }

      actionApi.getEvaluateChart(payload).then((res) => {
        if (res.code == 0) {
          const {
            countGood,
            totalSessions,
            initiateRate,
            totalInitiate,
            totalInviteEval,
            totalEval,
            evalRate,
            countMedium,
            countPoor,
            inviteRate,
          } = res.data.countData;

          // companyId	企业id	integer
          // date	统计日期	integer
          // id	统计表id	integer
          // name	客服姓名	string
          // userId	客服id

          this.countData = [
            {
              name: "会话总数",
              value: totalSessions,
            },
            {
              name: "总评价数",
              value: totalEval,
            },
            {
              name: "参评率",
              value: evalRate,
            },
            {
              name: "坐席邀请评价数",
              value: totalInviteEval,
            },
            {
              name: "发起评价总数",
              value: totalInitiate,
            },
            {
              name: "发起评价占比",
              value: initiateRate,
            },
            {
              name: "坐席邀请率",
              value: inviteRate,
            },
            {
              name: "好评",
              value: countGood,
            },
            {
              name: "中评",
              value: countMedium,
            },
            {
              name: "差评",
              value: countPoor,
            },
          ];

          // this.chartData.labels = res.data.countData;
          this.chartData = res.data;
          // 表格显示
          this.renderTableColumn(res);
        }
      });

      if (mode == "getGradeTable") {
        this.getGradeTable(payload);
      }
    },
  },
  mounted() {
    const payload = {
      endDate: 1612195200000 + 3600 * 24,
      startDate: 1612195200000,
    };
    setTimeout(() => {
      this.onSubmit(payload);
    }, 500);
  },
};
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
.dashboard {
  height: calc(100vh - 60px);
}

.search-form {
  padding: 10px;
  .el-form-item > * {
    margin-right: 10px;
    margin-bottom: 0;
  }
  /deep/.el-form-item {
    margin-bottom: 0;
  }
}
.radio-group {
  .radio-group-item {
    margin-bottom: 8px;
  }
  /deep/.el-radio__label {
    line-height: 40px;
  }
}
.card-content {
  padding: 22px 22px 16px 22px;
  background: #ffffff;
  margin-bottom: 18px;
  border: 1px solid $border-color;
  box-shadow: 0px 0px 2px 0px rgba(142, 147, 162, 0.2);
  .card-title {
    font-size: 18px;
    padding: 0 4px 16px 0px;
  }
}
</style>

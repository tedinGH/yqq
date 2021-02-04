<script>
import VueCharts from "vue-chartjs";

export default {
  extends: VueCharts.Bar,
  mixins: [VueCharts.mixins.reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: null,
    },
    height: Number,
  },
  mounted() {
    // Overwriting base render method with actual data.

    // companyId	企业id	integer
    // date	统计日期	integer
    // id	统计表id	integer
    // name	客服姓名	string
    // userId	客服id
    // this.countData = [
    //   {
    //     name: "会话总数",
    //     value: totalSessions,
    //   },
    //   {
    //     name: "总评价数",
    //     value: totalEval,
    //   },
    //   {
    //     name: "参评率",
    //     value: evalRate,
    //   },
    //   {
    //     name: "坐席邀请评价数",
    //     value: totalInviteEval,
    //   },
    //   {
    //     name: "发起评价总数",
    //     value: totalInitiate,
    //   },
    //   {
    //     name: "发起评价占比",
    //     value: initiateRate,
    //   },
    //   {
    //     name: "坐席邀请率",
    //     value: inviteRate,
    //   },
    //   {
    //     name: "好评",
    //     value: countGood,
    //   },
    //   {
    //     name: "中评",
    //     value: countMedium,
    //   },
    //   {
    //     name: "差评",
    //     value: countPoor,
    //   },
    // ];

    // "Total number of sessions",
    //         "Total number of evaluations",
    //         "Participation rate",
    //         "Number of agent invitation evaluations",
    //         "Total number of initiated evaluations",
    //         "Proportion of initiated evaluations",
    //         "Agent invitation rate",
    //         "Good",
    //         "Moderate",
    //         "Poor",
    this.renderChart({
      labels: ["name"],
      datasets: [
        {
          label: ["Total number of sessions"],
          backgroundColor: "#81A1FF",
          data: [40],
        },
        {
          label: ["Total number of evaluations"],
          backgroundColor: "#3ED086",
          data: [20],
        },
        {
          label: ["Participation rate"],
          backgroundColor: "#FB57A4",
          data: [10],
        },
        {
          label: ["Number of agent invitation evaluations"],
          backgroundColor: "#FEC03E",
          data: [30],
        },
        {
          label: ["Total number of initiated evaluations"],
          backgroundColor: "#31CFE3",
          data: [40],
        },
        {
          label: ["Proportion of initiated evaluations"],
          backgroundColor: "#93DF00",
          data: [20],
        },
        {
          label: ["Agent invitation rate"],
          backgroundColor: "#0081FF",
          data: [10],
        },
        {
          label: ["Good"],
          backgroundColor: "#FF9F43",
          data: [30],
        },
        {
          label: ["Moderate"],
          backgroundColor: "#CF4BF0",
          data: [40],
        },
        {
          label: ["Poor"],
          backgroundColor: "#FF4961",
          data: [10],
        },
      ],
    });
  },
};
</script>
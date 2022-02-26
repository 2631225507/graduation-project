<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons");
import resize from "./mixins/resize";

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "350px",
    },
    pieData: {
      type: Array,
      required: true,
    },
  },
  watch: {
    pieData(val) {
      this.chartData = val
      this.initChart();
    },
  },
  data() {
    return {
      chart: null,
      chartData: [],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.chart.setOption({
        title: {
          text: "力宁年度数据",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          left: "center",
          bottom: "10",
          data: [
            "总销售金额（万元）",
            "成交订单总数（单）",
            "入库单数（单）",
            "入库总金额（万元）",
          ],
        },
        series: [
          {
            name: "力宁年度销售数据",
            type: "pie",
            roseType: "radius",
            radius: [15, 95],
            center: ["50%", "50%"],
            data: this.chartData,
            animationEasing: "cubicInOut",
            animationDuration: 2600,
          },
        ],
      });
    },
  },
};
</script>

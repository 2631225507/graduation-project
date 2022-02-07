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
      default: "400px",
    },
    autoResize: {
      type: Boolean,
      default: true,
    },
    chartData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
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
      this.setOptions(this.chartData);
    },
    setOptions({ expectedData, actualData, AAAAA, BBBBB, CCCCC } = {}) {
      this.chart.setOption({
        title: {
          left: "center",
          text: "该年度每月详情"
        },
        xAxis: {
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
          boundaryGap: false,
          axisTick: {
            show: false,
          },
        },
        grid: {
          left: 10,
          right: 20,
          bottom: 20,
          top:55,
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
          padding: [5, 10],
        },
        yAxis: {
          axisTick: {
            show: false,
          },
        },
        legend: {
          top:25,
          data: [
            "总销售金额（万元）",
            "成交订单总数（单）",
            "入库单数（单）",
            "入库总金额（万元）",
          ],
        },
        series: [
          {
            name: "总销售金额（万元）",
            itemStyle: {
              normal: {
                color: "#FF005A",
                lineStyle: {
                  color: "#FF005A",
                  width: 2,
                },
              },
            },
            smooth: true,
            type: "line",
            data: expectedData,
            animationDuration: 2800,
            animationEasing: "cubicInOut",
          },
          {
            name: "成交订单总数（单）",
            smooth: true,
            type: "line",
            itemStyle: {
              normal: {
                color: "#3888fa",
                lineStyle: {
                  color: "#3888fa",
                  width: 2,
                },
                areaStyle: {
                  color: "#f3f8ff",
                },
              },
            },
            data: actualData,
            animationDuration: 2800,
            animationEasing: "quadraticOut",
          },
          {
            name: "入库单数（单）",
            itemStyle: {
              normal: {
                color: "#FAC858",
                lineStyle: {
                  color: "#FAC858",
                  width: 2,
                },
              },
            },
            smooth: true,
            type: "line",
            data: BBBBB,
            animationDuration: 2800,
            animationEasing: "cubicInOut",
          },
          {
            name: "入库总金额（万元）",
            itemStyle: {
              normal: {
                color: "#91CC75",
                lineStyle: {
                  color: "#91CC75",
                  width: 2,
                },
              },
            },
            smooth: true,
            type: "line",
            data: AAAAA,
            animationDuration: 2800,
            animationEasing: "cubicInOut",
          },
        ],
      });
    },
  },
};
</script>

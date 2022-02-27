<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";

export default {
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
    chartData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      chart: null,
      dateArray:[]
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
  created() {
    this.getWeekDate()
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
    setOptions({ salesVolume} = {}) {
      this.chart.setOption({
        title: {
          left: "center",
          text: "员工近周负责订单量",
        },
        xAxis: {
          data: this.dateArray,
          boundaryGap: false,
          axisTick: {
            show: false,
          },
        },
        grid: {
          left: 45,
          right: 20,
          bottom: 20,
          top: 55,
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
            data: salesVolume,
            animationDuration: 2800,
            animationEasing: "cubicInOut",
          },
        ],
      });
    },
     getWeekDate() {
      let nowDate = new Date(); // 获取今天日期
      nowDate.setDate(nowDate.getDate() - 6);
      let dateTemp;
      let flag = 1;
      for (var i = 0; i < 7; i++) {
        dateTemp = nowDate.getMonth() + 1 + "-" + nowDate.getDate();
        this.dateArray.push(dateTemp);
        nowDate.setDate(nowDate.getDate() + flag);
      }
      this.dateArray = Array.from(this.dateArray);
    },
  },
};
</script>

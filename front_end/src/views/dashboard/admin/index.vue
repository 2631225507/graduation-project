<template>
  <div class="home-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData" />
    <!-- 年度数据 -->
    <el-row>
      <div class="year-check">
        <span>年度：</span>
        <el-date-picker
          v-model="yearValue"
          type="year"
          placeholder="请选择年度"
        ></el-date-picker>
      </div>
      <div class="chart-wrapper">
        <pie-chart />
      </div>
    </el-row>
    <!-- 该年度每月数据 -->
    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px">
      <line-chart :chart-data="lineChartData" />
    </el-row>
  </div>
</template>

<script>
import PanelGroup from "./components/PanelGroup";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145],
    AAAAA: [21, 45, 64, 34, 22, 123, 23],
    BBBBB: [11, 11, 111, 111, 162, 140, 145],
    CCCCC: [22, 11, 33, 444, 67, 232, 242]
  }
};

export default {
  name: "DashboardAdmin",
  components: {
    PanelGroup,
    LineChart,
    PieChart,
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      yearValue: "",
    };
  },
  created(){
    // this.yearValue =new Date().getFullYear()
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    },
  },
};
</script>

<style lang="scss" scoped>
.home-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
  .year-check {
    background: #fff;
  }
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>

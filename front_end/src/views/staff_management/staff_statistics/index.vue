<template>
  <div class="staff_statistics">
    <div class="select-staff">
      <el-select v-model="staffName" clearable placeholder="请选择员工">
        <el-option
          v-for="item in staffNameOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <!-- 员工月销量对比 -->
    <el-row>
      <bar-chart :chart-data="barChartData" />
    </el-row>
    <!-- 员工近周负责订单量 -->
    <el-row>
      <line-chart :chart-data="lineChartData" />
    </el-row>
  </div>
</template>

<script>
import BarChart from "./BarChart";
import LineChart from "./LineChart";
const barChartData = {
  newVisitis: {
    expectedData: [1, 2, 3, 4, 5, 6, 7],
  },
};
export default {
  components: {
    BarChart,LineChart
  },
  data() {
    return {
      barChartData: barChartData.newVisitis,
      lineChartData: barChartData.newVisitis,
      staffNameOptions: [].BarChart,
      staffName: "",
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.staff_statistics {
  padding: 20px;
  .select-staff{
    margin-left: 60px;
  }
}
</style>

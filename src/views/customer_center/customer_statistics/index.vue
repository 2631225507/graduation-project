<template>
  <div class="customer-statistics">
    <div class="customer-name">
      <span class="title">客户名称：</span>
      <el-select v-model="value" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="time-frame">
      <span class="title">年月范围：</span>
      <el-date-picker
        v-model="value1"
        type="monthrange"
        range-separator="至"
        start-placeholder="开始月份"
        end-placeholder="结束月份"
      >
      </el-date-picker>
    </div>
    <!-- 客户数据 -->
    <el-row>
      <bar-chart :chart-data="barChartData" />
    </el-row>

    <!-- 下单历史 -->
    <div>
     
    </div>
  </div>
</template>

<script>
import BarChart from "./BarChart";
const barChartData = {
  newVisitis: {
    expectedData: [1, 2, 3, 4, 5, 6, 7],
  },
};
export default {
  components: {
    BarChart,
  },
  data() {
    return {
      barChartData: barChartData.newVisitis,
      value1: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
      ],
      value: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.customer-statistics {
  padding: 20px;
  .customer-name,
  .time-frame {
    display: inline-block;
    padding-left: 50px;
    .title {
      font-size: 14px;
    }
  }
}
</style>

<template>
  <div class="product-inventory">
    <pie-chart :chartData="pieChartData" />
  </div>
</template>

<script>
import PieChart from "./PieChart";
const pieChartData = {
  title: "xxxx",
  data: [100, 120, 161, 134, 105, 160, 165],
};
export default {
  components: {
    PieChart,
  },
  data() {
    return {
      pieChartData : pieChartData
    };
  },
};
</script>

<style lang="scss" scoped>
.product-inventory {
  padding: 20px;
}
</style>

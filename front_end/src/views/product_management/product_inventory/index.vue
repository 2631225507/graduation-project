<template>
  <div class="product-inventory">
    <div v-for="(item, index) in detailData" :key="index">
      <pie-chart :chartData="item" />
    </div>
  </div>
</template>

<script>
import { getProductInfo } from "@/api/product";
import PieChart from "./PieChart";
export default {
  components: {
    PieChart,
  },
  data() {
    return {
      pieChartData: {},
      listQuery: {
        //请求参数
        page: 1,
        limit: 9999,
      },
      detailData: [],
    };
  },
  created() {
    this.getChartData();
  },
  methods: {
    // 获取库存信息
    getChartData() {
      getProductInfo(this.listQuery).then((res) => {
        this.pieChartData = res.data.rows;
        this.detailData = JSON.parse(JSON.stringify(this.pieChartData));
        this.detailData.forEach((item) => {
          item.product_details = [];
        });

        this.pieChartData.forEach((item, index) => {
            item.product_details.forEach((val) => {
              this.detailData[index].product_details.push({
                value: val.stock,
                name: val.size,
              });
            })
        });
        // for (let i = 0; i < this.pieChartData.length; i++) {
        //   for ( let j = 0;j < this.pieChartData[i].product_details.length;j++) {
        //     this.detailData[i].product_details.push({
        //       value: this.pieChartData[i].product_details[j].stock,
        //       name: this.pieChartData[i].product_details[j].size,
        //     });
        //   }
        // }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.product-inventory {
  padding: 20px;
}
</style>

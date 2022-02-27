<template>
  <div class="staff_statistics">
    <div class="select-staff">
      <el-select
        v-model="staff_id"
        clearable
        placeholder="请选择员工"
        @change="staffChange"
      >
        <el-option
          v-for="item in staffOptions"
          :key="item.staff_id"
          :label="item.staff_name"
          :value="item.staff_id"
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
import { getStaffInfo } from "@/api/staff";
import { getOrderInfo } from "@/api/order";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
export default {
  components: {
    BarChart,
    LineChart,
  },
  data() {
    return {
      staff_id: "", //员工ID
      staffOptions: [], //员工下拉数据
      orderOptions: [], //员工负责订单数据
      barChartData: {
        totalOrder: [],
        allMoney: [],
      },
      dateArray: [],
      lineChartData: {
        salesVolume: [],
      },
    };
  },
  created() {
    this.getStaff();
    this.getWeekDate();
  },
  methods: {
    // 获取员工
    getStaff() {
      getStaffInfo({ page: 1, limit: 9999 }).then((res) => {
        this.staffOptions = res.data.rows;
      });
    },
    staffChange(val) {
      if ((val ?? "") != "") {
        this.getOrder(val);
      }
    },
    // 获取员工负责订单
    getOrder(data) {
      getOrderInfo({ page: 1, limit: 999, operator_id: data }).then((res) => {
        this.orderOptions = res.data.rows;
        this.getOrderChart(this.orderOptions);
        this.getWeekChart(this.orderOptions);
      });
    },
    // 获取每月总订单详情
    getOrderChart(data) {
      let totalOrder = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let allMoney = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      data.forEach((item) => {
        let time = item.created_at.slice(6, 7);
        switch (time) {
          case "1":
            totalOrder[0] = totalOrder[0] + 1;
            item.order_details.forEach((value) => {
              allMoney[0] += value.order_quantity * value.price;
            });
            break;
          case "2":
            totalOrder[1] = totalOrder[1] + 1;
            item.order_details.forEach((value) => {
              allMoney[1] += value.order_quantity * value.price;
            });
            break;
          case "3":
            totalOrder[2] = totalOrder[2] + 1;
            item.order_details.forEach((value) => {
              allMoney[2] += value.order_quantity * value.price;
            });
            break;
          case "4":
            totalOrder[3] = totalOrder[3] + 1;
            item.order_details.forEach((value) => {
              allMoney[3] += value.order_quantity * value.price;
            });
            break;
          case "5":
            totalOrder[4] = totalOrder[4] + 1;
            item.order_details.forEach((value) => {
              allMoney[4] += value.order_quantity * value.price;
            });
            break;
          case "6":
            totalOrder[5] = totalOrder[5] + 1;
            item.order_details.forEach((value) => {
              allMoney[5] += value.order_quantity * value.price;
            });
            break;
          case "7":
            totalOrder[6] = totalOrder[6] + 1;
            item.order_details.forEach((value) => {
              allMoney[0] += value.order_quantity * value.price;
            });
            break;
          case "8":
            totalOrder[7] = totalOrder[7] + 1;
            item.order_details.forEach((value) => {
              allMoney[7] += value.order_quantity * value.price;
            });
            break;
          case "9":
            totalOrder[8] = totalOrder[8] + 1;
            item.order_details.forEach((value) => {
              allMoney[8] += value.order_quantity * value.price;
            });
            break;
          case "10":
            totalOrder[9] = totalOrder[9] + 1;
            item.order_details.forEach((value) => {
              allMoney[9] += value.order_quantity * value.price;
            });
            break;
          case "11":
            totalOrder[10] = totalOrder[10] + 1;
            item.order_details.forEach((value) => {
              allMoney[10] += value.order_quantity * value.price;
            });
            break;
          case "12":
            totalOrder[11] = totalOrder[11] + 1;
            item.order_details.forEach((value) => {
              allMoney[11] += value.order_quantity * value.price;
            });
            break;
          default:
            break;
        }
      });
      this.barChartData.totalOrder = totalOrder;
      this.barChartData.allMoney = allMoney.map((item) => {
        return item / 10000;
      });
    },
    // 获取每天总额
    getWeekChart(data) {
      let allMoney = [0, 0, 0, 0, 0, 0, 0];
      data.forEach((item) => {
        let time = item.created_at.slice(6, 10);
        switch (time) {
          case this.dateArray[0]:
            item.order_details.forEach((value) => {
              allMoney[0] += value.order_quantity * value.price;
            });
            break;
          case this.dateArray[1]:
            item.order_details.forEach((value) => {
              allMoney[1] += value.order_quantity * value.price;
            });
            break;
          case this.dateArray[2]:
            item.order_details.forEach((value) => {
              allMoney[2] += value.order_quantity * value.price;
            });
            break;
          case this.dateArray[3]:
            item.order_details.forEach((value) => {
              allMoney[3] += value.order_quantity * value.price;
            });
            break;
          case this.dateArray[4]:
            item.order_details.forEach((value) => {
              allMoney[4] += value.order_quantity * value.price;
            });
            break;
          case this.dateArray[5]:
            item.order_details.forEach((value) => {
              allMoney[5] += value.order_quantity * value.price;
            });
            break;
          case this.dateArray[6]:
            item.order_details.forEach((value) => {
              allMoney[6] += value.order_quantity * value.price;
            });
            break;
          default:
            break;
        }
      });
      this.lineChartData.salesVolume = allMoney.map((item) => {
        return item / 10000;
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

<style lang="scss" scoped>
.staff_statistics {
  padding: 20px;
  .select-staff {
    margin-left: 60px;
  }
}
</style>

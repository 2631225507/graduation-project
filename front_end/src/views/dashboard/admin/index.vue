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
          :picker-options="{
            disabledDate(time) {
              // 设置禁用状态，参数为当前日期，要求返回 Boolean
              return time.getTime() > Date.now();
            },
          }"
          @change="timeChang()"
        ></el-date-picker>
      </div>
      <div class="chart-wrapper">
        <pie-chart :pie-data="pieData" v-if="pieData" />
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
import { getReturninfo, getOrderTotal } from "@/api/chart";
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145],
    AAAAA: [21, 45, 64, 34, 22, 123, 23],
    BBBBB: [11, 11, 111, 111, 162, 140, 145],
    CCCCC: [22, 11, 33, 444, 67, 232, 242],
  },
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
      returnList: null, //入库数据
      returnTotal: null, //入库总单数
      totalAmount: null, //入库总金额
      orderList: null, //订单数据
      orderTotal: null, //订单总单数
      orderAmount: null, //订单总金额（扣除入库总金额）
      pieData: [], //饼图数据
      monthData: [],
    };
  },
  created() {
    this.yearValue = new Date();
    this.timeChang();
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    },
    // 获取年度
    timeChang() {
      const start =
        this.yearValue.getFullYear() + "-1" + "-1" + " " + "00:00:00";
      const end =
        this.yearValue.getFullYear() + "-12" + "-31" + " " + "23:59:59";
      // const is_into = 0;
      this.getRetrun(start, end);
      this.getOrder(start, end, is_into);
    },
    // 入库
    getRetrun(start, end) {
      getReturninfo({ start, end }).then((res) => {
        this.returnList = res.data.rows;
        this.getReturn(this.returnList);
        // 入库单数
        this.returnTotal = res.data.count;
        // 入库总金额
        this.returnList.forEach((item) => {
          item.warehousing_details.forEach((value) => {
            this.totalAmount += value.amount * value.price;
          });
        });
      });
    },
    // 订单
    getOrder(start, end) {
      getOrderTotal({ start, end }).then((res) => {
        this.orderList = res.data.rows;
        // 订单总数
        this.orderTotal = res.data.count;
        // 订单总金额
        this.orderList.forEach((item) => {
          item.order_details.forEach((value) => {
            this.orderAmount += value.order_quantity * value.price;
          });
        });
        this.orderTotal = this.orderTotal - this.returnTotal;
        this.orderAmount = this.orderAmount - this.totalAmount;
        if (this.returnList.length && this.orderList.length) {
          this.pieData = [
            { value: this.orderAmount / 100000, name: "总销售金额（十万元）" },
            { value: this.orderTotal, name: "成交订单总数（单）" },
            { value: this.returnTotal, name: "入库单数（单）" },
            { value: this.totalAmount / 10000, name: "入库总金额（万元）" },
          ];
        } else {
          (this.returnTotal = null), //入库总单数
            (this.totalAmount = null), //入库总金额
            (this.orderTotal = null), //订单总单数
            (this.orderAmount = null), //订单总金额（扣除入库总金额）
            (this.pieData = []);
          this.$message({
            message: "该年度无数据",
            type: "warning",
          });
        }
      });
    },
    // 获取入库每月详情
    getReturn(data) {
      let numberReceipt = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let receiptAmount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      data.forEach((item) => {
        let time = item.created_at.slice(6, 7);
        switch (time) {
          case "1":
            numberReceipt[0] = numberReceipt[0] + 1;
            item.warehousing_details.forEach((value) => {
              receiptAmount[0] += value.amount * value.price;
            });
            break;
          case "2":
            numberReceipt[1] = numberReceipt[1] + 1;
            item.warehousing_details.forEach((value) => {
              receiptAmount[1] += value.amount * value.price;
            });
            break;
          case "3":
            numberReceipt[2] = numberReceipt[2] + 1;
            item.warehousing_details.forEach((value) => {
              receiptAmount[2] += value.amount * value.price;
            });
            break;
          case "4":
            numberReceipt[3] = numberReceipt[3] + 1;
            item.warehousing_details.forEach((value) => {
              receiptAmount[3] += value.amount * value.price;
            });
            break;
          case "5":
            numberReceipt[4] = numberReceipt[4] + 1;
            item.warehousing_details.forEach((value) => {
              receiptAmount[4] += value.amount * value.price;
            });
            break;
          case "6":
            numberReceipt[5] = numberReceipt[5] + 1;
            item.warehousing_details.forEach((value) => {
              receiptAmount[5] += value.amount * value.price;
            });
            break;
          case "7":
            numberReceipt[6] = numberReceipt[6] + 1;
            item.warehousing_details.forEach((value) => {
              receiptAmount[6] += value.amount * value.price;
            });
            break;
          case "8":
            numberReceipt[7] = numberReceipt[7] + 1;
            item.warehousing_details.forEach((value) => {
              receiptAmount[7] += value.amount * value.price;
            });
            break;
          case "9":
            numberReceipt[8] = numberReceipt[8] + 1;
            item.warehousing_details.forEach((value) => {
              receiptAmount[8] += value.amount * value.price;
            });
            break;
          case "10":
            numberReceipt[9] = numberReceipt[9] + 1;
            item.warehousing_details.forEach((value) => {
              receiptAmount[9] += value.amount * value.price;
            });
            break;
          case "11":
            numberReceipt[10] = numberReceipt[10] + 1;
            item.warehousing_details.forEach((value) => {
              receiptAmount[10] += value.amount * value.price;
            });
            break;
          case "12":
            numberReceipt[11] = numberReceipt[11] + 1;
            item.warehousing_details.forEach((value) => {
              receiptAmount[11] += value.amount * value.price;
            });
            break;
          default:
            break;
        }
      });
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

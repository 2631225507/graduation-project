<template>
  <div class="customer-statistics">
    <div class="customer-name">
      <span class="title">客户名称：</span>
      <el-select
        v-model="listQuery.client_id"
        clearable
        placeholder="请选择客户"
        @change="customerChange"
      >
        <el-option
          v-for="item in options"
          :key="item.customer_id"
          :label="item.customer_name"
          :value="item.customer_id"
        >
        </el-option>
      </el-select>
    </div>
    <div class="time-frame">
      <span class="title">日期范围：</span>
      <el-date-picker
        v-model="listQuery.created_at"
        :disabled="isOpen"
        @change="dateChange"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
      >
      </el-date-picker>
    </div>
    <!-- 客户数据 -->
    <el-row>
      <bar-chart :chart-data="barChartData" />
    </el-row>

    <!-- 下单历史 -->
    <div v-if="listQuery.client_id">
      <!-- 表格数据 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          prop="order_number"
          label="订单号"
          width="130"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="client_name"
          label="客户"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column label="下单产品" width="200" align="center">
          <template slot-scope="{ row }">
            <span class="link-type" @click="handleDetail(row)">
              {{ row.goods_name }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="联系号码"
          width="145"
          align="center"
          prop="client_phone"
        >
        </el-table-column>
        <el-table-column label="收货地址" align="center">
          <el-table-column label="省" width="70" align="center" prop="province">
          </el-table-column>
          <el-table-column label="市" width="70" align="center" prop="city">
          </el-table-column>
          <el-table-column label="区" width="70" align="center" prop="area">
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="详细地址"
          min-width="160"
          align="center"
          prop="detail_address"
        >
        </el-table-column>
        <el-table-column
          label="负责人"
          width="60"
          align="center"
          prop="operator"
        >
        </el-table-column>
        <el-table-column label="下单时间" width="100" align="center">
          <template slot-scope="{ row }">
            {{ row.created_at }}
          </template>
        </el-table-column>
        <el-table-column label="发货时间" width="120" align="center">
          <template slot-scope="{ row }">
            <span v-if="row.delivery_time">{{
              row.delivery_time.replace(/T/g, " ").replace(/\.[\d]{3}Z/, "")
            }}</span>
            <span v-else>{{ row.delivery_time }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getStatistics"
      />
    </div>
    <!-- 详情 -->
    <detail-info
      v-if="dialogVisible"
      :list="list"
      :dialogVisible.sync="dialogVisible"
    ></detail-info>
  </div>
</template>

<script>
import { getCustomerInfo } from "@/api/customer";
import { getCustomerStatistics } from "@/api/chart";
import DetailInfo from "../../order_center/order_management/detail";
import Pagination from "@/components/Pagination";
import BarChart from "./BarChart";
export default {
  components: { Pagination, DetailInfo, BarChart },
  created() {
    this.getCustomer();
  },
  data() {
    return {
      barChartData: {},
      isOpen: true, //是否开启时间选择器
      options: [], //客户下拉数据
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      tableData: [], //表格数据
      turnover: null, //成交量
      totalAmount: null, //总金额
      total: 0, //表格总条数
      dialogVisible: false, //订单详情弹窗
      listQuery: {
        //请求参数
        page: 1,
        limit: 10,
        client_id: undefined,
        created_at: undefined,
      },
    };
  },
  methods: {
    // 获取客户信息
    getCustomer() {
      getCustomerInfo({ page: 1, limit: 9999 }).then((res) => {
        this.options = res.data.rows;
      });
    },
    // 选择客户
    customerChange(val) {
      if ((val ?? "") !== "") {
        this.isOpen = false;
        this.getStatistics();
      } else {
        this.isOpen = true;
      }
      this.listQuery.created_at = "";
    },
    // 选择时间范围
    dateChange(val) {
      if ((val ?? "") !== "") {
        this.getStatistics();
      }
    },
    // 获取订单信息
    getStatistics() {
      getCustomerStatistics(this.listQuery).then((res) => {
        this.tableData = res.data.rows;
        this.total = res.data.count;
        this.getChartData();
      });
    },
    // 图表数据
    getChartData() {
      if(this.tableData.length==0){
        return this.barChartData.expectedData=[]
      }
      // 成交量
      this.tableData.forEach((item1) => {
        item1.order_details.forEach((value1) => {
          this.turnover += value1.order_quantity;
        });
      });
      // 交易金额
      this.tableData.forEach((item2) => {
        item2.order_details.forEach((value2) => {
          this.totalAmount += value2.order_quantity * value2.price;
        });
      });

      // 销售产品数
      const number = []
      this.tableData.forEach((item3) => {
        return number.push(item3.goods_name.split(','));
      });
      let productNumber = [...new Set(number.flat(Infinity))]
      let chartData = [
        this.total,
        this.turnover / 1000,
        productNumber.length,
        this.totalAmount / 10000,
      ];
      this.$set(this.barChartData, "expectedData", chartData);
    },
    // 打开产品详情弹窗
    handleDetail(row) {
      this.list = { ...row };
      this.dialogVisible = true;
    },
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

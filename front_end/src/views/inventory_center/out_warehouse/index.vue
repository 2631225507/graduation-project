<template>
  <div class="out_warehouse" ref="out">
    <!-- 功能区 -->
    <div class="filter-container">
      <el-input
        class="filter-item"
        v-model="listQuery.order_number"
        placeholder="请输入订单编号"
        style="width: 200px"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
        >查询</el-button
      >
    </div>

    <!-- 表格 -->
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
    >
      <el-table-column
        prop="order_number"
        fixed
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
      <el-table-column
        prop="goods_name"
        label="下单名称"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="client_phone"
        label="联系号码"
        width="145"
        align="center"
      >
      </el-table-column>
      <el-table-column label="收货地址" align="center">
        <el-table-column
          prop="province"
          label="省"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="city"
          label="市"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="area"
          label="区"
          width="120"
          align="center"
        ></el-table-column>
      </el-table-column>
      <el-table-column
        prop="detail_address"
        label="详细地址"
        width="160"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="operator"
        label="负责人"
        width="120"
        align="center"
      >
      </el-table-column>
      <el-table-column label="下单时间" width="100" align="center">
        <template slot-scope="{ row }">
          {{ row.created_at.replace(/T/g, " ").replace(/\.[\d]{3}Z/, "") }}
        </template>
      </el-table-column>
      <el-table-column label="出库" width="150" fixed="right" align="center">
        <template slot-scope="{ row }">
          <el-switch
            v-model="row.is_issue"
            @change="handleUpdate(row)"
            active-value="1"
            inactive-value="0"
            active-text="是"
            inactive-text="否"
          >
          </el-switch>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { getOrderInfo, orderOut } from "@/api/order";
import Pagination from "@/components/Pagination";
export default {
  name: "WarehousingManagement",
  components: { Pagination },
  data() {
    return {
      tableData: [],
      total: 0, //表格总条数
      listQuery: {
        //请求参数
        page: 1,
        limit: 10,
        is_into: 0,
        order_number: undefined,
      },
      downloadLoading: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 合并行
    objectSpanMethod({ row, column, rowIndex }) {
      const dataProvider = this.tableData;
      const cellValue = row[column.property];
      if (cellValue) {
        // 上一条数据
        const prevRow = dataProvider[rowIndex - 1];
        // 下一条数据
        let nextRow = dataProvider[rowIndex + 1];
        // 当上一条数据等于下一条数据
        if (prevRow && prevRow[column.property] === cellValue) {
          return { rowspan: 0, colspan: 0 };
        } else {
          let rowspan = 1;
          while (nextRow && nextRow[column.property] === cellValue) {
            rowspan++;
            nextRow = dataProvider[rowspan + rowIndex];
          }
          if (rowspan > 1) {
            return { rowspan, colspan: 1 };
          }
        }
      }
    },
    // 获取订单信息
    getList() {
      getOrderInfo(this.listQuery).then((res) => {
        this.tableData = res.data.rows;
        this.total = res.data.count;
      });
    },
    // 查询数据
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleUpdate(row) {
      orderOut(row).then((res) => {
        if (res.success) {
          this.$message({
            type: "success",
            message: "操作成功！",
          });
        } else {
          this.$message({
            type: "warning",
            message: "操作失败!",
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.out_warehouse {
  height: 100%;
  padding: 20px;
}
</style>



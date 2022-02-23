<template>
  <div class="order_management">
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
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        :loading="downloadLoading"
        @click="handleDownload"
        >导出excel</el-button
      >
    </div>
    <!-- 表格数据 -->
    <el-table
      v-if="tableHeight"
      :data="tableData"
      :height="tableHeight"
      :span-method="objectSpanMethod"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="order_number"
        fixed
        label="订单号"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="client_name"
        label="客户"
        width="180"
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
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="city"
          label="市"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="area"
          label="区"
          width="80"
          align="center"
        ></el-table-column>
      </el-table-column>
      <el-table-column
        prop="detail_address"
        label="详细地址"
        width="220"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="operator"
        label="负责人"
        width="100"
        align="center"
      >
      </el-table-column>

      <el-table-column label="下单时间" width="120" align="center">
        <template slot-scope="{ row }">
          {{ row.created_at.replace(/T/g, " ").replace(/\.[\d]{3}Z/, "") }}
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

      <el-table-column fixed="right" label="操作" width="100" align="center">
        <template slot-scope="{ row, $index }">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="handleDelete(row, $index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 详情 -->
    <detail-info
      v-if="dialogVisible"
      :list="list"
      :dialogVisible.sync="dialogVisible"
    ></detail-info>

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
import { getOrderInfo, orderDelete } from "@/api/order";
import DetailInfo from "./detail";
import Pagination from "@/components/Pagination";
export default {
  name: "OrderManagement",
  components: { Pagination, DetailInfo },
  data() {
    return {
      tableData: [],
      downloadLoading: false,
      tableHeight: "",
      total: 0, //表格总条数
      dialogVisible: false, //订单详情弹窗
      listQuery: {
        //请求参数
        page: 1,
        limit: 10,
        name: undefined,
      },
    };
  },
  created() {
    this.getList();
  },
  mounted() {
    this.tableHeight = window.innerHeight - 188 - 55;
  },
  methods: {
    // 获取订单信息
    getList() {
      getOrderInfo(this.listQuery).then((res) => {
        this.tableData = res.data.rows;
        this.total = res.data.count;
      });
    },
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
    // 删除
    handleDelete(row, index) {
      this.$confirm(
        `是否继续删除订单号为【${row.order_number}】的信息?`,
        "删除",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
         orderDelete(row).then((res) => {
          if (res.success) {
            this.$message({
              type: "success",
              message: "删除成功！",
              duration: 5000,
            });
            this.getList();
          } else {
            this.$message({
              type: "warning",
              message: "删除失败!",
              duration: 5000,
            });
          }
        });
      });
    },
    // 查询数据
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    // 打开产品详情弹窗
    handleDetail(row) {
      this.list = { ...row };
      this.dialogVisible = true;
    },
    // 导出EXCEL表格
    handleDownload() {
      if (this.multipleSelection.length) {
        this.downloadLoading = true;
        import("@/vendor/Export2Excel").then((excel) => {
          const tHeader = ["订单号", "客户", "下单产品", "联系号码", "省", "市", "区", "详细地址", "负责人", "下单时间"];
          const filterVal = [
            "order_number",
            "client_name",
            "goods_name",
            "client_phone",
            "province",
            "city",
            "area",
            "detail_address",
            "operator",
            "created_at",
          ];
          const list = this.multipleSelection;
          const data = this.formatJson(filterVal, list);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: "订单信息",
          });
          this.$refs.multipleTable.clearSelection();
          this.downloadLoading = false;
        });
      } else {
        this.$message({
          message: "请至少选择一条数据",
          type: "warning",
        });
      }
    },
    //数据格式转换
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
  },
};
</script>

<style lang="scss" scoped>
.order_management {
  height: 100%;
  padding: 20px;
}
</style>



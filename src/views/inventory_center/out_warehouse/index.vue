<template>
  <div class="out_warehouse" ref="out">
    <!-- 功能区 -->
    <div class="filter-container">
      <el-input
        class="filter-item"
        v-model="listQuery.name"
        placeholder="请输入客户名称"
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

    <!-- 表格 -->
    <el-table
      v-if="tableHeight"
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      :height="tableHeight"
    >
      <el-table-column
        prop="order_number"
        fixed
        label="订单号"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="c_name"
        label="客户名称"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="p_name"
        label="产品名称"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="order_time"
        label="下单时间"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="c_phone"
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
        prop="detailed"
        label="详细地址"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="sname" label="负责人" width="100" align="center">
      </el-table-column>
      <el-table-column label="出库" width="150" align="center">
        <template slot-scope="{ row }">
          <el-switch
            v-model="value1"
            @change="handleUpdate(row)"
            active-text="是"
            inactive-text="否"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="出库时间" align="center">
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
import Pagination from "@/components/Pagination";
export default {
  name: "WarehousingManagement",
  components: { Pagination },
  data() {
    return {
      value1: true,
      tableHeight: "",
      tableData: [
        {
          allnumber: 3000,
          allprice: 30000,
          area: "马尾区",
          c_code_number: 35.5,
          c_name: "四创科技有限公司黄河根",
          c_p_id: 470,
          c_phone: "13500000001",
          city: "福州市",
          delivery_time: "2020-05-28 00:00:00",
          detailed: "阳光学院菜鸟驿站",
          id: 69,
          order_number: "BUGNHVCGYVDKDXBC",
          order_time: "2020-05-27",
          out_time: null,
          outbound: "0",
          p_name: "安踏霸道系列-1.27",
          p_number: 100000,
          p_price: "1110",
          province: "福建省",
          replenishment: null,
          sname: "黄河根",
          time: 1590916617000,
        }
      ],
      total: 2, //表格总条数
      listLoading: true, //loading样式
      listQuery: {
        //请求参数
        page: 1,
        limit: 10,
        name: undefined,
      },
      downloadLoading: false,
    };
  },
  methods: {
    // 合并行
    objectSpanMethod({ row, column, rowIndex }) {
      // console.log("row", row);
      // console.log("column", column);
      // console.log("rowIndex", rowIndex);
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
    // 获取入库信息
    getList() {
      // this.listLoading = true;
      // fetchList(this.listQuery).then((response) => {
      //   this.list = response.data.items;
      //   this.total = response.data.total;
      //   // 模拟请求的时间
      setTimeout(() => {
        this.listLoading = false;
      }, 1.5 * 1000);
      // });
    },
    // 查询数据
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleUpdate(row) {},
    // 导出EXCEL表格
    handleDownload() {
      if (this.multipleSelection.length) {
        this.downloadLoading = true;
        import("@/vendor/Export2Excel").then((excel) => {
          const tHeader = ["Id", "Title", "Author", "Readings", "Date"];
          const filterVal = [
            "id",
            "title",
            "author",
            "pageviews",
            "display_time",
          ];
          const list = this.multipleSelection;
          const data = this.formatJson(filterVal, list);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: "出库信息",
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
  mounted() {
    this.tableHeight = window.innerHeight - 188 - 55;
  },
};
</script>

<style lang="scss" scoped>
.out_warehouse {
  height: 100%;
  padding: 20px;
}
</style>



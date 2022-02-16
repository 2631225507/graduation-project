<template>
  <div class="out_warehouse">
    <!-- 功能区 -->
    <div class="filter-container">
      <el-input
        class="filter-item"
        v-model="listQuery.name"
        placeholder="请输入商品名称"
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
        icon="el-icon-plus"
        style="margin-left: 10px"
        @click="handleCreate"
        >添加</el-button
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
      :height="tableHeight"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="order_number"
        label="产品货号"
        min-width="200"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="c_name"
        label="产品名称"
        min-width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="p_name"
        label="产品类别"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="detailed" label="尺码" width="150" align="center">
      </el-table-column>
      <el-table-column prop="time" label="库存" width="100" align="center">
      </el-table-column>
       <el-table-column
        prop="price"
        label="发售价格"
        width="120"
        align="center"
      >
      </el-table-column>
       <el-table-column
        prop="order_time"
        label="发售日期"
        width="120"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="200"
        fixed="right"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="handleUpdate(row)"
            >编辑</el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="handleDelete(row, $index)"
            >删除</el-button>
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
    <!-- 添加修改 -->
    <change-info
      v-if="dialogForm"
      :dialogStatus="dialogStatus"
      :dialogForm.sync="dialogForm"
    ></change-info>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import ChangeInfo from "./change";
export default {
  name: "WarehousingManagement",
  components: { Pagination, ChangeInfo },
  data() {
    return {
      value1: true,
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
      dialogForm: false, //添加修改弹窗
      dialogStatus: "", //添加修改弹窗标题
      downloadLoading: false,
      tableHeight: "",
    };
  },
  created() {
    this.getList();
  },
  mounted() {
    this.tableHeight = window.innerHeight - 188 - 55;
  },
  methods: {
    // 获取入库信息
    getList() {},
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
    // 打开添加弹窗
    handleCreate() {
      this.dialogStatus = "create";
      this.dialogForm = true;
    },
    // 打开修改弹窗
    handleUpdate(row) {
      this.dialogStatus = "update";
      this.dialogForm = true;
    },
    // 删除客户档案信息
    handleDelete(row, index) {
      this.$confirm(`是否继续删除区代号为【${row.code}】的信息?`, "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.list.splice(index, 1);
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


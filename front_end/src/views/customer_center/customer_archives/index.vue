<template>
  <div class="customer-info" ref="customerInfo">
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

    <!-- 表格数据 -->
    <el-table
      v-if="tableHeight"
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      :height="tableHeight"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" />
      <el-table-column label="客户名称" align="center" width="150">
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="销售产品" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.produce_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系地址" align="center">
        <el-table-column
          prop="province"
          label="省份"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="city"
          label="城市"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="area"
          label="市区"
          width="120"
          align="center"
        ></el-table-column>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="200"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="handleUpdate(row)"
            >编辑</el-button
          >
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

    <!-- 分页 -->
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <!-- 添加、修改弹窗 -->
    <change-info
      :formVisible.sync="formVisible"
      :state="state"
      v-if="formVisible"
    ></change-info>
  </div>
</template>

<script>
import ChangeInfo from "./change";
import { fetchList } from "@/api/article";
import Pagination from "@/components/Pagination";
export default {
  name: "CustomerProfileInfo",
  components: { Pagination, ChangeInfo },
  data() {
    return {
      // 表格数据
      list: [],
      tableHeight: "",
      total: 0, //表格数据条数
      listLoading: true, //表格数据加载样式
      listQuery: {
        //请求参数
        page: 1,
        limit: 10,
        name: "",
      },
      multipleSelection: [], //勾选数据
      formVisible: false, //添加修改弹窗
      state: "",
      downloadLoading: false,
    };
  },
  created() {
    this.getList();
  },
  mounted() {
    this.tableHeight = window.innerHeight - 188 - 55;
  },
  methods: {
    // 获取客户档案信息数据
    getList() {
      // 模拟请求的时间
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
    // 获取选中数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 打开添加弹窗
    handleCreate() {
      this.state = "create";
      this.formVisible = true;
    },
    // 打开修改弹窗
    handleUpdate(row) {
      this.clientInfo = Object.assign({}, row);
      this.state = "update";
      this.formVisible = true;
    },
    // 删除客户档案信息
    handleDelete(row, index) {
      this.$confirm(`是否继续删除客户名称为【${row.name}】的信息?`, "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.list.splice(index, 1);
      });
    },
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
            filename: "客户档案信息",
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
.customer-info {
  height: 100%;
  padding: 20px;
}
</style>





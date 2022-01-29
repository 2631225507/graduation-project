<template>
  <div class="staff-info">
    <!--功能区 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="请输入员工名称"
        style="width: 200px"
        class="filter-item"
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
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-plus"
        @click="handleCreate"
        >添加</el-button
      >
      <el-button
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
        >导出excel</el-button
      >
    </div>

    <!-- 表格数据 -->
    <el-table
      ref="multipleTable"
      v-if="tableHeight"
      v-loading="listLoading"
      :height="tableHeight"
      :data="list"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" />
      <el-table-column label="员工名称" align="center" width="150">
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="80px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.sex }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号码" width="180px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入职时间" min-width="150px" align="center">
        <template slot-scope="{ row }">
          {{ row.create_time }}
        </template>
      </el-table-column>
      <el-table-column label="联系地址" align="center">
        <el-table-column
          prop="province"
          label="省份"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="city" label="城市" width="120" align="center">
        </el-table-column>
        <el-table-column prop="area" label="市区" width="120" align="center">
        </el-table-column>
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
import { fetchList} from "@/api/article";
import ChangeInfo from "./change";
import Pagination from "@/components/Pagination";

export default {
  name: "StaffInfo",
  components: { Pagination ,ChangeInfo},
  data() {
    return {
      list: null, //表格数据
      total: 0, //表格总条数
      listLoading: true, //loading样式
      listQuery: {
        //请求参数
        page: 1,
        limit: 10,
        name: undefined,
      },
     
      multipleSelection: [], //表格勾选数据
      dialogForm: false, //添加编辑弹窗
      dialogStatus: "", //区分添加或修改弹窗
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
    // 获取客户档案信息数据
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        this.list = response.data.items;
        this.total = response.data.total;

        // 模拟请求的时间
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
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
.staff-info {
  height: 100%;
  padding: 20px;
}
</style>

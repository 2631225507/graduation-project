<template>
  <div class="staff-info">
    <!--功能区 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.staff_name"
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
      :data="list"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" />
      <el-table-column label="员工名称" align="center" width="150">
        <template slot-scope="{ row }">
          <span>{{ row.staff_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="80px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.sex == "1" ? "男" : "女" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入职时间" min-width="150px" align="center">
        <template slot-scope="{ row }">
          {{ row.entry_time.replace(/T/g, " ").replace(/\.[\d]{3}Z/, "") }}
        </template>
      </el-table-column>
      <el-table-column label="联系号码" width="250px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.staff_phone }}</span>
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
      :editData="editData"
    ></change-info>
  </div>
</template>

<script>
import { getStaffInfo, staffDelete } from "@/api/staff";
import ChangeInfo from "./change";
import Pagination from "@/components/Pagination";

export default {
  name: "StaffInfo",
  components: { Pagination, ChangeInfo },
  data() {
    return {
      list: null, //表格数据
      total: 0, //表格总条数
      listQuery: {
        //请求参数
        page: 1,
        limit: 10,
        staff_name: undefined,
      },
      multipleSelection: [], //表格勾选数据
      dialogForm: false, //添加编辑弹窗
      editData: {}, //编辑数据
      dialogStatus: "", //区分添加或修改弹窗
      downloadLoading: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 获取员工信息数据
    getList() {
      getStaffInfo(this.listQuery).then((res) => {
        this.list = res.data.rows;
        this.total = res.data.count;
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
      this.editData = row;
    },
    // 删除客户档案信息
    handleDelete(row, index) {
      this.$confirm(
        `是否继续删除员工名称为【${row.staff_name}】的信息?`,
        "删除",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        staffDelete(row).then((res) => {
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
    // 导出EXCEL表格
    handleDownload() {
      if (this.multipleSelection.length) {
        this.downloadLoading = true;
        import("@/vendor/Export2Excel").then((excel) => {
          const tHeader = [
            "员工姓名",
            "性别",
            "员工号码",
            "职务",
            "省",
            "市",
            "区",
            "入职时间",
          ];
          const filterVal = [
            "staff_name",
            "sex",
            "staff_phone",
            "duties",
            "province",
            "city",
            "area",
            "entry_time",
          ];
          const list = this.multipleSelection;
          const data = this.formatJson(filterVal, list);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: "员工信息",
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

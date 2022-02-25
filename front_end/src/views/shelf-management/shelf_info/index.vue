<template>
  <div class="shelf-info">
    <!-- 功能区 -->
    <div class="filter-container">
      <el-input
        class="filter-item"
        v-model="listQuery.shelf_number"
        placeholder="请输入货架号"
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
      :data="list"
      :height="tableHeight"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" />
      <el-table-column label="区代号" align="center" width="150">
        <template slot-scope="{ row }">
          <span>{{ row.area_code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="二级代号" align="center" width="150">
        <template slot-scope="{ row }">
          <span>{{ row.secondary_code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="货架层数" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.number_layers }}</span>
        </template>
      </el-table-column>
      <el-table-column label="货架号" width="250px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.shelf_number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="已存箱数" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span class="link-type" @click="handleDetail(row)">
            {{ row.access_box }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{
            row.created_at.replace(/T/g, " ").replace(/\.[\d]{3}Z/, "")
          }}</span>
        </template>
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

    <!-- 查看详情 -->
    <detail-info
      v-if="dialogVisible"
      :title="detailTitle"
      :detailData="detailData"
      :dialogVisible.sync="dialogVisible"
    ></detail-info>

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
import { getShelvesInfo, shelvesDelete } from "@/api/goods-shelves";
import DetailInfo from "./detail";
import ChangeInfo from "./change";
import Pagination from "@/components/Pagination";
export default {
  name: "ShelfInfo",
  components: { Pagination, DetailInfo, ChangeInfo },
  data() {
    return {
      list: [], //表格数据
      total: 0, //表格总条数
      listQuery: {
        //请求参数
        page: 1,
        limit: 10,
        shelf_number: undefined,
      },
      editData: {}, //编辑数据
      detailData:{},//详情数据
      tableHeight: "", //表格高度
      multipleSelection: [], //表格勾选数据
      downloadLoading: false,
      dialogVisible: false, //查看详情弹窗
      dialogForm: false, //添加修改弹窗
      detailTitle: "", //查看详情弹窗标题
      dialogStatus: "", //添加修改弹窗标题
    };
  },
  created() {
    this.getList();
  },
  mounted() {
    this.tableHeight = window.innerHeight - 188 - 55;
  },
  methods: {
    // 获取货架数据数据
    getList() {
      getShelvesInfo(this.listQuery).then((res) => {
        this.list = res.data.rows;
        this.total = res.data.count;
      });
    },
    // 查询数据
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    // 查看详情
    handleDetail(row) {
      // 已存箱数需大于0才能查看
      if (row.access_box > 0) {
        this.detailTitle = row.shelf_number + "货架存放的产品";
        this.dialogVisible = true;
        this.detailData = { ...row };
      } else {
        this.$message({
          message: "当前货架还未存放产品",
          type: "warning",
        });
      }
    },
    // 打开添加弹窗
    handleCreate() {
      this.dialogStatus = "create";
      this.dialogForm = true;
    },
    // 打开修改弹窗
    handleUpdate(row) {
      if (row.access_box > 0) {
        this.$message({
          message: "当前货架已存放产品，请先移除，在进行编辑",
          type: "warning",
        });
      } else {
        this.dialogStatus = "update";
        this.dialogForm = true;
        this.editData = row;
      }
    },
    // 删除客户档案信息
    handleDelete(row, index) {
      this.$confirm(
        `是否继续删除货架号为【${row.shelf_number}】的信息?`,
        "删除",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        shelvesDelete(row).then((res) => {
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
    // 获取选中数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 导出EXCEL表格
    handleDownload() {
      if (this.multipleSelection.length) {
        this.downloadLoading = true;
        import("@/vendor/Export2Excel").then((excel) => {
          const tHeader = [
            "区代号",
            "二级代号",
            "货架层数",
            "货架号",
            "已存取箱数",
            "创建时间",
          ];
          const filterVal = [
            "area_code",
            "secondary_code",
            "number_layers",
            "shelf_number",
            "access_box",
            "created_at",
          ];
          const list = this.multipleSelection;
          const data = this.formatJson(filterVal, list);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: "货架信息",
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
.shelf-info {
  height: 100%;
  padding: 20px;
}
</style>
<template>
  <div class="out_warehouse">
    <!-- 功能区 -->
    <div class="filter-container">
      <el-input
        class="filter-item"
        v-model="listQuery.product_name"
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
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        prop="product_number"
        label="产品编号"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column label="产品名称" min-width="150" align="center">
        <template slot-scope="{ row }">
          <span class="link-type" @click="handleDetail(row)">
            {{ row.product_name }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="产品类别" width="200" align="center">
      </el-table-column>
      <el-table-column prop="price" label="单价" width="120" align="center">
      </el-table-column>
       <el-table-column label="图片" min-width="120" align="center">
        <template slot-scope="{ row }">
          <img :src="row.img" alt="产品图片" style="width:80px;height:80px">
        </template>
      </el-table-column>
      <el-table-column label="上架日期" min-width="120" align="center">
        <template slot-scope="{ row }">
          {{ row.created_at }}
        </template>
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
    <!-- 添加修改 -->
    <change-info
      v-if="dialogForm"
      :dialogStatus="dialogStatus"
      :dialogForm.sync="dialogForm"
      :editData="editData"
    ></change-info>

    <!-- 详情 -->
    <detail-info
      v-if="dialogVisible"
      :title="detailTitle"
      :list="list"
      :dialogVisible.sync="dialogVisible"
    ></detail-info>
  </div>
</template>

<script>
import { getProductInfo, productDelete } from "@/api/product";
import Pagination from "@/components/Pagination";
import ChangeInfo from "./change";
import DetailInfo from "./detail";
export default {
  name: "CodeNumber",
  components: { Pagination, ChangeInfo, DetailInfo },
  data() {
    return {
      value1: true,
      tableData: [],
      total: 0, //表格总条数
      listQuery: {
        //请求参数
        page: 1,
        limit: 10,
        product_name: undefined,
      },
      detailTitle: "详情",
      list: [],
      editData: {},
      dialogForm: false, //添加修改弹窗
      dialogStatus: "", //添加修改弹窗标题
      dialogVisible: false, //产品详情弹窗
      downloadLoading: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 获取产品信息
    getList() {
      getProductInfo(this.listQuery).then((res) => {
        this.tableData = res.data.rows;
        this.total = res.data.count;
      });
    },
    // 查询数据
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    // 打开添加弹窗
    handleCreate() {
      this.dialogStatus = "create";
      this.dialogForm = true;
    },
    // 打开修改弹窗
    handleUpdate(row) {
      console.log(row);
      this.dialogStatus = "update";
      this.dialogForm = true;
      this.editData = row;
    },
    // 打开产品详情弹窗
    handleDetail(row) {
      this.list = { ...row };
      this.detailTitle = row.product_name + "详情";
      this.dialogVisible = true;
    },
    // 删除客户档案信息
    handleDelete(row, index) {
      this.$confirm(
        `是否继续删除产品名称为【${row.product_name}】的信息?`,
        "删除",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        productDelete(row).then((res) => {
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
            "产品编号",
            "产品名称",
            "产品类别",
            "尺码",
            "库存",
            "单价",
            "上架日期",
          ];
          const filterVal = [
            "product_number",
            "product_name",
            "type",
            "price",
            "product_name",
            "size",
            "stock",
            "created_at",
          ];
          const list = this.multipleSelection;
          const data = this.formatJson(filterVal, list);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: "产品清单",
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
.out_warehouse {
  height: 100%;
  padding: 20px;
}
</style>



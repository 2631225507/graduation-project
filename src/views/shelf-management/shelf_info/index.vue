<template>
  <div class="app-container">
    <!-- 功能区 -->
    <div class="filter-container">
      <el-input
        class="filter-item"
        v-model="listQuery.name"
        placeholder="请输入区代号"
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
      ref="multipleTable"
      style="width: 100%"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="区代号" prop="code" align="center" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="二级代号" align="center" width="150">
        <template slot-scope="{ row }">
          <span>{{ row.code_number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="货架层数" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="添加时间" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="货架号" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.goods_shelves }}</span>
        </template>
      </el-table-column>
      <el-table-column label="已存箱数" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span class="link-type" @click="handleDetail(row)">
            {{ row.p_sum }}
          </span>
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
      :title="detailTitle"
      :dialogVisible="dialogVisible"
      @closeDialog="closeDialog"
    ></detail-info>

    <!-- 添加修改 -->
    <change-info
      :dialogStatus="dialogStatus"
      :dialogForm="dialogForm"
      @cancleClick="cancleClick"
    ></change-info>
  </div>
</template>

<script>
import { fetchList, createArticle, updateArticle } from "@/api/article";
import DetailInfo from "./detail";
import ChangeInfo from "./change";
import Pagination from "@/components/Pagination";
export default {
  name: "ShelfInfo",
  components: { Pagination, DetailInfo, ChangeInfo },
  data() {
    return {
      list: [
        {
          code: 1,
          code_number: "张三",
          number: "13110653931",
          time: "福建省",
          goods_shelves: "福州市",
          p_sum: "0",
        },
        {
          code: 2,
          code_number: "；isj",
          number: "13110653931",
          time: "福11建省",
          goods_shelves: "11",
          p_sum: "2",
        },
      ],
      total: 2, //表格总条数
      listLoading: true, //loading样式
      listQuery: {
        //请求参数
        page: 1,
        limit: 10,
        name: undefined,
      },
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
  methods: {
    // 获取客户档案信息数据
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
    // 查看详情
    handleDetail(row) {
      if (row.p_sum > 0) {
        this.detailTitle = row.goods_shelves + "货架存放的产品";
        this.dialogVisible = true;
      } else {
        this.$message({
          message: "当前货架还未存放产品",
          type: "warning",
        });
      }
    },
    // 关闭查看弹窗
    closeDialog() {
      this.dialogVisible = false;
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
    // 关闭添加、修改弹窗
    cancleClick() {
      this.dialogForm = false;
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
</style>

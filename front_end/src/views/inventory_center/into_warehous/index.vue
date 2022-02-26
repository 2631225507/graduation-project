<template>
  <div class="into_warehous">
    <!-- 功能区 -->
    <div class="filter-container">
      <el-input
        class="filter-item"
        v-model="listQuery.order_number"
        placeholder="请输入订单号"
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
    </div>

    <!-- 表格 -->
    <el-table
      v-if="tableHeight"
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      :height="tableHeight"
    >
      <el-table-column label="订单号" width="200" align="center">
        <template slot-scope="{ row }">
          <span class="link-type" @click="handleDetail(row)">
            {{ row.order_number }}
          </span>
        </template></el-table-column
      >
      <el-table-column
        prop="client_name"
        label="退货客户"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column label="验货日期" min-width="120" align="center">
        <template slot-scope="{ row }">
          {{ row.signing_time.replace(/T/g, " ").replace(/\.[\d]{3}Z/, "") }}
        </template>
      </el-table-column>
      <el-table-column
        prop="save_shelf"
        label="存放货架"
        width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="tallying_staff"
        label="点货员"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column label="操作时间" min-width="100" align="center">
        <template slot-scope="{ row }">
          {{ row.created_at.replace(/T/g, " ").replace(/\.[\d]{3}Z/, "") }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="215" align="center">
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
    <!-- 新增/修改弹窗 -->
    <change-info
      :formVisible.sync="formVisible"
      v-if="formVisible"
      :state="state"
      :editData="editData"
    ></change-info>

    <!-- 详情 -->
    <detail-info
      v-if="dialogVisible"
      :list="list"
      :dialogVisible.sync="dialogVisible"
    ></detail-info>
  </div>
</template>

<script>
import { getWarehousingInfo, deleteWarehousing } from "@/api/warehousing";
import { orderInto } from "@/api/order";
import Pagination from "@/components/Pagination";
import ChangeInfo from "./change";
import DetailInfo from "./detail";
export default {
  name: "WarehousingManagement",
  components: { Pagination, ChangeInfo, DetailInfo },
  data() {
    return {
      tableData: [],
      tableHeight: "",
      total: 0, //表格总条数
      formVisible: false, //添加修改弹窗
      dialogVisible: false, //订单详情弹窗
      list: null,
      editData: {}, //编辑数据
      listQuery: {
        //请求参数
        page: 1,
        limit: 10,
        order_number: undefined,
      },
      downloadLoading: false,
    };
  },
  mounted() {
    this.tableHeight = window.innerHeight - 188 - 55;
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
    // 获取入库信息
    getList() {
      getWarehousingInfo(this.listQuery).then((res) => {
        this.tableData = res.data.rows;
        this.total = res.data.count;
      });
    },
    // 查询数据
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    // 打开订单详情弹窗
    handleDetail(row) {
      this.list = { ...row };
      this.dialogVisible = true;
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
        deleteWarehousing(row).then((res) => {
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
        let test = { ...row };
        test.is_into = 0;
        orderInto(test).then((res) => {
          console.log(res);
        });
      });
    },
    // 打开添加弹窗
    handleCreate() {
      this.state = "create";
      this.formVisible = true;
    },
    // 打开修改弹窗
    handleUpdate(row) {
      this.editData = Object.assign({}, row);
      this.state = "update";
      this.formVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.into_warehous {
  height: 100%;
  padding: 20px;
}
</style>



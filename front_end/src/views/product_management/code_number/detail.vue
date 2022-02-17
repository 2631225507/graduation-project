<template>
  <div class="product-info-detail">
    <el-dialog
      :title="title"
      :visible.sync="isOpen"
      center
      width="60%"
      @close="closeDialog"
    >
      <!-- 表格数据 -->
      <el-table
        style="width: 100%"
        :data="productList"
        border
        fit
        highlight-current-row
      >
        <el-table-column label="鞋码" align="center" min-width="170">
          <template slot-scope="{ row }">
            <span>{{ row.size }}</span>
          </template>
        </el-table-column>
        <el-table-column label="库存" align="center" min-width="170px">
          <template slot-scope="{ row }">
            <span>{{ row.stock }}</span>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    dialogVisible: {
      type: Boolean,
    },
    list: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    dialogVisible(newVal) {
      this.isOpen = newVal;
    },
    list(newVal) {
      this.productList = newVal;
    },
  },
  data() {
    return {
      isOpen: this.dialogVisible,
      productList: [],
    };
  },
  created() {
    this.productList = this.list.product_details;
  },
  methods: {
    // 关闭外层弹窗
    closeDialog() {
      this.$emit("update:dialogVisible", false);
    },
  },
};
</script>

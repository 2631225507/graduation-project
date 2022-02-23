<template>
  <div class="order-info-detail">
    <el-dialog
      title="订单详情"
      :visible.sync="isOpen"
      center
      width="60%"
      @close="closeDialog"
    >
      <div class="tip">
        <span style="font-size:16px">订单总额：</span>
        <span>{{ totalMoney }}</span>
      </div>
      <!-- 表格数据 -->
      <el-table
        style="width: 100%"
        :data="orderList"
        border
        fit
        highlight-current-row
      >
        <el-table-column label="产品名" align="center" min-width="170">
          <template slot-scope="{ row }">
            <span>{{ row.goods }}</span>
          </template>
        </el-table-column>
        <el-table-column label="尺码" align="center" min-width="170px">
          <template slot-scope="{ row }">
            <span>{{ row.size }}</span>
          </template>
        </el-table-column>
        <el-table-column label="库存" align="center" min-width="170px">
          <template slot-scope="{ row }">
            <span>{{ row.stock }}</span>
          </template>
        </el-table-column>
        <el-table-column label="单价" align="center" min-width="170px">
          <template slot-scope="{ row }">
            <span>{{ row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column label="下单数量" align="center" min-width="170px">
          <template slot-scope="{ row }">
            <span>{{ row.order_quantity }}</span>
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
      orderList: [], //订单详情
    };
  },
  created() {
    this.orderList = this.list.order_details;
  },
  computed: {
    totalMoney() {
      let total = 0;
      for (let i = 0; i < this.orderList.length; i++) {
        total += this.orderList[i].price * this.orderList[i].order_quantity;
      }
      return total;
    },
  },
  methods: {
    // 关闭外层弹窗
    closeDialog() {
      this.$emit("update:dialogVisible", false);
    },
  },
};
</script>


<style lang="scss" scoped>
.tip {
  color: #55b569;
  font-size:14px;
  margin-bottom: 10px;
}
</style>
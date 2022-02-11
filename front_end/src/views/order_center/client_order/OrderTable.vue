<template>
  <div class="order-table">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        prop="product_name"
        label="产品名称"
        min-width="200"
        align="center"
      ></el-table-column>
      <el-table-column prop="detailed" label="尺码" width="150" align="center">
      </el-table-column>
      <el-table-column prop="time" label="库存" width="100" align="center">
      </el-table-column>
      <el-table-column prop="price" label="单价" width="120" align="center">
      </el-table-column>
      <el-table-column label="下单数" align="center" width="200">
        <template slot-scope="{ row }">
          <el-input v-model="row.number" placeholder="请填写下单数"></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template> 

<script>
export default {
  props: {
    productData: {
      type: Array,
      default: () => {[]}
    },
  },
  watch: {
    productData(newVal) {
      this.tableData = newVal;
    },
  },
  data() {
    return {
      tableData: this.productData,
    };
  },
};
</script>

<style>
</style>
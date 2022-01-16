<template>
  <div class="shelf-info-detail">
    <el-dialog
      :title="title"
      :visible.sync="dialogProductVisible"
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
        <el-table-column label="产品名称" align="center" min-width="170">
          <template slot-scope="{ row }">
            <span>{{ row.pname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="负责人" align="center" min-width="170px">
          <template slot-scope="{ row }">
            <span>{{ row.staff }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="存库时间"
          sortable
          align="center"
          min-width="170"
        >
          <template slot-scope="{ row }">
            <span>{{ row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="200"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{ row }">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-s-promotion"
              @click="transferDialog(row)"
              >迁移货架</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 内层弹窗 -->
      <el-dialog
        width="40%"
        title="迁移货架"
        center
        :visible.sync="innerVisible"
        append-to-body
      >
        <el-form
          ref="dataForm"
          :rules="rules"
          :model="puoductInfo"
          label-position="left"
          label-width="100px"
          class="dialog-form"
        >
          <el-form-item label="当前货架:" prop="name">
            <el-input v-model="puoductInfo.goods_shelves" disabled  style="width: 80%"/>
          </el-form-item>
          <el-form-item label="移至货架" prop="product_name">
            <el-select
              v-model="puoductInfo.new_goods_shelves"
              clearable
              placeholder="请选择货架"
              style="width: 80%"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleTransfer">迁移</el-button>
        </span>
      </el-dialog>
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
  },
  watch: {
    dialogVisible(newVal, oldVal) {
      this.dialogProductVisible = newVal;
    },
  },
  data() {
    return {
      dialogProductVisible: false, //外层弹窗
      innerVisible: false, //内嵌弹窗
      productList: [
        {
          c_code_number: 0,
          pname: "HF-2001",
          staff: "职员004",
          time: 1590252833000,
        },
      ],
      puoductInfo: {},
      options:[],
      rules: {
        new_goods_shelves: [
          { required: true, message: "请选择货架", trigger: "change" }
        ]
      },
    };
  },
  methods: {
    // 获取货架详细数据
    getDetail() {},
    // 打开迁移弹窗
    transferDialog() {
      this.innerVisible = true;
    },
    // 迁移货架
    handleTransfer() {
      this.innerVisible = false;
    },
    // 关闭外层弹窗
    closeDialog() {
      this.$emit("closeDialog");
    },
  },
};
</script>

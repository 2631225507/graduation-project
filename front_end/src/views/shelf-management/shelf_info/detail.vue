<template>
  <div class="shelf-info-detail">
    <el-dialog
      :title="title"
      :visible.sync="isShow"
      center
      width="60%"
      @close="closeDialog"
    >
      <!-- 表格数据 -->
      <el-table
        style="width: 100%"
        :data="tableData"
        border
        fit
        highlight-current-row
      >
        <el-table-column label="产品名称" align="center" min-width="170">
          <template slot-scope="{ row }">
            <span>{{ productData(row).join() }}</span>
          </template>
        </el-table-column>
        <el-table-column label="负责人" align="center" min-width="170px">
          <template slot-scope="{ row }">
            <span>{{ row.tallying_staff }}</span>
          </template>
        </el-table-column>
        <el-table-column label="存库时间" sortable align="center" width="100">
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
          <el-form-item label="当前货架:">
            <el-input
              v-model="oldData.save_shelf"
              disabled
              style="width: 80%"
            />
          </el-form-item>
          <el-form-item label="移至货架" prop="shelf_id">
            <el-select
              v-model="puoductInfo.shelf_id"
              clearable
              placeholder="请选择存放货架"
              style="width: 100%"
              @change="shelfChange"
            >
              <el-option
                v-for="item in storeOptions"
                :key="item.shelf_id"
                :label="`${item.shelf_number}(已存取${item.access_box})`"
                :value="item.shelf_id"
                :disabled="item.disabled"
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
import { getWarehousingInfo } from "@/api/warehousing";
import { getShelvesInfo } from "@/api/goods-shelves";
import { updateWarehousing } from "@/api/warehousing";

export default {
  props: {
    title: {
      type: String,
    },
    dialogVisible: {
      type: Boolean,
    },
    detailData: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    dialogVisible(newVal) {
      this.isShow = newVal;
    },
  },
  data() {
    return {
      isShow: this.dialogVisible, //外层弹窗
      innerVisible: false, //内嵌弹窗
      tableData: [], //表格数据
      listQuery: {
        page: 1,
        limit: 10,
        shelf_id: undefined,
      },
      puoductInfo: {},
      storeOptions: [],
      oldData: {},
      rules: {
        shelf_id: [
          { required: true, message: "请选择货架", trigger: "change" },
        ],
      },
    };
  },
  created() {
    this.listQuery.shelf_id = this.detailData.shelf_id;
    this.getDetail();
  },
  computed: {
    productData() {
      return function (row) {
        const number = [];
        row.warehousing_details.forEach((item) => {
          return number.push(item.product.split(","));
        });
        let productNumber = [...new Set(number.flat(Infinity))];
        return productNumber;
      };
    },
  },
  methods: {
    // 获取货架详细数据
    getDetail() {
      // 获取货架详情
      getWarehousingInfo(this.listQuery).then((res) => {
        this.tableData = res.data.rows;
      });
    },
    // 打开迁移弹窗
    transferDialog(row) {
      this.oldData = { ...row };
      this.puoductInfo = { ...row };
      this.puoductInfo.shelf_id = "";
      this.innerVisible = true;
      this.getShelves();
    },
    // 获取货架字典值
    getShelves() {
      getShelvesInfo({ page: 1, limit: 999 }).then((res) => {
        this.storeOptions = res.data.rows;
        // 禁用当前货架
        this.storeOptions.forEach((item) => {
          if (item.shelf_id == this.oldData.shelf_id) {
            console.log(111);
            this.$set(item, "disabled", true);
          }
        });
      });
    },
    // 选择货架
    shelfChange(val) {
      if ((val ?? "") !== "") {
        let obj = {};
        obj = this.storeOptions.find((item) => {
          return item.shelf_id == val;
        });
        this.puoductInfo.save_shelf = obj.shelf_number;
      }
    },
    // 迁移货架
    handleTransfer() {
      updateWarehousing(this.puoductInfo, this.oldData).then((res) => {
        if (res.success) {
          this.$message({
            type: "success",
            message: "迁移成功！",
          });
          this.innerVisible = false;
          this.$parent.getList();
          this.closeDialog();
        } else {
          this.$message({
            type: "warning",
            message: "迁移失败!",
          });
        }
      });
    },
    // 关闭外层弹窗
    closeDialog() {
      this.$emit("update:dialogVisible", false);
    },
  },
};
</script>

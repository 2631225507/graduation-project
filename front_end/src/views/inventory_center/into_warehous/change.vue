<template>
  <div>
    <el-dialog
     :title="state == 'create' ? '新增退货订单' : '修改退货订单'"
      :visible.sync="isShow"
      @open="openDialog"
      @close="closeDialog"
      center
      width="50%"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="orderInfo"
        label-position="left"
        label-width="100px"
        class="dialog-form"
      >
        <el-form-item label="客户:" prop="name">
          <el-select
            v-model="orderInfo.name"
            clearable
            placeholder="请选择客户"
            style="width: 100%"
          >
            <el-option
              v-for="item in customOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单编号:" prop="number">
          <el-select
            v-model="orderInfo.number"
            clearable
            placeholder="请选择订单编号"
            style="width: 100%"
          >
            <el-option
              v-for="item in orderOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收货日期:" prop="address">
          <el-date-picker v-model="orderInfo.time" type="date" placeholder="请选择收货日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="验收员工" prop="staff">
          <el-select
            v-model="orderInfo.staff"
            multiple
            clearable
            placeholder="请选择验收员工"
            style="width: 100%"
          >
            <el-option
              v-for="item in staffOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="存放货架" prop="store">
          <el-select
            v-model="orderInfo.store"
            clearable
            placeholder="请选择存放货架"
            style="width: 100%"
          >
            <el-option
              v-for="item in storeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle()"> 取消 </el-button>
        <el-button
          type="primary"
          @click="state == 'create' ? createData() : updateData()"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createArticle } from "@/api/article";
export default {
  props: {
    formVisible: {
      type: Boolean,
    },
    state: {
      type: String,
    },
  },
  watch: {
    formVisible(val) {
      this.isShow = val;
    },
  },
  data() {
    return {
      isShow: this.formVisible,
      orderInfo: {},
      customOptions: [],
      orderOptions: [],
      customOptions: [],
      staffOptions: [],
      storeOptions: [],
      //表单验证规则
      rules: {
        province: [
          { required: true, message: "请选择省份", trigger: "change" },
        ],
        city: [{ required: true, message: "请选择城市", trigger: "change" }],
        area: [{ required: true, message: "请选择区域", trigger: "change" }],
        product_name: [
          { required: true, message: "请选择销售产品", trigger: "change" },
        ],
      },
    };
  },

  methods: {
    // 添加数据
    createData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          createArticle(this.orderInfo).then(() => {
            this.closeDialog();
          });
        }
      });
    },
    // 编辑数据
    updateData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          updateArticle(this.orderInfo).then(() => {
            this.closeDialog();
          });
        }
      });
    },
    // 取消添加/修改
    cancle() {
      this.closeDialog();
    },
    handleChange() {},
    // 打开弹窗
    openDialog() {},
    // 关闭弹窗
    closeDialog() {
      this.$emit("update:formVisible", false);
    },
  },
};
</script>


<style lang="scss" scoped>
.dialog-form {
  margin-left: 50px;
}
.form-item-city {
  margin-top: -60px;
  margin-left: 170px;
}
.form-item-area {
  margin-top: -60px;
  margin-left: 340px;
}
</style>
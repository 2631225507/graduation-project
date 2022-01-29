<template>
  <div>
    <el-dialog
      :title="state == 'create' ? '添加客户档案' : '编辑客户档案'"
      :visible.sync="isShow"
      @open="openDialog"
      @close="closeDialog"
      center
      width="50%"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="clientInfo"
        label-position="left"
        label-width="100px"
        class="dialog-form"
      >
        <el-form-item label="客户名称:" prop="name">
          <el-input
            v-model="clientInfo.name"
            placeholder="请输入客户名称"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="联系电话:" prop="phone">
          <el-input
            v-model="clientInfo.phone"
            placeholder="请输入联系电话"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="联系地址：" prop="address">
          <el-cascader
          style="width: 100%"
            :options="cityOptions"
            v-model="clientInfo.address"
            @change="handleChange"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="销售产品：" prop="product_name">
          <el-select
            v-model="clientInfo.product_name"
            multiple
            clearable
            placeholder="请选择销售产品"
            style="width: 100%"
          >
            <el-option
              v-for="item in productOptions"
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
import { createArticle, updateArticle } from "@/api/article";
import { isvalidPhone } from "@/utils/validate";
// 电话号码校验
var validPhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入电话号码"));
  } else if (!isvalidPhone(value)) {
    callback(new Error("请输入正确的11位手机号码"));
  } else {
    callback();
  }
};
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
      clientInfo: {
        //新增修改弹窗-表单信息
        name: "",
        phone: "",
        address: "",
        product_name: [],
      },
      cityOptions: [],
      productOptions: [
        //销售产品下拉数据
        {
          value: "黄金糕",
          label: "黄金糕",
        },
        {
          value: "双皮奶",
          label: "双皮奶",
        },
      ],
      //表单验证规则
      rules: {
        name: [
          { required: true, message: "请输入客户名称", trigger: "change" },
          {
            required: true,
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: "姓名不支持特殊字符",
            trigger: "change",
          },
        ],
        phone: [{ required: true, validator: validPhone, trigger: "change" }],
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
          createArticle(this.clientInfo).then(() => {
            this.closeDialog();
          });
        }
      });
    },
    // 编辑数据
    updateData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          updateArticle(this.clientInfo).then(() => {
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
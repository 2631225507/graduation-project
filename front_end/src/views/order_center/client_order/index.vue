<template>
  <div class="customer-orders">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="客户名称" prop="name">
        <el-select
          v-model="ruleForm.name"
          clearable
          placeholder="请选择客户名称"
          style="width: 100%"
        >
          <el-option
            v-for="item in nameOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品名称" prop="product">
        <div v-if="ruleForm.name == ''" class="tip">
          请优先选择客户获取其相关产品信息
        </div>
        <el-checkbox-group v-else v-model="ruleForm.product" @change="productChange">
          <el-checkbox v-for="item in products" :label="item" :key="item">{{
            item
          }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-table
        v-if="ruleForm.product.length != 0"
        :data="tableData"
        border
        class="form-table"
      >
        <el-table-column
          prop="product_name"
          label="产品名称"
          min-width="150"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="detailed"
          label="尺码"
          width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="time" label="库存" width="100" align="center">
        </el-table-column>
        <el-table-column prop="price" label="单价" width="120" align="center">
        </el-table-column>
        <el-table-column label="下单数" align="center" width="200">
          <template slot-scope="{ row }">
            <el-input
              v-model="row.number"
              placeholder="请填写下单数"
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-form-item label="联系电话:" prop="phone">
        <el-input v-model="ruleForm.phone" placeholder="请输入联系电话" />
      </el-form-item>
      <el-form-item label="所在区域" prop="address">
        <el-cascader
          placeholder="请选择省市区"
          :options="addressOptions"
          v-model="ruleForm.address"
          :props="addressProps"
          style="width: 100%"
          clearable
          filterable
        ></el-cascader>
      </el-form-item>
      <el-form-item label="详细地址" prop="detail">
        <el-input
          v-model="ruleForm.detail"
          placeholder="请输入详细地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="订单负责人" prop="functionary">
        <el-select
          v-model="ruleForm.functionary"
          clearable
          placeholder="请选择订单负责人"
          style="width: 100%"
        >
          <el-option
            v-for="item in functionaryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { isvalidPhone } from "@/utils/validate";
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
  data() {
    return {
      ruleForm: {
        name: "",
        phone: "",
        address: "",
        detail: "",
        product: [],
        functionary: "",
      },
      tableData: [],
      nameOptions: [{ lable: "员工1", value: "1" }],
      products: ["lining", "anta"],
      functionaryOptions: [],
      addressOptions: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致",
                },
              ],
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航",
                },
              ],
            },
          ],
        },
      ], //级联选择数据
      addressProps: {},
      rules: {
        name: [
          { required: true, message: "请选择客户名称", trigger: "change" },
        ],

        product: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个产品名称",
            trigger: "change",
          },
        ],
        phone: [{ required: true, trigger: "change", validator: validPhone }],
        address: [
          { required: true, message: "请选择所在区域", trigger: "change" },
        ],
        detail: [
          { required: true, message: "请填写详细地址", trigger: "blur" },
        ],
        functionary: [
          { required: true, message: "请选择订单负责人", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    productChange(val){
      console.log(val);
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.customer-orders {
  padding: 20px;
  .tip {
    color: #c1c5ce;
  }
  .form-table {
    margin: 0 0 20px 100px;
    width: 60%;
  }
}
</style>

<template>
  <div class="customer-orders">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
    >
      <el-form-item label="客户名称" label-width="100px" prop="client_id">
        <el-select
          v-model="ruleForm.client_id"
          clearable
          placeholder="请选择客户名称"
          style="width: 100%"
          @change="changeCustomer"
        >
          <el-option
            v-for="item in nameOptions"
            :key="item.customer_id"
            :label="item.customer_name"
            :value="item.customer_id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品名称" label-width="100px" prop="goods_name">
        <div v-if="ruleForm.client_id == ''" class="tip">
          请优先选择客户获取其相关产品信息
        </div>
        <el-checkbox-group
          v-else
          v-model="ruleForm.goods_name"
          @change="productChange"
        >
          <el-checkbox v-for="item in products" :label="item" :key="item">{{
            item
          }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-table
        v-if="ruleForm.goods_name.length != 0"
        :data="tableData"
        border
        class="form-table"
      >
        <el-table-column
          prop="goods"
          label="产品名称"
          min-width="150"
          align="center"
        ></el-table-column>
        <el-table-column prop="size" label="尺码" width="150" align="center">
        </el-table-column>
        <el-table-column prop="stock" label="库存" width="100" align="center">
        </el-table-column>
        <el-table-column prop="price" label="单价" width="120" align="center">
        </el-table-column>
        <el-table-column label="下单数" align="center" width="200">
          <template slot-scope="{ row }">
            <el-input
              v-model="row.order_quantity"
              placeholder="请填写下单数"
              type="number"
              @change="numberChange(row)"
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-form-item label="联系电话:" label-width="100px" prop="client_phone">
        <el-input
          v-model="ruleForm.client_phone"
          placeholder="请输入联系电话"
        />
      </el-form-item>
      <el-row type="flex">
        <el-col :span="10">
          <el-form-item
            prop="province_id"
            label-width="100px"
            label="联系地址:"
          >
            <el-select
              v-model="ruleForm.province_id"
              clearable
              placeholder="请选择省份"
              @change="changeProvice"
              style="width: 100%"
            >
              <el-option
                v-for="item in provinceOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="city_id">
            <el-select
              v-model="ruleForm.city_id"
              clearable
              placeholder="请选择市"
              @change="changeCity"
              :disabled="isSelectCity"
              style="width: 100%"
            >
              <el-option
                v-for="item in cityOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="area_id">
            <el-select
              v-model="ruleForm.area_id"
              clearable
              placeholder="请选择区"
              :disabled="isSelectArea"
              style="width: 100%"
              @change="changeArea"
            >
              <el-option
                v-for="item in areaOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="详细地址" label-width="100px" prop="detail_address">
        <el-input
          v-model="ruleForm.detail_address"
          placeholder="请输入详细地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="订单负责人" label-width="100px" prop="operator_id">
        <el-select
          v-model="ruleForm.operator_id"
          clearable
          placeholder="请选择订单负责人"
          style="width: 100%"
          @change="operatorChange"
        >
          <el-option
            v-for="item in operatorOptions"
            :key="item.staff_id"
            :label="item.staff_name"
            :value="item.staff_id"
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
import { getProvice, getCity, getArea } from "@/api/address";
import { getCustomerInfo } from "@/api/customer";
import { getProductInfo } from "@/api/product";
import { getStaffInfo } from "@/api/staff";
import { orderCreate } from "@/api/order";
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
  created() {
    this.getProvice();
    this.getCustomer();
    this.getProduct();
    this.getStaff();
  },
  data() {
    return {
      ruleForm: {
        client_id: "",
        client_phone: "",
        goods_name: [],
      },
      tableData: [], //表格数据
      temporary: [], //暂存表格数据（用于筛选）
      nameOptions: [], //客户下拉框
      products: [], //产品多选框
      operatorOptions: [], //订单负责人下拉框
      provinceOptions: [], //省下拉框
      cityOptions: [], //市下拉框
      areaOptions: [], //区下拉框
      isSelectCity: true, //是否禁用市下拉
      isSelectArea: true, //是否禁用区下拉
      rules: {
        client_id: [
          { required: true, message: "请选择客户名称", trigger: "change" },
        ],
        goods_name: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个产品名称",
            trigger: "change",
          },
        ],
        client_phone: [
          { required: true, trigger: "change", validator: validPhone },
        ],
        province_id: [
          { required: true, message: "请选择省份", trigger: "change" },
        ],
        city_id: [{ required: true, message: "请选择市", trigger: "change" }],
        area_id: [{ required: true, message: "请选择区", trigger: "change" }],
        detail_address: [
          { required: true, message: "请填写详细地址", trigger: "blur" },
        ],
        operator_id: [
          { required: true, message: "请选择订单负责人", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    // 获取客户信息
    getCustomer() {
      getCustomerInfo({ page: 1, limit: 9999 }).then((res) => {
        this.nameOptions = res.data.rows;
      });
    },
    // 获取省份
    getProvice() {
      getProvice().then((res) => {
        this.provinceOptions = res.data;
      });
    },
    // 获取市
    getCity(val) {
      getCity(val).then((res) => {
        this.cityOptions = res.data;
      });
    },
    // 获取区
    getArea(val) {
      getArea(val).then((res) => {
        this.areaOptions = res.data;
      });
    },
    // 获取产品信息
    getProduct() {
      getProductInfo({ page: 1, limit: 9999 }).then((res) => {
        this.temporary = res.data.rows;
      });
    },
    // 获取订单负责人
    getStaff() {
      getStaffInfo({ page: 1, limit: 9999 }).then((res) => {
        this.operatorOptions = res.data.rows;
      });
    },
    // 选择客户
    changeCustomer(val) {
      if ((val ?? "") !== "") {
        let obj = {};
        obj = this.nameOptions.find((item) => {
          return item.customer_id === val;
        });
        this.ruleForm.client_name = obj.customer_name;
        this.ruleForm.client_phone = parseInt(obj.customer_phone);
        this.products = obj.promoting_products.split(",");
      }
    },
    // 选择省份
    changeProvice(val) {
      this.isSelectCity = false;
      if ((val ?? "") !== "") {
        this.getCity({ code: val });
        let obj = {};
        obj = this.provinceOptions.find((item) => {
          return item.code === val;
        });
        this.ruleForm.province = obj.name;
      } else {
        this.isSelectCity = true;
      }
      if ((this.ruleForm.city_id ?? "") !== "") {
        this.ruleForm.city_id = null;
        this.cityOptions = [];
      }
      if ((this.ruleForm.area_id ?? "") !== "") {
        this.isSelectArea = true;
        this.ruleForm.area_id = null;
        this.areaOptions = [];
      }
    },
    // 选择市
    changeCity(val) {
      this.isSelectArea = false;
      if ((val ?? "") !== "") {
        this.getArea({ code: val });
        let obj = {};
        obj = this.cityOptions.find((item) => {
          return item.code === val;
        });
        this.ruleForm.city = obj.name;
      } else {
        this.isSelectArea = true;
      }
      if ((this.ruleForm.area_id ?? "") !== "") {
        this.ruleForm.area_id = null;
        this.areaOptions = [];
      }
    },
    // 选择区
    changeArea(val) {
      let obj = {};
      obj = this.areaOptions.find((item) => {
        return item.code === val;
      });
      this.ruleForm.area = obj.name;
    },
    // 选择产品
    productChange(val) {
      let text = [];
      this.tableData = [];
      if ((val ?? "") !== "") {
        // 获取表格未处理数据
        this.temporary.forEach((item) => {
          val.forEach((value) => {
            if (item.product_name == value) {
              text.push(item);
            }
          });
        });
        // 设置表格缺少字段
        for (let i = 0; i < text.length; i++) {
          text[i].product_details.forEach((content) => {
            this.$set(content, "goods", text[i].product_name);
            this.$set(content, "price", text[i].price);
            this.$set(content, "order_quantity", null);
          });
        }
        // 获取表格已处理数据
        text.forEach((data) => {
          data.product_details.forEach((data1) => {
            this.tableData.push(data1);
          });
        });
      }
    },
    // 选择负责人
    operatorChange(val) {
      if ((val ?? "") !== "") {
        let obj = {};
        obj = this.operatorOptions.find((item) => {
          return item.staff_id == val;
        });
        this.ruleForm.operator = obj.staff_name;
      }
    },
    // 判断下单数量是否超过库存
    numberChange(row) {
      if (parseInt(row.order_quantity) < 0) {
        this.$message({
          type: "warning",
          message: "下单数量不能小于0",
          duration: 5000,
        });
        row.order_quantity = "";
      } else if (parseInt(row.stock) < parseInt(row.order_quantity)) {
        this.$message({
          type: "warning",
          message: "当前库存不足，请重新填写！",
          duration: 5000,
        });
        row.order_quantity = "";
      }
    },
    // 添加
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let infoTable = [];
          // 删除表格中下单数量为空的数据
          for (let i = 0; i < this.tableData.length; i++) {
            if ((this.tableData[i].order_quantity ?? "") !== "") {
              infoTable.push(this.tableData[i]);
            }
          }
          // 计算库存剩余
          for (let j = 0; j < infoTable.length; j++) {
            infoTable[j].surplus = String(
              infoTable[j].stock - infoTable[j].order_quantity
            );
          }
          if (infoTable <= 0) {
            this.$message({
              type: "warning",
              message: "请至少填写一条产品下单信息",
            });
          } else {
            // 订单编号
            this.ruleForm.order_number =
              new Date().valueOf() + new Date().getDate();
            // 发货时间
            this.ruleForm.delivery_time = null;
            // 是否出库
            this.ruleForm.is_issue = 0;
            orderCreate(this.ruleForm, infoTable).then((res) => {
              if (res.success) {
                this.$message({
                  type: "success",
                  message: "添加成功！",
                });
                this.resetForm("ruleForm");
              } else {
                this.$message({
                  type: "warning",
                  message: "添加失败!",
                });
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    // 重置
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
  ::v-deep input::-webkit-outer-spin-button,
  ::v-deep input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
  }
  ::v-deep input[type="number"] {
    -moz-appearance: textfield !important;
  }
}
</style>

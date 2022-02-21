<template>
  <div>
    <el-dialog
      :title="state == 'create' ? '添加客户档案' : '编辑客户档案'"
      :visible.sync="isShow"
      @close="closeDialog"
      center
      width="50%"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="clientInfo"
        label-position="left"
        class="dialog-form"
      >
        <el-form-item
          label="客户名称:"
          label-width="100px"
          prop="customer_name"
        >
          <el-input
            v-model="clientInfo.customer_name"
            placeholder="请输入客户名称"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item
          label="联系电话:"
          label-width="100px"
          prop="customer_phone"
        >
          <el-input
            v-model="clientInfo.customer_phone"
            placeholder="请输入联系电话"
            style="width: 100%"
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
                v-model="clientInfo.province_id"
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
                v-model="clientInfo.city_id"
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
                v-model="clientInfo.area_id"
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
        <el-form-item
          label="销售产品："
          label-width="100px"
          prop="product_name"
        >
          <el-select
            v-model="clientInfo.promoting_id"
            multiple
            clearable
            placeholder="请选择销售产品"
            style="width: 100%"
            @change="changeProduct"
          >
            <el-option
              v-for="item in productOptions"
              :key="item.product_id"
              :label="item.product_name"
              :value="item.product_id"
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
import { getProvice, getCity, getArea } from "@/api/address";
import { getProductInfo } from "@/api/product";
import { customerCreate, customerUpdate } from "@/api/customer";
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
    editData: {
      type: Object,
      default: () => {},
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
        promoting_id: [],
      },
      provinceOptions: [],
      cityOptions: [],
      areaOptions: [],
      productOptions: [],
      isSelectCity: true,
      isSelectArea: true,
      //表单验证规则
      rules: {
        customer_name: [
          { required: true, message: "请输入客户名称", trigger: "change" },
          {
            required: true,
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: "姓名不支持特殊字符",
            trigger: "change",
          },
        ],
        customer_phone: [
          { required: true, validator: validPhone, trigger: "change" },
        ],
        province_id: [
          { required: true, message: "请选择省份", trigger: "change" },
        ],
        city_id: [{ required: true, message: "请选择市", trigger: "change" }],
        area_id: [{ required: true, message: "请选择区", trigger: "change" }],
        promoting_id: [
          { required: true, message: "请选择销售产品", trigger: "change" },
        ],
      },
    };
  },
  created() {
    if (this.state == "update") {
      this.clientInfo = { ...this.editData };
      // 下拉数据回显问题
      this.clientInfo.promoting_id = this.clientInfo.promoting_id.split(',')
      this.clientInfo.promoting_id = this.clientInfo.promoting_id.map( item => {
        return parseInt(item)
      })
      this.clientInfo.province_id = String(this.clientInfo.province_id);
      this.clientInfo.city_id = String(this.clientInfo.city_id);
      this.clientInfo.area_id = String(this.clientInfo.area_id);
      this.isSelectCity = false;
      this.getCity({ code: this.clientInfo.province_id });
      this.isSelectArea = false;
      this.getArea({ code: this.clientInfo.city_id });
    }
    this.getProvice();
    this.getProductList();
  },
  methods: {
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
    // 获取销售产品信息
    getProductList() {
      getProductInfo({ page: 1, limit: 9999 }).then((res) => {
        this.productOptions = res.data.rows;
      });
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
        this.clientInfo.province = obj.name;
      } else {
        this.isSelectCity = true;
      }
      if ((this.clientInfo.city_id ?? "") !== "") {
        this.clientInfo.city_id = null;
        this.cityOptions = [];
      }
      if ((this.clientInfo.area_id ?? "") !== "") {
        this.isSelectArea = true;
        this.clientInfo.area_id = null;
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
        this.clientInfo.city = obj.name;
      } else {
        this.isSelectArea = true;
      }
      if ((this.clientInfo.area_id ?? "") !== "") {
        this.clientInfo.area_id = null;
        this.areaOptions = [];
      }
    },
    // 选择区
    changeArea(val) {
      let obj = {};
      obj = this.areaOptions.find((item) => {
        return item.code === val;
      });
      this.clientInfo.area = obj.name;
    },
    // 选择销售产品
    changeProduct(val) {
      this.clientInfo.promoting_products = [];
      if ((val ?? "") !== "") {
        for (let i = 0; i < this.productOptions.length; i++) {
          for (let j = 0; j < val.length; j++) {
            if (this.productOptions[i].product_id == val[j]) {
              this.clientInfo.promoting_products.push(
                this.productOptions[i].product_name
              );
            }
          }
        }
      }
    },
    // 类型转换
    typeConversion() {
      this.clientInfo.promoting_id = this.clientInfo.promoting_id.join();
      this.clientInfo.promoting_products = this.clientInfo.promoting_products.join();
    },
    // 添加数据
    createData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.typeConversion();
          customerCreate(this.clientInfo).then((res) => {
            if (res.success) {
              this.$message({
                type: "success",
                message: "添加成功！",
              });
              this.closeDialog();
              this.$parent.getList();
            } else {
              this.$message({
                type: "warning",
                message: "添加失败!",
              });
            }
          });
        }
      });
    },
    // 编辑数据
    updateData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.typeConversion();
          customerUpdate(this.clientInfo).then((res) => {
            if (res.success) {
              this.$message({
                type: "success",
                message: "修改成功！",
              });
              this.closeDialog();
              this.$parent.getList();
            } else {
              this.$message({
                type: "warning",
                message: "修改失败!",
              });
            }
          });
        }
      });
    },
    // 取消添加/修改
    cancle() {
      this.closeDialog();
    },

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
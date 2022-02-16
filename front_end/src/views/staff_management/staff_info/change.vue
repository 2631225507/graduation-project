<template>
  <div>
    <el-dialog
      :title="dialogStatus == 'create' ? '添加员工信息' : '编辑员工信息'"
      :visible.sync="isShow"
      center
      width="50%"
      @close="closeDialog"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="staffInfo"
        label-position="left"
        style="margin-left: 50px"
      >
        <el-form-item label="员工名称:" label-width="100px" prop="staff_name">
          <el-input
            v-model="staffInfo.staff_name"
            placeholder="请输入员工名称"
          />
        </el-form-item>
        <el-form-item label="性别:" label-width="100px" prop="sex">
          <el-radio-group v-model="staffInfo.sex">
            <el-radio border label="1">男</el-radio>
            <el-radio border label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="入职时间:" label-width="100px" prop="entry_time">
          <el-date-picker
            v-model="staffInfo.entry_time"
            type="datetime"
            style="width: 100%"
            placeholder="请选择入职时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="联系电话:" label-width="100px" prop="staff_phone">
          <el-input
            v-model="staffInfo.staff_phone"
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
                v-model="staffInfo.province_id"
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
                v-model="staffInfo.city_id"
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
                v-model="staffInfo.area_id"
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleClick"> 取消 </el-button>
        <el-button
          type="primary"
          @click="dialogStatus == 'create' ? createData() : updateData()"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getProvice, getCity, getArea, getDuties } from "@/api/address";
import { staffCreate, staffUpdate } from "@/api/staff";
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
  props: {
    dialogStatus: {
      type: String,
    },
    dialogForm: {
      type: Boolean,
    },
    editData: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    dialogForm(val) {
      this.isShow = val;
    },
  },
  data() {
    return {
      isShow: this.dialogForm,
      staffInfo: {},
      rules: {
        //表单验证规则
        staff_name: [
          { required: true, message: "请输入员工名称", trigger: "change" },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        province_id: [
          { required: true, message: "请选择省份", trigger: "change" },
        ],
        city_id: [{ required: true, message: "请选择市", trigger: "change" }],
        area_id: [{ required: true, message: "请选择区", trigger: "change" }],
        staff_phone: [
          { required: true, trigger: "change", validator: validPhone },
        ],
        entry_time: [
          { required: true, message: "请选择入职时间", trigger: "change" },
        ],
      },
      provinceOptions: [],
      cityOptions: [],
      areaOptions: [],
      isSelectCity: true,
      isSelectArea: true,
    };
  },
  created() {
    this.getProvice();
    if (this.dialogStatus == "update") {
      this.staffInfo = { ...this.editData };
      // 下拉数据回显问题
      this.staffInfo.province_id = String(this.staffInfo.province_id);
      this.staffInfo.city_id = String(this.staffInfo.city_id);
      this.staffInfo.area_id = String(this.staffInfo.area_id);
      this.isSelectCity = false;
      this.getCity({ code: this.staffInfo.province_id });
      this.isSelectArea = false;
      this.getArea({ code: this.staffInfo.city_id });
    } else {
      this.staffInfo = { sex: "1" };
    }
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
    // 选择省份
    changeProvice(val) {
      console.log(val);
      this.isSelectCity = false;
      if ((val ?? "") !== "") {
        this.getCity({ code: val });
        let obj = {};
        obj = this.provinceOptions.find((item) => {
          return item.code === val;
        });
        this.staffInfo.province = obj.name;
      } else {
        this.isSelectCity = true;
      }
      if ((this.staffInfo.city_id ?? "") !== "") {
        this.staffInfo.city_id = null;
        this.cityOptions = [];
      }
      if ((this.staffInfo.area_id ?? "") !== "") {
        this.isSelectArea = true;
        this.staffInfo.area_id = null;
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
        this.staffInfo.city = obj.name;
      } else {
        this.isSelectArea = true;
      }
      if ((this.staffInfo.area_id ?? "") !== "") {
        this.staffInfo.area_id = null;
        this.areaOptions = [];
      }
    },
    // 选择区
    changeArea(val) {
      let obj = {};
      obj = this.areaOptions.find((item) => {
        return item.code === val;
      });
      this.staffInfo.area = obj.name;
    },
    // 关闭弹窗
    closeDialog() {
      this.$emit("update:dialogForm", false);
    },
    // 提交客户档案信息（添加）
    createData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          staffCreate(this.staffInfo).then((res) => {
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
    // 提交客户档案信息（编辑）
    updateData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          staffUpdate(this.staffInfo).then((res) => {
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
    // 取消
    cancleClick() {
      this.closeDialog();
    },
  },
};
</script>



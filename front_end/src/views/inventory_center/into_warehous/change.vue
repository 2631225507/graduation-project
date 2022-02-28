<template>
  <div>
    <el-dialog
      :title="state == 'create' ? '新增退货订单' : '修改退货订单'"
      :visible.sync="isShow"
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
        <el-form-item label="订单编号:" prop="order_id">
          <el-select
            v-model="orderInfo.order_id"
            clearable
            filterable
            :disabled="isUse"
            placeholder="请选择订单编号"
            style="width: 100%"
            @change="orderChange"
          >
            <el-option
              v-for="item in orderOptions"
              :key="item.order_id"
              :label="item.order_number"
              :value="item.order_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="退货客户:">
          <el-input
            v-model="orderInfo.client_name"
            placeholder="请填写退货客户"
            disabled
            style="width: 100%"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="验收日期:" prop="signing_time">
          <el-date-picker
            v-model="orderInfo.signing_time"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择验收日期"
            style="width: 100%"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="验收员工" prop="staff_id">
          <el-select
            v-model="orderInfo.staff_id"
            clearable
            placeholder="请选择验收员工"
            style="width: 100%"
            @change="staffChange"
          >
            <el-option
              v-for="item in staffOptions"
              :key="item.staff_id"
              :label="item.staff_name"
              :value="item.staff_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="存放货架" prop="shelf_id">
          <el-select
            v-model="orderInfo.shelf_id"
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
import { getOrderInfo, orderInto } from "@/api/order";
import { getStaffInfo } from "@/api/staff";
// import { queryDetail } from "@/api/product";
import { getShelvesInfo } from "@/api/goods-shelves";
import { warehousingCreate, updateWarehousing } from "@/api/warehousing";
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
      orderInfo: {},
      detailArr: [],
      isUse: false,
      orderOptions: [],
      staffOptions: [],
      storeOptions: [],
      detailStock: [],
      //表单验证规则
      rules: {
        order_id: [
          { required: true, message: "请选择退货的订单号", trigger: "change" },
        ],
        signing_time: [
          { required: true, message: "请选择验收日期", trigger: "change" },
        ],
        staff_id: [
          { required: true, message: "请选择验收员工", trigger: "change" },
        ],
        shelf_id: [
          { required: true, message: "请选择存放货架", trigger: "change" },
        ],
      },
    };
  },
  created() {
    if (this.state == "update") {
      this.isUse = true;
      this.orderInfo = { ...this.editData };
    }
    this.getOrder();
    this.getStaff();
    this.getShelves();
  },
  methods: {
    // 获取订单信息
    getOrder() {
      getOrderInfo({ page: 1, limit: 999, is_into: 0 }).then((res) => {
        this.orderOptions = res.data.rows;
      });
    },
    // 选择订单
    orderChange(val) {
      if ((val ?? "") !== "") {
        let obj = {};
        obj = this.orderOptions.find((item) => {
          return item.order_id == val;
        });
        this.orderInfo.order_number = obj.order_number;
        this.orderInfo.client_name = obj.operator;
        this.detailArr = obj.order_details;
      }
    },
    // 获取验收员工字典值
    getStaff() {
      getStaffInfo({ page: 1, limit: 999 }).then((res) => {
        this.staffOptions = res.data.rows;
      });
    },
    // 选择验收员工
    staffChange(val) {
      if ((val ?? "") !== "") {
        let obj = {};
        obj = this.staffOptions.find((item) => {
          return item.staff_id == val;
        });
        this.orderInfo.tallying_staff = obj.staff_name;
      }
    },
    // 获取货架字典值
    getShelves() {
      getShelvesInfo({ page: 1, limit: 999 }).then((res) => {
        this.storeOptions = res.data.rows;
      });
    },
    // 选择货架
    shelfChange(val) {
      if ((val ?? "") !== "") {
        let obj = {};
        obj = this.storeOptions.find((item) => {
          return item.shelf_id == val;
        });
        this.orderInfo.save_shelf = obj.shelf_number;
      }
    },
    // 添加数据
    createData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          warehousingCreate(this.orderInfo, this.detailArr).then((res) => {
            if (res.success) {
              this.$message({
                type: "success",
                message: "添加成功！",
              });
              this.$parent.getList();
              this.closeDialog();
            } else {
              this.$message({
                type: "warning",
                message: "添加失败!",
              });
            }
          });

          // 修改订单状态（是否入库）
          let test = { ...this.orderInfo };
          test.is_into = 1;
          orderInto(test).then((res) => {
            console.log(res);
          });
        }
      });
    },
    // 编辑数据
    updateData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          updateWarehousing(this.orderInfo, this.editData).then((res) => {
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
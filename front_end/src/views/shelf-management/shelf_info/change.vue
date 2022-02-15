<template>
  <div class="change-data">
    <el-dialog
      :title="dialogStatus == 'create' ? '添加货架信息' : '编辑货架信息'"
      :visible.sync="isOpen"
      center
      width="60%"
      @close="cancleClick"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="shelfData"
        label-position="left"
        label-width="100px"
        class="dialog-form"
      >
        <el-form-item label="区代号:" prop="area_code">
          <el-input v-model="shelfData.area_code" style="width: 80%" />
        </el-form-item>
        <el-form-item label="二级代号:" prop="secondary_code">
          <el-input v-model="shelfData.secondary_code" style="width: 80%" />
        </el-form-item>
        <el-form-item label="货架层数:" prop="number_layers">
          <el-input
            type="number"
            oninput="if(value <0)value=0"
            v-model="shelfData.number_layers"
            style="width: 80%"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancleClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { shelvesCreate, shelvesUpdate } from "@/api/goods-shelves";
export default {
  data() {
    return {
      isOpen: this.dialogForm,
      shelfData: {},
      dialogFormVisible: false,
      rules: {
        area_code: [
          { required: true, message: "请填写区代号", trigger: "change" },
        ],
        secondary_code: [
          { required: true, message: "请填写二级代号", trigger: "change" },
        ],
        number_layers: [
          { required: true, message: "请填写货架层数", trigger: "change" },
        ],
      },
    };
  },
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
    dialogForm(newVal) {
      this.isOpen = newVal;
    },
  },
  created() {
    if (this.dialogStatus == "update") {
      this.shelfData = { ...this.editData };
    }
  },
  methods: {
    // 取消
    cancleClick() {
      this.$emit("update:dialogForm", false);
    },
    // 确认
    confirmClick() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          if (this.dialogStatus == "create") {
            this.createData();
          } else {
            this.updateData();
          }
          this.cancleClick();
        }
      });
    },
    // 提交客户档案信息（添加）
    createData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          shelvesCreate(this.shelfData).then((res) => {
            if (res.success) {
              this.$message({
                type: "success",
                message: "添加成功！",
              });
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
          shelvesUpdate(this.shelfData).then((res) => {
            if (res.success) {
              this.$message({
                type: "success",
                message: "修改成功！",
              });
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
  },
};
</script>

<style lang="scss" scoped>
::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
::v-deep input[type="number"] {
  -moz-appearance: textfield !important;
}
</style>
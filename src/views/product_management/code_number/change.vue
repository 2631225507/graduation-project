<template>
  <div class="change-data">
    <el-dialog
      :title="dialogStatus == 'create' ? '添加产品信息' : '编辑产品信息'"
      :visible.sync="dialogFormVisible"
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
        <el-form-item label="区代号:" prop="code">
          <el-input v-model="shelfData.code" style="width: 80%" />
        </el-form-item>
        <el-form-item label="二级代号:" prop="code_number">
          <el-input v-model="shelfData.code_number" style="width: 80%" />
        </el-form-item>
        <el-form-item label="货架层数:" prop="number">
          <el-input v-model="shelfData.number" style="width: 80%" />
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
export default {
  data() {
    return {
      shelfData: {},
      dialogFormVisible: false,
      rules: {
        code: [{ required: true, message: "请选择区代号", trigger: "change" }],
        code_number: [
          { required: true, message: "请选择二级代号", trigger: "change" },
        ],
        number: [
          { required: true, message: "请选择货架层数", trigger: "change" },
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
  },
  watch: {
    dialogForm(newVal, oldVal) {
      this.dialogFormVisible = newVal;
      this.resetTemp();
    },
  },
  methods: {
    // 取消
    cancleClick() {
      this.$emit("cancleClick");
    },
    // 确认
    confirmClick() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.$emit("cancleClick");
        }
      });
    },
    // 清空添加弹窗数据
    resetTemp() {
      this.shelfData = {};
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    // 打开添加弹窗
    // handleCreate() {
    //   this.resetTemp();
    //   this.dialogStatus = "create";
    //   this.dialogFormVisible = true;
    //   this.$nextTick(() => {
    //     this.$refs["dataForm"].clearValidate();
    //   });
    // },
    // 提交客户档案信息（添加）
    createData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          createArticle(this.clientInfo).then(() => {
            this.list.unshift(this.clientInfo);
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "Created Successfully",
              type: "success",
              duration: 2000,
            });
          });
        }
      });
    },
    // 打开修改弹窗
    // handleUpdate(row) {
    //   this.clientInfo = Object.assign({}, row); // copy obj
    //   this.dialogStatus = "update";
    //   this.dialogFormVisible = true;
    //   this.$nextTick(() => {
    //     this.$refs["dataForm"].clearValidate();
    //   });
    // },
    // 提交客户档案信息（编辑）
    updateData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.clientInfo);
          tempData.timestamp = +new Date(tempData.timestamp);
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex(
              (v) => v.id === this.clientInfo.id
            );
            this.list.splice(index, 1, this.clientInfo);
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "Update Successfully",
              type: "success",
              duration: 2000,
            });
          });
        }
      });
    },
  },
};
</script>

<style>
</style>
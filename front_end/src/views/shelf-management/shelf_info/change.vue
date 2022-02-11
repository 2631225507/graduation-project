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
      isOpen: this.dialogForm,
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
    dialogForm(newVal) {
      this.isOpen = newVal;
    },
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
          this.cancleClick();
        }
      });
    },
    // 提交客户档案信息（添加）
    createData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          createArticle(this.clientInfo).then(() => {});
        }
      });
    },
    // 提交客户档案信息（编辑）
    updateData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          updateArticle(tempData).then(() => {});
        }
      });
    },
  },
};
</script>

<style>
</style>
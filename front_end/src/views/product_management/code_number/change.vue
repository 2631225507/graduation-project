<template>
  <div class="change-data">
    <el-dialog
      :title="dialogStatus == 'create' ? '添加产品信息' : '编辑产品信息'"
      :visible.sync="isShow"
      center
      width="50%"
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
        <el-form-item label="商品名称:" prop="name">
          <el-input v-model="shelfData.name" style="width: 100%" />
        </el-form-item>
        <el-form-item label="商品类别:" prop="type">
          <el-input v-model="shelfData.type" style="width: 100%" />
        </el-form-item>
        <!-- <el-form-item label="尺码:" prop="number">
          <el-input v-model="shelfData.number" style="width: 100%" />
        </el-form-item>
        <el-form-item label="库存:" prop="stock">
          <el-input v-model="shelfData.stock" style="width:100%" />
        </el-form-item> -->
        <el-form-item label="价格:" prop="price">
          <el-input v-model="shelfData.price" style="width: 100%" />
        </el-form-item>
        <el-row v-for="(domain, index) in shelfData.domains" :key="domain.key">
          <el-form-item
            label="尺码"
            :prop="'domains.' + index + '.number'"
            :rules="{
              required: true,
              message: '尺码不能为空',
              trigger: 'blur',
            }"
          >
            <el-input v-model="domain.number"></el-input>
          </el-form-item>
          <el-form-item
            label="库存"
            :prop="'domains.' + index + '.stock'"
            :rules="{
              required: true,
              message: '库存不能为空',
              trigger: 'blur',
            }"
          >
            <el-input v-model="domain.stock"></el-input>
          </el-form-item>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancleClick">取消</el-button>
        <el-button type="primary" @click="addFormItem"
          >新增尺码、库存</el-button
        >
        <el-button type="primary" @click="confirmClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shelfData: {
        domains: [],
      },
      isShow: this.dialogForm,
      rules: {
        name: [
          { required: true, message: "请填写商品名称", trigger: "change" },
        ],
        type: [
          { required: true, message: "请选择商品类别", trigger: "change" },
        ],
        price: [{ required: true, message: "请输入价格", trigger: "change" }],
        // number: [{ required: true, message: "请输入尺码", trigger: "change" }],
        // stock: [{ required: true, message: "请输入库存", trigger: "change" }],
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
      this.isShow = newVal;
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
          if(this.shelfData.domains.length ==0){
            this.$message({
              message:'请至少新增一个尺码和库存',type:'warning'
            })
          }else{
          this.cancleClick();

          }

        }
      });
    },
    // 提交客户档案信息（添加）
    createData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
        }
      });
    },

    // 提交客户档案信息（编辑）
    updateData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
        }
      });
    },
    addFormItem() {
      this.shelfData.domains.push({
        number: "",
        stock: "",
        key: Date.now(),
      });
    },
  },
};
</script>

<style>
</style>
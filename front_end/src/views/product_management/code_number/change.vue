<template>
  <div class="change-data">
    <el-dialog
      :title="dialogStatus == 'create' ? '添加产品信息' : '编辑产品信息'"
      :visible.sync="isShow"
      center
      width="60%"
      @close="cancleClick"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="productData"
        label-position="left"
        label-width="100px"
        class="dialog-form"
      >
        <el-form-item label="商品名称:" prop="product_name">
          <el-input v-model="productData.product_name" style="width: 100%" />
        </el-form-item>
        <el-form-item label="商品类别:" prop="type">
          <el-input v-model="productData.type" style="width: 100%" />
        </el-form-item>
        <el-form-item label="价格:" prop="price">
          <el-input
            type="number"
            oninput="if(value <0)value=0"
            v-model="productData.price"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="图片" prop="img">
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:7001/file"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-row
          v-for="(domain, index) in productData.product_details"
          :key="index"
        >
          <el-form-item
            label="尺码"
            :prop="'product_details.' + index + '.size'"
            :rules="{
              required: true,
              message: '尺码不能为空',
              trigger: 'blur',
            }"
          >
            <el-input
              type="number"
              oninput="if(value <0)value=0"
              v-model="domain.size"
              style="width: 90%"
            ></el-input>
            <el-button @click.prevent="removeDomain(domain)">删除</el-button>
          </el-form-item>
          <el-form-item
            label="库存"
            :prop="'product_details.' + index + '.stock'"
            :rules="{
              required: true,
              message: '库存不能为空',
              trigger: 'blur',
            }"
          >
            <el-input
              type="number"
              oninput="if(value <0)value=0"
              v-model="domain.stock"
              style="width: 90%"
            ></el-input>
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
import { productCreate, productUpdate } from "@/api/product";
export default {
  data() {
    return {
      productData: {
        product_details: [],
      },
      edit: {},
      imageUrl: "",
      isShow: this.dialogForm,
      rules: {
        product_name: [
          { required: true, message: "请填写商品名称", trigger: "change" },
        ],
        type: [
          { required: true, message: "请选择商品类别", trigger: "change" },
        ],
        img: [{ required: true, message: "请上传商品图片", trigger: "change" }],
        price: [{ required: true, message: "请输入价格", trigger: "change" }],
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
      this.isShow = newVal;
    },
  },
  created() {
    if (this.dialogStatus == "update") {
      this.edit = { ...this.editData };
      this.productData = this.edit;
       this.imageUrl=this.productData.img
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
          if (this.productData.product_details.length == 0) {
            this.$message({
              message: "请至少新增一个尺码和库存",
              type: "warning",
            });
          } else {
            if (this.dialogStatus == "create") {
              this.productData.product_number = "CPM" + new Date().valueOf();
              this.createData();
            } else {
              this.updateData();
            }
          }
        }
      });
    },
    // 图片上传成功
    handleAvatarSuccess(response, file, fileList) {
      if (response.success) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.productData.img = response.data.file;
      }
    },
    // 提交产品信息（添加）
    createData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          productCreate(this.productData).then((res) => {
            if (res.success) {
              this.$message({
                type: "success",
                message: "添加成功！",
              });
              this.cancleClick();
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
    // 提交产品信息（编辑）
    updateData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          for (let i = 0; i < this.productData.product_details.length; i++) {
            delete this.productData.product_details[i].detail_id;
          }
          productUpdate(this.productData).then((res) => {
            if (res.success) {
              this.$message({
                type: "success",
                message: "修改成功！",
              });
              this.cancleClick();
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
    addFormItem() {
      this.productData.product_details.push({
        size: "",
        stock: "",
      });
    },
    removeDomain(item) {
      var index = this.productData.product_details.indexOf(item);
      if (index !== -1) {
        this.productData.product_details.splice(index, 1);
      }
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>
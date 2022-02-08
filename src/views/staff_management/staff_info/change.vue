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
        label-width="100px"
        style="margin-left: 50px"
      >
        <el-form-item label="员工名称:" prop="name">
          <el-input v-model="staffInfo.name" placeholder="请输入员工名称" />
        </el-form-item>
        <el-form-item label="性别:" prop="sex">
          <el-radio-group v-model="staffInfo.sex">
            <el-radio border label="1">男</el-radio>
            <el-radio border label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="入职时间:" prop="entry_time">
          <el-date-picker
            v-model="staffInfo.entry_time"
            type="datetime"
            style="width: 100%"
            placeholder="请选择入职时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="职务：" prop="level">
          <el-select
            v-model="staffInfo.level"
            clearable
            placeholder="请选择职务"
            style="width: 100%"
          >
            <el-option
              v-for="item in levelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话:" prop="phone">
          <el-input v-model="staffInfo.phone" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="联系地址：" prop="address">
          <el-cascader
            placeholder="请选择省市区"
            :options="addressOptions"
            v-model="staffInfo.address"
            :props="addressProps"
            style="width: 100%"
            clearable
            filterable
          ></el-cascader>
        </el-form-item>
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
        name: [
          { required: true, message: "请输入员工名称", trigger: "change" },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        level: [{ required: true, message: "请选择职务", trigger: "change" }],
        phone: [{ required: true, trigger: "change", validator: validPhone }],
        address: [
          { required: true, message: "请选择联系地址", trigger: "change" },
        ],
        entry_time: [
          { required: true, message: "请选择入职时间", trigger: "change" },
        ],
      },
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
                {
                  value: "fankui",
                  label: "反馈",
                },
                {
                  value: "xiaolv",
                  label: "效率",
                },
                {
                  value: "kekong",
                  label: "可控",
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
                {
                  value: "dingbudaohang",
                  label: "顶部导航",
                },
              ],
            },
          ],
        },
      ], //级联选择数据
      addressProps: {},
      levelOptions: [],
    };
  },
  methods: {
    // 关闭弹窗
    closeDialog() {
      this.$emit("update:dialogForm", false);
    },
    // 提交客户档案信息（添加）
    createData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.closeDialog();
        }
      });
    },
    // 提交客户档案信息（编辑）
    updateData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.closeDialog();
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

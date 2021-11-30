<template>
  <div class="app-container">
    <!-- 功能区 -->
    <div class="filter-container">
      <el-input  class="filter-item" v-model="listQuery.name" placeholder="请输入客户名称" style="width: 200px"  @keyup.enter.native="handleFilter"/>
      <el-button class="filter-item" type="primary"  icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button class="filter-item" type="primary"  icon="el-icon-plus" style="margin-left: 10px" @click="handleCreate">添加</el-button>
      <el-button class="filter-item" type="primary"  icon="el-icon-download" :loading="downloadLoading" @click="handleDownload">导出excel</el-button>
    </div>

    <!-- 表格数据 -->
    <el-table ref="multipleTable"
      style="width: 100%" v-loading="listLoading"
      :data="list" border fit  highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" />
      <el-table-column label="ID" prop="id" sortable align="center" width="80">
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户名称" align="center" width="150">
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="销售产品名称" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span class="link-type" @click="handleDetail(row)">
            {{ row.product_name }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="联系地址" align="center">
        <el-table-column  prop="province" label="省份" width="120" align="center"></el-table-column>
        <el-table-column prop="city" label="城市" width="120" align="center"></el-table-column>
        <el-table-column prop="area" label="市区" width="120" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="{ row, $index }">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleUpdate(row)">编辑</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(row, $index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"/>

    <!-- 添加、修改弹窗 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" center width="50%">
      <el-form  ref="dataForm" :rules="rules" :model="clientInfo"  label-position="left" label-width="100px" class="dialog-form">
        <el-form-item label="客户名称:" prop="name">
          <el-input v-model="clientInfo.name" placeholder="请输入客户名称"/>
        </el-form-item>
        <el-form-item label="联系电话:" prop="phone">
          <el-input v-model="clientInfo.phone" placeholder="请输入联系电话"  />
        </el-form-item>
        <el-form-item label="联系地址：" prop="province">
          <el-select v-model="clientInfo.province" placeholder="请选择省份" style="width:170px">
            <el-option label="福建" value="shanghai"></el-option>
            <el-option label="北京" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-item-city" prop="city">
         <el-select v-model="clientInfo.city" placeholder="请选择城市" style="width:170px">
            <el-option label="厦门" value="shanghai"></el-option>
            <el-option label="漳州" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-item-area" prop="area">
         <el-select v-model="clientInfo.area" placeholder="请选择区域" style="width:170px">
            <el-option label="马尾" value="shanghai"></el-option>
            <el-option label="芗城" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="销售产品：" prop="product_name">
            <el-select v-model="clientInfo.product_name" multiple clearable placeholder="请选择销售产品" style="width:510px">
              <el-option v-for="item in options"  :key="item.value" :label="item.label"  :value="item.value"></el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> 取消 </el-button>
        <el-button type="primary" @click="dialogStatus === 'create' ? createData() : updateData()">确定</el-button>
      </div>
    </el-dialog>

     <!-- 销售产品弹窗 -->
    <el-dialog title="销售产品信息" :visible.sync="dialogProductVisible" center width="50%">
      <el-table style="width: 100%" :data="productList" border fit  highlight-current-row >
      <el-table-column label="产品名称" align="center" min-width="170">
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品单价（元）" sortable align="center" min-width="170">
        <template slot-scope="{ row }">
          <span>{{ row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品净重量（克）" sortable align="center" min-width="170px">
        <template slot-scope="{ row }">
          <span>{{ row.weight }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="{ row, $index }">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleUpdate(row)">编辑</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(row, $index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, createArticle, updateArticle } from "@/api/article";
import Pagination from "@/components/Pagination";
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
  name: "CustomerProfileInfo",
  components: { Pagination }, 
  data() {
    return {
      list: [
        {
          id: 1,
          name: "张三",
          phone: "13110653931",
          province:"福建省",
          city:"福州市",
          area:"马尾区",
          product_name:[{
            name:'anta',
            price:'10',
            weight:'10'
          }]
        },
      ], 
      productList:[],
      total: 0, //表格总条数
      listLoading: true, //loading样式
      listQuery: {//请求参数
        page: 1,
        limit: 10,
        name: undefined,
      },
      clientInfo: {//新增修改弹窗-表单信息
        name: "",
        phone: "",
        province: "",
        city: "",
        area: "",
        product_name:[]
      },
       options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
      multipleSelection: [], //表格勾选数据
      dialogFormVisible: false, //添加修改弹窗
      dialogProductVisible:false, //详情弹窗
      dialogStatus: "", //区分添加或修改弹窗
      textMap: {//弹窗标题
        update: "编辑客户档案",
        create: "添加客户档案",
      },
      rules: {
        //表单验证规则
        name: [
        { required: true, message: "请输入客户名称", trigger: "change" },
        {required: true,  pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,message: '姓名不支持特殊字符',trigger: 'change'}
        ],
        phone: [{ required: true,  validator: validPhone ,trigger: "change"}],
        province: [{ required: true, message: "请选择省份", trigger: "change" }],
        city: [{ required: true, message: "请选择城市", trigger: "change" }],
        area: [{ required: true, message: "请选择区域", trigger: "change" }],
        product_name: [{ required: true, message: "请选择销售产品", trigger: "change" }]
      },
      downloadLoading: false, 
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 获取客户档案信息数据
    getList() {
      // this.listLoading = true;
      // fetchList(this.listQuery).then((response) => {
      //   this.list = response.data.items;
      //   this.total = response.data.total;
      //   // 模拟请求的时间
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      // });
    },
    // 查询数据
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    // 获取选中数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 查看详情
    handleDetail(row) {
      this.productList = row.product_name;
      this.dialogProductVisible = true;
      console.log(this.productList);
      
    },
    // 清空添加弹窗数据
    resetTemp() {
      this.clientInfo = {
        name: "",
        phone: "",
        address: "",
        produce_name: "",
      };
    },
    // 打开添加弹窗
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
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
    handleUpdate(row) {
      this.clientInfo = Object.assign({}, row); // copy obj
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
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
    // 删除客户档案信息
    handleDelete(row, index) {
      this.$confirm(`是否继续删除客户名称为【${row.name}】的信息?`, "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.list.splice(index, 1);
      });
    },
    // 导出EXCEL表格
    handleDownload() {
      if (this.multipleSelection.length) {
        this.downloadLoading = true;
        import("@/vendor/Export2Excel").then((excel) => {
          const tHeader = ["Id", "Title", "Author", "Readings", "Date"];
          const filterVal = [
            "id",
            "title",
            "author",
            "pageviews",
            "display_time",
          ];
          const list = this.multipleSelection;
          const data = this.formatJson(filterVal, list);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: "客户档案信息",
          });
          this.$refs.multipleTable.clearSelection();
          this.downloadLoading = false;
        });
      } else {
        this.$message({
          message: "请至少选择一条数据",
          type: "warning",
        });
      }
    },
    //数据格式转换
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    }
  },
};
</script>

<style lang="scss" scoped>
.dialog-form{
   width: 610px; 
   margin-left: 50px;
}
.form-item-city{
  margin-top: -60px;
  margin-left: 170px;
}
.form-item-area{
  margin-top: -60px;
  margin-left: 340px;
}
</style>

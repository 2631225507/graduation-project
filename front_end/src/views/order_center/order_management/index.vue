<template>
  <div class="order_management">
    <!-- 功能区 -->
    <div class="filter-container">
      <el-input
        class="filter-item"
        v-model="listQuery.order_number"
        placeholder="请输入订单编号"
        style="width: 200px"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
        >查询</el-button
      >
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        :loading="downloadLoading"
        @click="handleDownload"
        >导出excel</el-button
      >
    </div>
    <!-- 表格数据 -->
    <el-table
      v-if="tableHeight"
      :data="tableData"
      :height="tableHeight"
      :span-method="objectSpanMethod"
      border
      style="width: 100%"
      :header-cell-class-name="starQuota"
    >
      <el-table-column
        prop="order_number"
        fixed
        label="订单号"
        width="130"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="client_name"
        label="客户"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column label="下单产品" width="200" align="center">
        <template slot-scope="{ row }">
          <span class="link-type" @click="handleDetail(row)">
            {{ row.goods_name }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="联系号码" width="145" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.show">{{ scope.row.client_phone }}</span>
          <el-input
            v-else
            v-model="scope.row.client_phone"
            type="number"
            placeholder="请填写联系号码"
          />
        </template>
      </el-table-column>
      <el-table-column label="收货地址" align="center">
        <el-table-column label="省" width="120" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.show">{{ scope.row.province }}</span>
            <el-select
              v-else
              v-model="scope.row.province_id"
              clearable
              placeholder="请选择"
              style="width: 100%"
              @change="
                (val) => {
                  changeProvice(val, scope.row);
                }
              "
            >
              <el-option
                v-for="item in provinceOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="市" width="120" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.show">{{ scope.row.city }}</span>
            <el-select
              v-else
              v-model="scope.row.city_id"
              clearable
              placeholder="请选择"
              style="width: 100%"
              :disabled="isSelectCity"
              @change="
                (val) => {
                  changeCity(val, scope.row);
                }
              "
            >
              <el-option
                v-for="item in cityOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select> </template
        ></el-table-column>
        <el-table-column label="区" width="120" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.show">{{ scope.row.area }}</span>
            <el-select
              v-else
              v-model="scope.row.area_id"
              clearable
              placeholder="请选择"
              style="width: 100%"
              :disabled="isSelectArea"
              @change="
                (val) => {
                  changeArea(val, scope.row);
                }
              "
            >
              <el-option
                v-for="item in areaOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select> </template
        ></el-table-column>
      </el-table-column>
      <el-table-column label="详细地址" width="160" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.show">{{ scope.row.detail_address }}</span>
          <el-input
            v-else
            v-model="scope.row.detail_address"
            placeholder="请填写详细地址"
          />
        </template>
      </el-table-column>
      <el-table-column label="负责人" width="120" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.show">{{ scope.row.operator }}</span>
          <el-select
            v-else
            v-model="scope.row.operator_id"
            clearable
            placeholder="请选择"
            style="width: 100%"
            @change="
              (val) => {
                operatorChange(val, scope.row);
              }
            "
          >
            <el-option
              v-for="item in operatorOptions"
              :key="item.staff_id"
              :label="item.staff_name"
              :value="item.staff_id"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column label="下单时间" width="100" align="center">
        <template slot-scope="{ row }">
          {{ row.created_at.replace(/T/g, " ").replace(/\.[\d]{3}Z/, "") }}
        </template>
      </el-table-column>
      <el-table-column label="发货时间" width="120" align="center">
        <template slot-scope="{ row }">
          <span v-if="row.delivery_time">{{
            row.delivery_time.replace(/T/g, " ").replace(/\.[\d]{3}Z/, "")
          }}</span>
          <span v-else>{{ row.delivery_time }}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="188" align="center">
        <template slot-scope="{ row, $index }">
          <div v-if="row.is_into == 1">该订单已入库,无法操作</div>
          <div v-else>
            <div v-if="row.show">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
                @click="handleUpadate(row, $index)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="handleDelete(row, $index)"
                >删除</el-button
              >
            </div>
            <div v-else>
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-circle-check"
                @click="handleSave(row, $index)"
                >保存</el-button
              >
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-close"
                @click="handleCancle(row, $index)"
                >取消</el-button
              >
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 详情 -->
    <detail-info
      v-if="dialogVisible"
      :list="list"
      :dialogVisible.sync="dialogVisible"
    ></detail-info>

    <!-- 分页 -->
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { getOrderInfo, orderUpdate, orderDelete } from "@/api/order";
import { getStaffInfo } from "@/api/staff";
import { getProvice, getCity, getArea } from "@/api/address";
import DetailInfo from "./detail";
import Pagination from "@/components/Pagination";
export default {
  name: "OrderManagement",
  components: { Pagination, DetailInfo },
  data() {
    return {
      tableData: [],
      downloadLoading: false,
      tableHeight: "",
      cancleData: {},
      total: 0, //表格总条数
      operatorOptions: [], //订单负责人下拉框
      flag: 1,
      provinceOptions: [], //省下拉框
      cityOptions: [], //市下拉框
      areaOptions: [], //区下拉框
      isSelectCity: true, //是否禁用市下拉
      isSelectArea: true, //是否禁用区下拉
      dialogVisible: false, //订单详情弹窗
      //校验信息
      suggestList: [
        {
          key: "client_phone",
          dec: "电话号码未填写",
        },
        {
          key: "province_id",
          dec: "省份未选择",
        },
        {
          key: "city_id",
          dec: "市区未选择",
        },
        {
          key: "area_id",
          dec: "区县未选择",
        },
        {
          key: "detail_address",
          dec: "详细地址未填写",
        },
        {
          key: "operator_id",
          dec: "订单负责人未选择",
        },
      ],
      listQuery: {
        //请求参数
        page: 1,
        limit: 10,
        order_number: undefined,
      },
    };
  },
  created() {
    this.getList();
    this.getProvice();
    this.getStaff();
    this.isSelectCity = false;
    this.isSelectArea = false;
  },
  mounted() {
    this.tableHeight = window.innerHeight - 188 - 55;
  },
  methods: {
    // 获取订单信息
    getList() {
      getOrderInfo(this.listQuery).then((res) => {
        this.tableData = res.data.rows;
        this.total = res.data.count;
        this.tableData.forEach((item) => {
          item.show = true;
        });
      });
    },
    //订单信息必填字段加*号
    starQuota({ row, rowIndex, column, columnIndex }) {
      if (
        columnIndex == 5 ||
        columnIndex == 4 ||
        columnIndex == 6 ||
        columnIndex == 3
      ) {
        return "star";
      }
    },
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
    // 获取订单负责人
    getStaff() {
      getStaffInfo({ page: 1, limit: 9999 }).then((res) => {
        this.operatorOptions = res.data.rows;
      });
    },
    // 合并行
    objectSpanMethod({ row, column, rowIndex }) {
      const dataProvider = this.tableData;
      const cellValue = row[column.property];
      if (cellValue) {
        // 上一条数据
        const prevRow = dataProvider[rowIndex - 1];
        // 下一条数据
        let nextRow = dataProvider[rowIndex + 1];
        // 当上一条数据等于下一条数据
        if (prevRow && prevRow[column.property] === cellValue) {
          return { rowspan: 0, colspan: 0 };
        } else {
          let rowspan = 1;
          while (nextRow && nextRow[column.property] === cellValue) {
            rowspan++;
            nextRow = dataProvider[rowspan + rowIndex];
          }
          if (rowspan > 1) {
            return { rowspan, colspan: 1 };
          }
        }
      }
    },
    // 选择省份
    changeProvice(val, row) {
      this.isSelectCity = false;
      if ((val ?? "") !== "") {
        this.getCity({ code: val });
        let obj = {};
        obj = this.provinceOptions.find((item) => {
          return item.code === val;
        });
        row.province = obj.name;
      } else {
        this.isSelectCity = true;
      }
      if ((row.city_id ?? "") !== "") {
        row.city_id = null;
        this.cityOptions = [];
      }
      if ((row.area_id ?? "") !== "") {
        this.isSelectArea = true;
        row.area_id = null;
        this.areaOptions = [];
      }
    },
    // 选择市
    changeCity(val, row) {
      this.isSelectArea = false;
      if ((val ?? "") !== "") {
        this.getArea({ code: val });
        let obj = {};
        obj = this.cityOptions.find((item) => {
          return item.code === val;
        });
        row.city = obj.name;
      } else {
        this.isSelectArea = true;
      }
      if ((row.area_id ?? "") !== "") {
        row.area_id = null;
        this.areaOptions = [];
      }
    },
    // 选择区
    changeArea(val, row) {
      let obj = {};
      obj = this.areaOptions.find((item) => {
        return item.code === val;
      });
      row.area = obj.name;
    },
    // 选择负责人
    operatorChange(val, row) {
      if ((val ?? "") !== "") {
        let obj = {};
        obj = this.operatorOptions.find((item) => {
          return item.staff_id == val;
        });
        row.operator = obj.staff_name;
      }
    },
    // 编辑
    handleUpadate(row, index) {
      if (this.flag) {
        this.cancleData = this.tableData[index]; //暂存编辑前的数据
        this.getCity({ code: row.province_id });
        this.getArea({ code: row.city_id });
        row.province_id = String(row.province_id);
        row.city_id = String(row.city_id);
        row.area_id = String(row.area_id);
        this.$nextTick(() => {
          this.$set(this.tableData, index, { ...row, show: false });
        });
        this.flag = 0;
      } else {
        this.$message({
          type: "warning",
          message: "请先保存或取消上一条编辑数据!",
          duration: 5000,
        });
      }
    },
    // 删除
    handleDelete(row, index) {
      this.$confirm(
        `是否继续删除订单号为【${row.order_number}】的信息?`,
        "删除",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        orderDelete(row).then((res) => {
          if (res.success) {
            this.$message({
              type: "success",
              message: "删除成功！",
              duration: 5000,
            });
            this.getList();
          } else {
            this.$message({
              type: "warning",
              message: "删除失败!",
              duration: 5000,
            });
          }
        });
      });
    },
    // 保存
    handleSave(row, index) {
      if (!this.checkTableInfo(row)) {
        return false;
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (reg.test(row.client_phone)) {
          this.saveData(row);
        } else {
          this.$message({
            message: "请输入正确的11位手机号码",
            type: "warning",
          });
        }
      }
    },
    saveData(row) {
      orderUpdate(row).then((res) => {
        if (res.success) {
          this.$message({
            type: "success",
            message: "修改成功！",
          });
          this.flag = 1;
          this.getList();
        } else {
          this.$message({
            type: "warning",
            message: "修改失败!",
          });
        }
      });
    },
    // 取消
    handleCancle(row, index) {
      this.flag = 1;
      this.$set(this.tableData, index, { ...row, show: true });
      if (this.cancleData == null) {
        this.tableData.splice(index, 1);
      } else {
        this.tableData[index] = this.cancleData;
      }
    },
    // 查询数据
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    // 打开产品详情弹窗
    handleDetail(row) {
      this.list = { ...row };
      this.dialogVisible = true;
    },
    // 必填字段是否为空校验
    strIsNull(strInfo) {
      if ((strInfo ?? "") !== "") {
        return false;
      } else {
        return true;
      }
    },
    // 编辑框是否全部填写校验
    checkTableInfo(row) {
      for (const i in row) {
        for (let j = 0; j < this.suggestList.length; j++) {
          if (this.suggestList[j].key === i) {
            if (this.strIsNull(row[i])) {
              this.$message({
                message: this.suggestList[j].dec,
                type: "warning",
              });
              return false;
            }
          }
        }
      }
      // 校验通过
      return true;
    },
    // 导出EXCEL表格
    handleDownload() {
      if (this.multipleSelection.length) {
        this.downloadLoading = true;
        import("@/vendor/Export2Excel").then((excel) => {
          const tHeader = [
            "订单号",
            "客户",
            "下单产品",
            "联系号码",
            "省",
            "市",
            "区",
            "详细地址",
            "负责人",
            "下单时间",
          ];
          const filterVal = [
            "order_number",
            "client_name",
            "goods_name",
            "client_phone",
            "province",
            "city",
            "area",
            "detail_address",
            "operator",
            "created_at",
          ];
          const list = this.multipleSelection;
          const data = this.formatJson(filterVal, list);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: "订单信息",
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
    },
  },
};
</script>

<style lang="scss" scoped>
.order_management {
  height: 100%;
  padding: 20px;
  ::v-deep input::-webkit-outer-spin-button,
  ::v-deep input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
  }
  ::v-deep input[type="number"] {
    -moz-appearance: textfield !important;
  }

  // *号
  ::v-deep .el-table table th.star div::before {
    content: "*";
    color: red;
  }
}
</style>



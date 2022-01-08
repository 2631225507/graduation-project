<template>
  <div class="order_management">
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="order_number"
        fixed
        label="订单号"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column prop="p_name" label="产品名称" width="200" align="center">
      </el-table-column>
      <el-table-column
        prop="c_code_number"
        label="码数"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="p_price" label="单价" width="80" align="center">
      </el-table-column>
      <el-table-column prop="p_number" label="数量" width="80" align="center">
      </el-table-column>
      <el-table-column
        prop="order_time"
        label="下单时间"
        width="120"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="delivery_time"
        label="发货时间"
        width="120"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="c_name" label="客户" width="180" align="center">
      </el-table-column>
      <el-table-column
        prop="c_phone"
        label="联系号码"
        width="145"
        align="center"
      >
      </el-table-column>
      <el-table-column label="收货地址" align="center">
        <el-table-column
          prop="province"
          label="省"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="city"
          label="市"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="area"
          label="区"
          width="80"
          align="center"
        ></el-table-column>
      </el-table-column>
      <el-table-column
        prop="detailed"
        label="详细地址"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="time" label="操作时间" width="100" align="center">
      </el-table-column>
      <el-table-column
        prop="sname"
        label="负责人"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="remark" label="备注" width="150" align="center">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100" align="center">
        <template slot-scope="{ row, $index }">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="handleDelete(row, $index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          allnumber: 3000,
          allprice: 30000,
          area: "马尾区",
          c_code_number: 35.5,
          c_name: "四创科技有限公司黄河根",
          c_p_id: 470,
          c_phone: "13500000001",
          city: "福州市",
          delivery_time: "2020-05-28 00:00:00",
          detailed: "阳光学院菜鸟驿站",
          id: 69,
          order_number: "BUGNHVCGYVDKDXBC",
          order_time: "2020-05-27",
          out_time: null,
          outbound: "0",
          p_name: "安踏霸道系列-1.27",
          p_number: 100000,
          p_price: "1110",
          province: "福建省",
          replenishment: null,
          sname: "黄河根",
          time: 1590916617000,
        },
        {
          allnumber: 3000,
          allprice: 30000,
          area: "马尾区",
          c_code_number: 5,
          c_name: "客户001",
          c_p_id: 469,
          c_phone: "13500000001",
          city: "福州市",
          delivery_time: "2020-05-28 00:00:00",
          detailed: "sss",
          id: 69,
          order_number: "BUGNHVCGYVDKDXBCC2323GWCIAAOKGZXSCTT",
          order_time: "2020-05-27",
          out_time: null,
          outbound: "0",
          p_name: "XC-8270",
          p_number: 1000,
          p_price: "10",
          province: "福建省",
          replenishment: null,
          sname: "职员01",
          time: 1590916617000,
        },
        {
          allnumber: 100,
          allprice: 2000,
          area: "罗湖区",
          c_code_number: 35,
          c_name: "客户002",
          c_p_id: 471,
          c_phone: "13500000002",
          city: "深圳市",
          delivery_time: "2020-05-31 19:03:36",
          detailed: "阳光学院",
          id: 70,
          order_number: "VPDSELPIYPXHLUIVVNNXTBSC",
          order_time: "2020-04-30",
          out_time: null,
          outbound: "0",
          p_name: "XW-XC-XY-8995",
          p_number: 100,
          p_price: "20",
          province: "广东省",
          replenishment: null,
          sname: "职员004",
          time: 1590923019000,
        },
      ],
    };
  },
  methods: {
    objectSpanMethod({ row, column, rowIndex }) {
      // console.log("row", row);
      // console.log("column", column);
      // console.log("rowIndex", rowIndex);
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
    // 删除
    handleDelete(row, index) {
      this.$confirm(`是否继续删除订单号为【${row.order_number}】的信息?`, "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.tableData.splice(index, 1);
        // this.objectSpanMethod()
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.order_management {
  height: 100%;
  padding: 20px;
}
</style>



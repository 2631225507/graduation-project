<template>
  <div class="dashboard-container">
    <el-table
  :data="tableData"
  :span-method="objectSpanMethod"
  border
  style="width: 100%; margin-top: 0">
  <el-table-column
    prop="id"
    label="ID"
    width="100px">
  </el-table-column>
  <el-table-column
    prop="name"
    label="姓名">
  </el-table-column>
  <el-table-column
        label="操作"
        align="center"
        width="200"
      >
       <template slot-scope="{ row, $index }">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="handleDelete(row, $index)"
            >删除</el-button>
             </template >
      </el-table-column>
</el-table>

  </div>
</template>

<script>

export default {
data() {
  return {
    tableData: [{
      id: '12987122',
      name: '王小虎',
    }, {
      id: '12987123',
      name: '王小虎',
    },{
      id: '12987123',
      name: '王小虎2',
    }, {
      id: '12987124',
      name: '王小虎',
    }, {
      id: '12987125',
      name: '王小虎',
    }, {
      id: '12987126',
      name: '王小虎',
    }]
  }
},
mounted() {
   let data2 = this.mergeTableRow(this.tableData,['id']);
   this.tableData = data2;
 },
methods: {
	objectSpanMethod({row, column, rowIndex, columnIndex}) {
	  const span = column['property'] + '-span';
	  if(row[span]){
	    return row[span]
	  }
	},
	/**
	 * 
	 * @param data  表格数据
	 * @param merge 需要合并的列字段名称数组
	 * @returns {*}
	 */
	mergeTableRow (data, merge) {
	  if (!merge || merge.length === 0) {
	    return data
	  }
	  merge.forEach((m) => {
	    const mList = {}
	    data = data.map((v, index) => {
	      const rowVal = v[m]
	      if (mList[rowVal] && mList[rowVal].newIndex === index) {
	        mList[rowVal]['num']++
	        mList[rowVal]['newIndex']++
	        data[mList[rowVal]['index']][m + '-span'].rowspan++
	        v[m + '-span'] = {
	          rowspan: 0,
	          colspan: 0
	        }
	      } else {
	        mList[rowVal] = { num: 1, index: index, newIndex: index + 1 }
	        v[m + '-span'] = {
	          rowspan: 1,
	          colspan: 1
	        }
	      }
	      return v
	    })
	  });
	  return data
  },
  handleDelete(row,index){
    this.tableData.splice(index, 1);
  }
}

}
</script>

<style lang="scss" scoped>

</style>

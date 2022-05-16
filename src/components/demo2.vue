<template>
  <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
    <div>
      <fieldset id="app">
        <legend class="test">Note</legend>
        <el-container>
          <el-header>Header</el-header>
          <el-main>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="date" label="日期">
              </el-table-column>
              <el-table-column prop="name" label="姓名">
              </el-table-column>
              <el-table-column prop="address" label="地址">
              </el-table-column>
            </el-table>
          </el-main>
        </el-container>
        <el-container>
          <vxe-table border :data="data">
            <vxe-column type="seq" width="60"></vxe-column>
            <vxe-column field="name" title="Name">
              <template #default="{ row }">
                <span>自定义插槽模板 {{ row.name }}</span>
              </template>
            </vxe-column>
            <vxe-column field="sex" title="Sex"></vxe-column>
            <vxe-column field="age" title="Age"></vxe-column>
          </vxe-table>
        </el-container>
      </fieldset>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>


<script>
export default {
  name: 'TreeDemo2',
  data() {
    return {
      dialogVisible: false,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      data: [],
    };
  },
  methods: {
    openDialog1() {
      this.dialogVisible = true;
    }
  }
};
</script>
<style scoped>
fieldset.test {
  font-size: 12px;
  border: #06c solid 1px;
  border-radius: 10px;
}

legend {
  /* text-align: left; */
  color: #06c;
  padding: 5px 10px;
  font-weight: 800;
  background: white;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
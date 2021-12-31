<template>
     <div class="bod">
    <div class="sjtop">
      <span class="sjtitle">业务数据采集</span>
    </div>
    <div class="sjmain">
      <div class="mainmenu">
         <el-button type="warning" icon="el-icon-upload">导出</el-button>
         <el-button type="danger" icon="el-icon-delete">删除</el-button>
                  <el-button type="primary" icon="el-icon-search"style="float:right">搜索</el-button>
         <el-input v-model="input" placeholder="关键词"style="float:right"></el-input>

      </div>

        <el-table
        stripe="ture"
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
           :header-cell-style="{background:'#f7f9ff',borderColor:'#CECECE',borderTop:'1px solid #ddd'}"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"label-class-name="DisabledSelection"> </el-table-column>
          <el-table-column label="编号" width="100">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="name" label="任务名称" width="100">
          </el-table-column>
          <el-table-column prop="address" label="业务类型" show-overflow-tooltip>
          </el-table-column>
           <el-table-column prop="address" label="开始时间" show-overflow-tooltip>
          </el-table-column>
           <el-table-column prop="address" label="结束时间" show-overflow-tooltip>
          </el-table-column>
           <el-table-column prop="address" label="业务方向" show-overflow-tooltip>
          </el-table-column>
           <el-table-column prop="address" label="源" show-overflow-tooltip>
          </el-table-column>
           <el-table-column prop="address" label="状态" show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button @click="toggleSelection()">取消选择</el-button>
        </div>
      
    </div>
  </div>
</template>

<script>
export default {
     data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        }],   
         multipleSelection: [] 
    }
  },
}
</script>

<style scoped>

.sjtitle {
  font-size: 27px;
  line-height: 80px;
  margin-left: 24px;
}
.sjtop {
  height: 80px;
  width: 100%;
  border-bottom: 1px solid #ddd;
}
.sjmain {
  padding: 20px;
}
.mainmenu {
   margin-bottom: 20px;
}
.el-button {
   width: 72px;
   height: 35px;
   padding: 0;
}
.el-input {

   width: 160px;
   height: 35px;
}
.el-input >>>.el-input__inner {
   height: 35px;
     background-color: #f3f3f3;
      border:none;
}
.el-input >>> input::-webkit-input-placeholder {
  color: #999;
  font-weight: bold;
  font-size: 15px;
}
.el-table >>> .DisabledSelection .cell .el-checkbox__inner {
  /* display: none;
  position: relative; */
  width: 30px;
  visibility: hidden;
}
.el-table >>> .DisabledSelection .cell:before {
  content: "全 选";
  position: absolute;
  left: 7px;
  text-decoration:underline;
  border-bottom: 5px;
}
</style>
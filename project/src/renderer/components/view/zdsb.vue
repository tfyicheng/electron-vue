<template>
  <div class="bod">
    <div class="zdtop">
      <span class="zdtitle">用户管理</span>
    </div>
    <div class="zdmain">
      <div class="mainmenu">
        <el-button type="primary" icon="el-icon-circle-plus-outline"
          >添加</el-button
        >
        <el-button type="primary" icon="el-icon-search" style="float: right"
          >搜索</el-button
        >
        <el-input
          v-model="input"
          placeholder="关键词"
          style="float: right"
        ></el-input>
      </div>

      <el-table
        ref="singleTable"
        :data="tableData"
        stripe
        :header-cell-style="{
          color: '#171717',
          background: '#f7f9ff',
          borderColor: '#CECECE',
          borderTop: '1px solid #ddd',
          height: '61px',
        }"
        :row-style="{ height: '61px' }"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <!--tooltip-effect="dark" <el-table-column label="编号" type="selection" width="55"label-class-name="DisabledSelection"> </el-table-column> -->
        <el-table-column label="编号" min-width="30%">
          <template slot-scope="scope">{{ scope.row.number }}</template>
        </el-table-column>
        <el-table-column prop="img" label="头像" min-width="30%">
          <!-- 'data:image/jpeg;base64,' +   解码 -->

          <template slot-scope="scope">
            <img width="60px" :src="scope.row.img" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="用户名" min-width="40%">
        </el-table-column>
        <el-table-column
          prop="role"
          label="所属角色"
          min-width="40%"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.role ? "普通用户" : "超级管理员" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="添加时间"
          min-width="40%"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="address" label="操作" min-width="30%">
          <template slot-scope="scope">
            <a class="cz" @click="handleClick(scope.row)">重置</a>
            <a class="bj">编辑</a>
            <a v-show="scope.row.role === 1" class="sc">删除</a>
          </template>
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
  name: "zdsb",
  data() {
    return {
      tableData: [
        {
          number: "1",
          date: "2016-05-03",
          img: require("../../assets/tx.png"),
          name: "admin",
          role: 0,
        },
        {
          number: "2",
          date: "2016-05-03",
          img: require("../../assets/tx.png"),
          name: "admin",
          role: 1,
        },
        {
          number: "3",
          date: "2016-05-03",
          img: require("../../assets/tx.png"),
          name: "admin",
          role: 1,
        },
        {
          number: "4",
          date: "2016-05-03",
          img: require("../../assets/tx.png"),
          name: "admin",
          role: 1,
        },
      ],
      multipleSelection: [],
    };
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleClick(row) {
      console.log(row);
    },
  },
};
</script>

<style scoped>
/* .bod{
      background: rgb(0, 255, 157);
      margin-top: 80px;
   } */
.zdtitle {
  font-size: 27px;
  line-height: 80px;
  margin-left: 24px;
}
.el-table__header thead .has-gutter {
  color: #000;
}
.zdtop {
  height: 80px;
  width: 100%;
  border-bottom: 1px solid #ddd;
}
.zdmain {
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
.el-input >>> .el-input__inner {
  height: 35px;
  background-color: #f3f3f3;
  border: none;
}
.el-input >>> input::-webkit-input-placeholder {
  color: #999;
  font-weight: bold;
  font-size: 15px;
}
.cz {
  color: #ffaa64;
}
.bj {
  color: #4da0ff;
}
.sc {
  color: #ff6464;
}
.cell a {
  margin-right: 8px;
  text-decoration: underline;
}
.cell a:hover {
  cursor: pointer;
}
.cell img {
  padding-top: 6px;
  width: 42px;
  height: 42px;
}
.el-table >>> .el-table__cell {
  padding: 0;
}
</style>
<template>
<!-- 终端设备 -->
  <div class="bod">
    <!-- 顶部标题 -->
    <div class="zdtop">
      <span class="zdtitle">用户管理</span>
    </div>
    <!-- 主体 -->
    <div class="zdmain">
      <!-- 顶部菜单 -->
      <div class="mainmenu">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="addForm"
          >添加</el-button
        >
        <el-button type="primary" icon="el-icon-search" style="float: right" v-model="input"
          >搜索</el-button
        >
        <el-input
          v-model="input"
          placeholder="关键词"
          style="float: right"
        ></el-input>
      </div>
      <!-- 表格内容 -->
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
      <!-- 底部按钮 -->
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
      <!-- 添加信息弹窗 -->
      <el-dialog
      v-dialogDrag
        title="用户信息"
        :visible.sync="dialogFormVisible"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
      >
        <el-form :model="form">
          <el-form-item label="头像" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"placeholder="选择文件"></el-input>
          </el-form-item>
           <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="所属角色" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="超级管理员" value="shanghai"></el-option>
              <el-option label="普通用户" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button  icon="iconfont icon-quxiao" @click="dialogFormVisible = false">取消</el-button>
          <el-button  icon="iconfont icon-queren"  type="primary" @click="dialogFormVisible = false"
            >确认</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// 导入拖拽事件
import '../../../common/drag'
export default {
  name: "ZDSB",
  data() {
    return {
      input:"",
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
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
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
    addForm() {
      this.dialogFormVisible = true;
      const dragDom = document.querySelector('.el-dialog')
      // dragDom.style.left = 120+ dragDom.offsetParent.clientWidth/2+"px"
      dragDom.style.left =" 120px"
      console.log( dragDom.style.left)
    }
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

/* 对话框 */
.el-dialog__wrapper >>>.el-dialog {
  width: 440px;
  height: 340px;
   /* left: 15vw; */
   left: 40%;
   top: 20vh; 
  margin: 0 !important;
}
.el-dialog__wrapper >>> .el-dialog__body {
  padding: 10px;
}
.el-dialog__wrapper >>>.el-dialog__header { 
  padding: 10px 20px 20px;
}
.el-dialog__wrapper >>> .el-dialog__title {
  color:#000;
  font-weight: bold;
}
.el-dialog__wrapper >>> .el-dialog__title::before {
  content: "\00a0 ";
  border-left: 5px solid #4da0ff;
}
.el-dialog__wrapper >>> .el-dialog__headerbtn .el-dialog__close {
  color:#000;
  font-size: 25px;
  line-height: 2px;
}
/* 对话框表单 */
.el-form {
  /* padding-left: 20px; */
  width:360px;
  margin:0 auto;
}
.el-dialog__body .el-form .el-form-item {
  margin-bottom: 15px;
}
.el-form >>> .el-form-item__content .el-input {
  height: 35px;
  width: 240px;
}
.el-form >>> .el-form-item__content {
   line-height: 35px;
}
.el-form >>> .el-form-item__label {
  background-color: #86BDFF;
  color:#fff;
  height: 35px;
  line-height: 35px;
  text-align: center;
  padding:0;
}
.el-form >>> .el-form-item__label::before {
  content: "*";
  color:red;
}
.el-form >>>.el-input__inner {
  background-color: #f3f3f3;
  border:none;
  height: 35px;
}
.el-form >>>.el-input__inner::-webkit-input-placeholder {
  /* color: #000!important; */
  color: #999;
  font-weight: bold;
}
/* 对话框按钮 */
.el-dialog__footer {
  padding: auto;
}
.dialog-footer {
  /* width: 190px; */
  margin:0 auto;
  text-align: center;
}
.dialog-footer >>> .el-button {
  width: 82px;
  height: 35px;
  border-radius: 3px;
}
.dialog-footer .el-button--default {
  background-color: #999;
  color: #fff;
  margin-right: 10px;
}
.dialog-footer >>> i {
  padding-right: 5px;
}
/* 模态框 margin-left: 120px; */
.el-dialog__wrapper {
  z-index: 9!important;
}
.zdmain >>> .v-modal {
   z-index: 8!important;
}

</style>
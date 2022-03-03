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
        <el-button
          type="primary"
          icon="el-icon-search"
          style="float: right"
          v-model="input"
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
      <!-- <div style="margin-top: 20px">
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div> -->
      <!-- 添加信息弹窗  v-model="form.head"     -->
      <el-dialog
        v-dialogDrag
        title="用户信息"
        :visible.sync="dialogFormVisible"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
      >
        <el-form :model="form" ref="form">
          <div class="up">
            <el-form-item
              label="头像"
              :label-width="formLabelWidth"
              prop="head"
            >
              <el-input class="upload" readonly> </el-input>
            </el-form-item>

            <a class="upfile" @click="uploadFile">
              <div v-if="fileName == ''">选择文件</div>
              <div v-else v-text="fileName">选择文件</div>
              <el-upload
                style="display: none"
                :limit="1"
                ref="upload"
                :on-preview="handlePreview"
                :on-change="upChange"
                :on-success="suc"
                class="upload-demo"
                action=""
                :auto-upload="false"
              >
                <el-button size="small" type="primary" ref="upFile"></el-button>
              </el-upload>
            </a>
            <!-- :file-list="form.head"  "true"=  :before-upload="beforeUpload"  -->
          </div>
          <el-form-item
            label="活动名称"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input
              v-model="form.name"
              autocomplete="off"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="所属角色"
            :label-width="formLabelWidth"
            prop="region"
          >
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="超级管理员" value="shanghai"></el-option>
              <el-option label="普通用户" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="密码"
            :label-width="formLabelWidth"
            prop="password"
          >
            <el-input
              type="password"
              v-model="form.password"
              autocomplete="off"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button icon="iconfont icon-quxiao" @click="cancel"
            >取消</el-button
          >
          <el-button
            icon="iconfont icon-queren"
            type="primary"
            @click="submit(form)"
            >确认</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { copyFileSync } from "original-fs";
// 导入拖拽事件
import "../../../common/drag";
export default {
  name: "ZDSB",
  data() {
    return {
      input: "",
      fileName: "",
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
        head: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        password: "",
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
    // 添加用户弹框
    addForm() {
      this.dialogFormVisible = true;
      const dragDom = document.querySelector(".el-dialog");
      // dragDom.style.left = 120+ dragDom.offsetParent.clientWidth/2+"px"
      dragDom.style.left = " 120px";
      console.log(dragDom.style.left);
    },

    // 上传头像链接
    uploadFile() {
      this.$refs.upFile.$el.click();//实际点击upload组件
      // console.log(this.form.head);
    },
    //上传条件      因为跟auto-upload冲突所以要放到upchange中调用
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
        this.$refs.upload.clearFiles(); //不符合条件之后要清空上传缓存里的列表文件
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        this.$refs.upload.clearFiles();
      }
      return isJPG && isLt2M;
    },
    //上传触发事件
    upChange(file, fileList) {
      //  console.log(file)  上传的文件对象
      let _this = this;
      let event = event || window.event;
      var file = event.target.files[0]; //在event中获取文件对象
      // var file = file.raw   // 因为被element包装过，upload获取的file对象要在下一层中获取文件对象
      //判断一次条件并同时调用一次
      if (this.beforeUpload(file)) {
        //创建文件对象
        let reader = new FileReader();
        //调用api获取特殊格式的文件对象，从里面获取base64
        reader.readAsDataURL(file);
        //读取文件对象函数，完成时执行，在里面执行操作
        reader.onload = function (e) {
          //  console.log(e)    转化后的文件对象
          //   console.log(file.name)
          _this.form.head = e.target.result; //将base64结果赋值给表单
          _this.fileName = file.name; //从第一个参数中获取文件名然后赋值
        };
      }
    },

    // 提交
    submit(from) {
      console.log(this.form.head);
      console.log(this.form.name);
      this.$refs["form"].resetFields();//清空表单
      this.dialogFormVisible = false;  //关闭弹窗
      this.fileName = "";               //清空文件名
      this.$refs.upload.clearFiles();   //清空列表
    },
    // 取消提交
    cancel() {
      this.$refs.form.resetFields();
      this.dialogFormVisible = false;
      this.fileName = "";
      this.$refs.upload.clearFiles();
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

/* 对话框 */
.el-dialog__wrapper >>> .el-dialog {
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
.el-dialog__wrapper >>> .el-dialog__header {
  padding: 10px 20px 20px;
}
.el-dialog__wrapper >>> .el-dialog__title {
  color: #000;
  font-weight: bold;
}
.el-dialog__wrapper >>> .el-dialog__title::before {
  content: "\00a0 ";
  border-left: 5px solid #4da0ff;
}
.el-dialog__wrapper >>> .el-dialog__headerbtn .el-dialog__close {
  color: #000;
  font-size: 25px;
  line-height: 2px;
}
/* 对话框表单 */
.el-form {
  /* padding-left: 20px; */
  width: 360px;
  margin: 0 auto;
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
  background-color: #86bdff;
  color: #fff;
  height: 35px;
  line-height: 35px;
  text-align: center;
  padding: 0;
}
.el-form >>> .el-form-item__label::before {
  content: "*";
  color: red;
}
.el-form >>> .el-input__inner {
  background-color: #f3f3f3;
  border: none;
  height: 35px;
}
.el-form >>> .el-input__inner::-webkit-input-placeholder {
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
  margin: 0 auto;
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
  z-index: 9 !important;
}
.zdmain >>> .v-modal {
  z-index: 8 !important;
}

/* 上传按钮css修改方案二  创建新标签覆盖，用upload代替 */
.el-form .up {
  position: relative;
}
.el-form .up .upfile {
  color: #999;
  font-weight: bold;
  font-size: 15px;
  position: absolute;
  left: 135px;
  top: 9px;
  text-decoration: underline;
  /* z-index: -1; */
}
.el-form
  >>> .el-form-item__content
  .el-input
  .el-input__inner::-webkit-file-upload-button {
  /* display: none; */
  margin-top: 5px;
  opacity: 0;
}
/* 上传按钮css修改方案一  保留input类型file，修改原生按钮仅保留提示文字 */
/* .el-form >>> .el-form-item__content .el-input .el-input__inner::-webkit-file-upload-button {
  position: absolute;
  left: 0px;
  width: 0px;
  height: 0px;
  margin-top: 10px;
  background-color: #f3f3f3; */
/* overflow: hidden; */
/* line-height: 99em; */
/* border: none;
  z-index: 2;
 }  */
</style>
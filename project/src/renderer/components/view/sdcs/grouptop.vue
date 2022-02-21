<template>
 <!-- 列表搜索栏 -->
  <div class="groupbody">
    <div class="gtop">
      <el-input placeholder="搜索" prefix-icon="el-icon-search"></el-input>
      <div class="gtopp">
        <i class="el-icon-plus"></i>
      </div>
    </div>
    <!-- <div>聊天列表</div> -->
  </div>
</template>

<script>
export default {
  name: "grouptop",
};
</script>

<style scoped>
.groupbody {
  background-color: #f7f7f7;
}
.gtop {
  height: 80px;
  /* text-align: center; */
  padding: 0 20px;
  line-height: 80px;
}
.gtopp {
  display: inline-block;
  width: 25px;
}
.gtop >>> .el-input {
  width: 345px;
  height: 25px;
}
.gtop >>> .el-input__inner {
  border: none;
  background-color: #eee;
}
/* .el-icon-search::before {
    color: #000;
} */

.gtopp >>> .el-icon-plus {
  padding: 11px;
  margin: 10px;
  color: #a3a3a3;
  background-color: #eee;
}
.gtop >>> .gtopp :hover {
  background-color: rgb(223, 223, 223);
}
.el-input >>> input::-webkit-input-placeholder {
  color: #a3a3a3 ;
  font-weight: bold;
  font-size: 15px;
  padding-left: 4px;
}
 .el-input /deep/ .el-icon-search::before {
  color: #a3a3a3;
  font-size: 18px;
}
</style>

<template>
  <div class="groupbody">
    <div class="gtop">
      <el-input placeholder="搜索" prefix-icon="el-icon-search"></el-input>
      <div class="gtopp">
        <i class="el-icon-plus"></i>
      </div>
    </div>
    <div>聊天列表</div>
  </div>
</template>

<script>
export default {
  name: "group",
};
</script>

<style scoped>
.groupbody {
  background-color: #f7f7f7;
  height: 100%;
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
  background-color: #eee;
}
span.gtopp :hover {
  background-color: rgb(208, 206, 205);
}
.gtop >>> .gtopp :hover {
  background-color: rgb(184, 181, 179);
}
</style>
<style>
input::-webkit-input-placeholder {
       /* placeholder颜色  */
       color: rgb(233, 69, 69);
       /* placeholder字体大小  */
       font-size: 16px;
    }
</style>
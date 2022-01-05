<template>
  <div class="main">
    <leftbar style="position: fixed; top: 0; left: 0; z-index: 999"></leftbar>
    
    <!-- <div class="top"style="-webkit-app-region: drag;" >
      <!-- <title-main :title="$store.state.Session.selectSession"></title-main> -->
      <!-- <top></top>
    </div> 方案一：固定主体的top栏--> 

      <!-- <topmenu></topmenu> 方案二：固定主体右上角的菜单按钮，绝对定位-->

    <div class="top"style="-webkit-app-region: drag;z-index: 1" >
      <top></top>
    </div> 
    <!-- 方案三：固定主体的top栏，绝对定位透明  -->
    <router-view style="margin-left: 120px;" />
  </div>
</template>

<script>
import { remote } from "electron";
import leftbar from "./leftbar.vue";
import top from "./top.vue";
import topmenu from "./topmenu.vue";
import sdtest from "../view/sdcs/sdtest.vue";
export default {
  name: "main",
  components: { leftbar, sdtest, top,topmenu },
  methods: {},
  beforeCreate() {
    remote.getCurrentWindow().setSize(1440, 1024);
    remote.getCurrentWindow().center();
  },
  mounted() {
    this.$router.push("/sdtest");
   

  }
};
</script >

<style scoped>
.main {
  height: 100vh;
  position: relative;
  min-width: 700px;
  overflow-x: hidden;
}
.main >>> .group {
  -webkit-app-region: no-drag;
  z-index: 2
}
.top {
  position: fixed;
  margin-left: 120px;
  width: 100%;
  height: 80px;
  line-height: 80px;
  background-color: rgba(0,0,0,0);
  top: 0;
}
</style>
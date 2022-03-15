<template>
  <div class="main">
    <!-- 左侧导航栏 -->
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

    <!-- 右侧主体内容 -->
    <router-view style="margin-left: 100px;" />
  </div>
</template>

<script>
import { remote } from "electron";
const BrowserWindow = remote.BrowserWindow;
import leftbar from "./leftbar.vue";
import top from "./top.vue";
import topmenu from "./topmenu.vue";
import SDCS from "../view/SDCS/SDCS.vue";
const path = require("path");
let childWindow = null;
export default {
  name: "main",
  components: { leftbar, SDCS, top,topmenu },
  methods: {
      
  dialogCenter(){
       const childURL =
        process.env.NODE_ENV === "development"
          ? "http://localhost:9080" + "#/dialog"
          : path.join("file://", __dirname, "../renderer/components/dialog/dialogCenter.vue");
      //   // 判读是否已经存在子窗口
      if (childWindow) {
        childWindow.hide();
      } else {
        childWindow = new BrowserWindow({
          useContentSize: true,
          		// modal: true,
          height: 600,
          width: 660,
          resizable: true,
          show: true,
          frame: false,
          // titleBarStyle:'hidden-inset',
          // titleBarOverlay: true,
          parent: remote.mainWindow,
          webPreferences: {
            webSecurity: false,
          },
        });

        childWindow.loadURL(childURL);
        
 


  }
  },

  },
  beforeCreate() {
    // 调用主进程设置窗体
    // remote.getCurrentWindow().setSize(1440, 1024);
    remote.getCurrentWindow().setSize(1130, 870);//设置宽高
    
    remote.getCurrentWindow().setResizable(true);//设置是否允许改变宽高
   
    remote.getCurrentWindow().center();//窗口居中
  },
  mounted() {
  
    // 挂载之后导航到指定页面
    this.$router.push("/sdcs");
 remote.getCurrentWindow().setMinimumSize(1130, 870);//设置最小宽高

  this.dialogCenter();
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
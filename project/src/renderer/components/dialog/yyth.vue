<template>
  <div class="body body-blur">
    <!-- 背景模糊 -->
    <div class="bg">
      <img :src="img" alt="" />
    </div>
    <!-- 顶部菜单 -->
    <div class="tbtn">
      <i class="iconfont icon-zuixiaohua" @click="handleMin"></i>
      <!-- <i class="iconfont icon-zuidahuaxi"></i> -->
      <i class="iconfont icon-guanbixi" @click="close"></i>
    </div>
    <img :src="img" width="150" height="150" />
    <div class="name">{{ name }}</div>
    <div class="time">{{ time }}</div>
    <!-- 底部按钮 -->
    <div class="bbtn">
      <div class="mute">
        <i class="iconfont icon-jingyin"></i>
        <span>静音</span>
      </div>
      <div class="close" @click="close">
        <i class="iconfont icon-guaduan"></i>
        <span>挂断</span>
      </div>
    </div>
  </div>
</template>

<script>
import { remote, ipcRenderer } from "electron";
export default {
  name: "",

  props: [""],
  data() {
    return {
      name: "",
      time: "03:35",
      img: "",
    };
  },

  components: {},
  beforeCreate() {
    remote.getCurrentWebContents().closeDevTools();
    remote.getCurrentWindow().setSize(360, 600);
    // remote.getCurrentWindow().center();
    //    在挂载之前调用事件监听
    remote.ipcMain.once("yydata", (event, arg) => {
      this.name = arg.name;
      this.img = arg.img;
      console.log(arg.name);
      console.log("778");
    });
  },

  beforeMount() {},

  mounted() {},

  methods: {
    handleMin() {
      remote.getCurrentWindow().minimize();
    },
    //     handleMax() {
    //       if (this.isMax) {
    //         remote.getCurrentWindow().unmaximize();
    //         this.isMax = false;
    //       } else {
    //         remote.getCurrentWindow().maximize();
    //         this.isMax = true;
    //       }
    //     },
    close() {
      remote.getCurrentWindow().hide();
    },
  },
};
</script>
<style  scoped>
.body {
  -webkit-app-region: drag;
  /* background-color: pink; */
  width: 100%;
  height: 600px;
  -webkit-user-select: none;
  user-select: none;
}
.bg {
  width: 360px;
  height: 600px; /**宽高100%是为了图片铺满屏幕 */
  z-index: -1;
  position: absolute;
  overflow: hidden;

  -webkit-filter: blur(10px); /**图层模糊 */
  -moz-filter: blur(15px);
  -o-filter: blur(15px);
  -ms-filter: blur(15px);
  filter: blur(15px);
}
.bg img {
  /* 图片居中对齐，加上盒子的长度再位移自身一半 */
  padding-left: 360px;
  transform: translate(-50%, -50%);
  padding-top: 600px;
  /* width:200%; */
  height: 130%;
}
.tbtn {
  -webkit-app-region: no-drag;
  position: fixed;
  top: 10px;
  right: 0px;
  text-align: right;
}
.tbtn i {
  cursor: pointer;
  color: #fff;
}
.tbtn .iconfont {
  font-size: 14px;
  margin-right: 14px;
}
img {
  display: block;
  /* width: 150px; */
  margin: 0 auto;
  padding-top: 120px;
}
.name {
  color: #fff;
  margin-top: 20px;
  width: 100%;
  text-align: center;
}
.time {
  color: #fff;
  margin-top: 5px;
  width: 100%;
  text-align: center;
}
.bbtn {
  display: block;
  width: 150px;
  margin: 120px auto;
  position: relative;
}
.mute {
  -webkit-app-region: no-drag;
  display: inline-block;
  position: absolute;
  left: 1px;
  background-color: #5f5554;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
  line-height: 40px;
}

.close {
  -webkit-app-region: no-drag;
  display: inline-block;
  position: absolute;
  right: 1px;
  background-color: #ff6565;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
  line-height: 40px;
}
.bbtn i {
  margin: 0 auto;
  color: #fff;
  font-size: 20px;
  width: 20px;
  height: 20px;
}

.bbtn span {
  display: block;
  /* padding-top: 30px; */
  font-size: 12px;
  color: #fff;
  line-height: 30px;
}
</style>
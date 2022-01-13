<template>
  
    <div class="btn">
      <i class="iconfont icon-zuixiaohua" @click="handleMin"></i>
      <i class="iconfont icon-zuidahuaxi" @click="handleMax"></i>
      <i class="iconfont icon-guanbixi" @click="exit"></i>
    </div>

</template>

<script>
import { remote } from "electron";

export default {
  name: "top",
  components: {},
  data() {
    return {
      isMax: false,
      isTop: false,
    };
  },
  methods: {
    exit() {
      //remote.app.quit()
      remote.getCurrentWindow().hide();
    },
    handleMin() {
      remote.getCurrentWindow().minimize();
    },
    handleMax() {
      if (this.isMax) {
        remote.getCurrentWindow().unmaximize();
        this.isMax = false;
      } else {
        remote.getCurrentWindow().maximize();
        this.isMax = true;
      }
    },
  },
};
</script>

<style scoped>
/* body {
  -webkit-app-region: drag;
} */
.btn {
  -webkit-app-region: no-drag; 
  position: fixed;
  top: 0px;
  right: 0px;
  /* width: 100%; */
  text-align: right;
}
.btn i {
cursor: pointer;
}
.iconfont {
    /* display: inline-block; */
     /* width: 15px; 
    height: 15px;  */
  font-size: 15px;
  margin-right: 20px;
}
</style>
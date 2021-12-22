<template>
  <div class="main">
    <leftbar style="position: fixed; top: 0; left: 0; z-index: 999"></leftbar>
 
    <div class="top"style="-webkit-app-region: drag;" >
      <!-- <title-main :title="$store.state.Session.selectSession"></title-main> -->
      <top></top>
    </div>

    <router-view style="margin-left: 120px" />
  </div>
</template>

<script>
import { remote } from "electron";
import leftbar from "./leftbar.vue";
import top from "./top.vue";
import sdtest from "../view/sdcs/sdtest.vue";
export default {
  name: "main",
  components: { leftbar, sdtest, top },
  methods: {},
  beforeCreate() {
    remote.getCurrentWindow().setSize(1440, 1024);
    remote.getCurrentWindow().center();
  },
  mounted() {
    this.$router.push("/sdtest");
   

  },
  beforeDestroy() {
            remote.getCurrentWindow().setSize(300, 372)

  }
};
</script >

<style scoped>
.main {
  height: 100%;
  position: relative;
  min-width: 700px;
  overflow-x: hidden;
}
.top {
  margin-left: 120px;
  width: 100%;
  height: 80px;
  line-height: 80px;
  background-color: #f3f3f3;
  /* position: absolute; */
  top: 0;
}
</style>
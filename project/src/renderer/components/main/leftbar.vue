<template>
  <div class="bar">
    <img src="../../assets/tx.png" width="60" height="60" />
    <div style="margin-top: 20px">
      <div class="item" v-for="(m, index) in menus">
        <el-badge :value="m.value" :hidden="m.value === 0">
          <i
            :class="m.icon"
            @click="
              to(m.path);
              now = index;
            "
            :style="now === index ? 'color: rgb(77, 159, 255)' : ''"
          >
            <span>{{ m.name }}</span></i
          >
        </el-badge>
      </div>
    </div>
    <div class="option">
      <div
        class="iconfont icon-option-one"
        @click.stop="showOptions = !showOptions"
        :modal="false"
      ></div>
      <div v-if="showOptions" class="optionslist">
        <ul>
          <li>意见反馈</li>
          <li>备份与恢复</li>
          <li>设置</li>
          <li @click="logoutDialog = true">退出账号</li>
        </ul>
      </div>
    </div>
    <el-dialog
      title="退出登录"
      :visible.sync="logoutDialog"
      width="360px"
      :center="false"
      :close-on-click-modal="false"
      append-to-body
    >
      <span>确认退出登录？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="logout">确 定</el-button>
        <el-button size="mini" @click="logoutDialog = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { remote, ipcRenderer } from "electron";

export default {
  name: "leftbar",
  data() {
    return {
      now: 0,
      logoutDialog: false,
      showOptions: false,
      menus: [
        {
          icon: "iconfont icon-xinicon_huabanfuben",
          path: "zdtest",
          value: 0,
          name: "自动测试",
        },
        {
          icon: "iconfont icon-ceshi",
          path: "sdtest",
          value: 0,
          name: "手动测试",
        },
        {
          icon: "iconfont icon-dingwei",
          path: "zdsb",
          value: 0,
          name: "终端设备",
        },
        {
          icon: "iconfont icon-icon_shujucaiji",
          path: "sjcj",
          value: 0,
          name: "数据采集",
        },
      ],
    };
  },
  methods: {
    to(path) {
      if (path !== null && path !== undefined) {
        // console.log("=> /main/" + path);
        // this.$store.commit('setSelectSession', null)
        this.$router.push(path);
      }
    },
    logout() {
      ipcRenderer.send('login-window')
      this.$router.push("/");
      this.$message({ message: "请重新登录", center: true,customClass:"loginmessage" });
    },
  },
};
</script>

<style  scoped>
.bar {
  /* float: left; */
  /* display:flex; */
  /* position: absolute; */
  text-align: center;
  height: 100%;
  width: 120px;
  padding: 40px 0;
  background-color: #21345c;
}
.iconfont {
  float: left;
  margin: 0 10px;
  margin-top: 20px;
  font-size: 38px;
  color: #fff;
}
.iconfont > span {
  display: block;
  margin: 10px;

  font-size: 15px;
}
.option {
  position: fixed;
  bottom: 50px;
  left: 60px;
  transform: translateX(-50%);
}
.option > .iconfont {
  font-size: 30px;
}
.optionslist {
  position: fixed;
  left: 85px;
  bottom: 0;
  width: 136px;
  background-color: #21345c;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
li {
  color: rgba(255, 255, 255, 0.9);
  padding-left: 10px;
  text-align: left;
  font-size: 15px;
  height: 50px;
  line-height: 50px;
}

li:hover {
  background-color: #2f529c;
}

</style>
<style>
  .el-button {
    width: 80px;
  }

</style>
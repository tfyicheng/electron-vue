<template>
  <div class="cp-group" @contextmenu="menu(1,group.groupId)">
    <div>
      <div class="img">
        <el-badge
          :is-dot="group.unRead > 0 && group.type === 'group'"
          :value="group.unRead"
          :hidden="0 === group.unRead"
        >
          <img :src="group.img" width="48" height="48" />
        </el-badge>
      </div>
      <div class="content">
        <p>{{ group.name }}
              <span class="time">
                {{ getTime(group.msgs) }}
            </span>
        </p>
        <div class="ctip">
             <span v-show="group.unRead !== undefined && group.unRead > 0"
          >[{{ group.unRead }}条]</span
        >
        <span style="font-size: 12px">{{ subMsg(group.msgs) }}</span>
        </div>
       
      </div>
    </div>
  </div>
</template>

<script>
  import menu from '../../../../common/rightClick'
export default {
  name: "list",
  props: ["group", "select"],
  data() {
    return {
    };
  },
   
  components: {},

  beforeMount() {},

  mounted() {},

  methods: {
    subMsg(msg) {
      if (msg !== undefined && msg !== null && msg.length > 0) {
        return this.subStr(this.filterHtml(msg[msg.length - 1].content));
      } else {
        return "";
      }
    },
    subStr(msg) {
      if (msg !== undefined && msg !== null) {
        if (msg.length > 10) {
          return msg.substring(0, 20) + "...";
        }
        return msg;
      } else {
        return "";
      }
    },
    getTime(t) {
      if (t !== undefined && t !== null && t.length > 0) {
        let time = new Date(t[t.length - 1].time).toLocaleTimeString();
        time = time.substring(0, time.length - 3);
        return time;
      } else {
        return "";
      }
    },
    filterHtml(m) {
      if (m !== undefined && m !== null && m.length > 0) {
        let msg = m.replace(/<\/?[^>]*>/g, ""); //去除HTML Tag
        msg = msg.replace(/[|]*\n/, ""); //去除行尾空格
        msg = msg.replace(/&npsp;/gi, ""); //去掉npsp
        return msg;
      }
      return "";
    },
    // menu(e){
    //  e.preventDefault();
    // // 执行代码块
    //  console.log(e)
    //  console.log(this)
    // console.log(e.offsetX)
    // console.log(e.offsetY)
    // const menu = document.getElementsByClassName("menu")
    // console.log(menu)
    // // menu.style.left=e.offsetX
    // // menu.offsetY=e.offsetY
    // },
    menu
   
    
  },
};
</script>
<style  scoped>
.cp-group {
  height: 82px;
  font-size: small;
  position: relative;
}
.img {
    padding: 19px;
}
p {
  color: black;
  margin: 1px 0;
  font-size: 18px;
  width: 350px;
}
.time {
  position: absolute;
  font-size: smaller;
  font-size: 12px;
  right: 5px;
  color:#a3a3a3;
  /* top: 5px; */
}
.content {
  /* display: inline-block; */
  position: absolute;
  left: 80px;
  top: 20px;
}
.ctip {
    margin-top: 7px;
    font-size: 12px;
}
</style>

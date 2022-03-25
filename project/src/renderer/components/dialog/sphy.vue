<template>
 <div class="body">
     <!-- 左边选择框  @showResult="result"-->
        <div class="group">
             <grouptop></grouptop>
            <div class="gul" onselectstart="return false;">
                  <el-checkbox-group v-model="checkList" @change="handleCheckedChange">
                    
                       <el-checkbox
                        v-for="g in member"
                        :label="g.id" 
                        :style="
              checkList !== null && checkList.id === g.id
                ? 'background-color: #eee;'
                : '' "
                        >
                           <div>
                               <img :src="g.head" alt="">
                               <div class="memname">{{g.name}}</div>
                            </div>                          
                        </el-checkbox>
                    
                    </el-checkbox-group>
        
           
            </div>
            
        </div>
    <!-- 右边确定框 -->
        <div class="content">
                <p>发起视频会议</p>
                <chat></chat>
                <!-- <div v-for="a in checkList">{{a}}</div> -->
        </div>
 </div>
</template>

<script>
import { remote, ipcRenderer } from "electron";
import grouptop from "../../../common/grouptop";
 export default {
  name:'',
  components:{grouptop},
  props:[''],
  data () {
   return {
         member:[
      {
          name:"林俊杰",
          head:require("../../assets/tx.png"),
          id:1,
      }, {
          name:"周杰伦",
          head:require("../../assets/tx.png"),
          id:2,
      }, {
          name:"王力宏斯蒂芬斯蒂芬斯蒂芬是否",
          head:require("../../assets/tx.png"),
          id:4,
      },
  ],
  checkList: []
   };
  },


  beforeMount() {
       remote.getCurrentWindow().setSize(700, 480);
  },

  mounted() {},

  methods: {

       handleCheckedChange(val) {
        // this.checkedList = val ? this.member.id : [];
        this.checkedList = val ;
        console.log(val)
        // this.isIndeterminate = false;
      },
  },


 }

</script>
<style  scoped>
.body {
  /* -webkit-app-region: drag; */
  /* background-color: #f7f7f7; */
  width: 100%;
  height: 100%;
  -webkit-user-select: none;
  user-select: none;
}
/* 左侧列表 */
.group {
    display: block;
   padding: 80px 0 0;
   box-sizing: border-box;
  width: 320px;
  height: 100%;
  position: fixed;
  top: 0;
  border-right: 1px solid #ddd;
  background-color: #f7f7f7;
  overflow: hidden;
}
.group >>>.groupbody .gtop .el-input{
    width: 280px;
}
.group >>>.groupbody  #cancel{
    left: 265px;
}
.group >>> .groupbody .gtopp {
    display: none;
}
/* 列表 */
.group .gul {
  height: 100%;
  overflow-y: hidden;
}
.group .gul:hover {
  overflow-y: overlay;
}
/* 多选框 */
.group .gul .el-checkbox {
     position: relative;
    line-height: 60px;
    height: 60px;
    margin: 0;
    width: 100%;
}
.group .gul .el-checkbox img {
    position: absolute;
    left: 45px;
    width: 40px;
    margin:auto;
  height: 40px;
     top: 50%;
      transform: translateY(-50%);
}
.group .gul .el-checkbox .memname {
     position: absolute;
     left: 95px;
    width: 200px;
     top: 50%;
      transform: translateY(-50%);
    font-size: 20px;
   overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* 选中的框框 */
.group >>> .el-checkbox__input .el-checkbox__inner {
    border-radius: 50%;
    margin-left: 20px;
    width: 16px;
    height: 16px;
    border: 1px solid rgb(100, 98, 98);
}
.group >>> .el-checkbox__input.is-checked .el-checkbox__inner {
  border: 1px solid #409eff;
}
/* 右侧确认框 */
.content {
  /* display: inline-block;  */
  /* left: 440px; */
  padding-left: 320px;
  position: relative;
  height: 100%;
  /* height: 1024px; */
  background-color: #f3f3f3;
}
.content p {
    /* display: block; */
    box-sizing: border-box;
    margin: 0;
    float: left;
    -webkit-app-region: drag;
    line-height: 80px;
    font-size: 20px;
    height: 80px;
    padding-left: 30px;
    width: 100%;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  /* border-radius: 10px; */
  background: transparent;
}

::-webkit-scrollbar {
  width: 8px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 8px;
  /* -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2); */
  background: rgba(58, 57, 54, 0.5);
}
</style>

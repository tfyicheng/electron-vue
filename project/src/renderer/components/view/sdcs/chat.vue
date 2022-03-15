<template>
  <!-- 会话主体 -->
  <div class="chatmain">
    <!-- 联系人名字 -->
    <div class="chattop">{{ chat.name }}</div>
    <!-- 会话窗口 -->
    <div class="chatbody" v-if="chat !== null" @click="showBrow = false">
      <!-- 对话框 onselectstart="return false;"-->
      <div class="msg" id="msg">
        <ul>
          <!-- style="min-height: 100px" v-html="c.content"-->
          <li v-for="c in chat.msgs">
            <!-- 我的消息 -->
            <div v-if="c.isMe" class="content" style="min-height: 55px">
              <div
                v-if="c.type=='text'"
                class="metext"
                v-html="c.content"
                @contextmenu="menu(2, c)"
              ></div>
                <div
                 v-else-if="c.type=='voice'"
                class="mevoice"              
                @contextmenu="menu(2, c)"
              >
               <p>{{c.content}}</p>
              <i class="iconfont icon-saying"></i>             
              </div>
               <div
                 v-else
                class="mefile"
                @contextmenu="menu(2, c)"
              >
              <i class="el-icon-document"></i>
               <p class="mefilename">{{c.content.fileName}}</p>
               <p class="mefilesize">{{c.content.fileSize}}</p>
              </div>
              <div class="me-img"> <img               
                src="../../../assets/tx.png"
                width="50"
                height="50"
              /></div>            
            </div>
            <!-- 对方消息 -->
            <div v-else class="content">
              <div  class="other-img" ><img :src="chat.img" width="50" height="50"/></div>
              <div
                v-if="c.type=='text'"
                class="other"
                v-html="c.content"
                @contextmenu="menu(2, c)"
              ></div>
               <div
                 v-else-if="c.type=='voice'"
                class="othervoice"              
                @contextmenu="menu(2, c)"
              >             
              <i class="iconfont icon-saying"></i>   
                <p>{{c.content}}</p>          
              </div>
               <div
                 v-else
                class="otherfile"
                @contextmenu="menu(2, c)"
              >
               <i class="el-icon-document"></i>
               <p class="otherfilename">{{c.content.fileName}}</p>
               <p class="otherfilesize">{{c.content.fileSize}}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!--  拖拽条 -->
      <div id="drag" @mousedown="resize" @mouseup="resizeover"></div>
      <!-- 发送框 -->
      <div class="send" id="send">
        <!-- 表情框 -->
        <div class="brows" v-if="showBrow" @click.stop="showBrowWin">
          <div class="brow">
            <ul>
              <li
                v-for="c in brows[activeBrow].brow"
                style="padding: 2px 2px"
                v-html="c"
                @click.stop="addBrow(c)"
              ></li>
            </ul>
          </div>
          <div class="select">
            <ul>
              <li
                v-for="(c, index) in brows"
                @click="activeBrow = index"
                :style="activeBrow === index ? 'background-color:#fff' : ''"
                v-html="c.icon"
              ></li>
            </ul>
          </div>
        </div>
        <!-- 发送框菜单栏 -->
        <div class="tool-bar">
          <el-tooltip content="图片发送" placement="top">
               <i class="iconfont icon-tupian" @click.stop="showBrow = !showBrow"></i>
            </el-tooltip>
        
          <!-- 文件发送 -->
          <el-tooltip content="文件发送" placement="top">
           <i class="iconfont icon-wenjian" @click="uploadFile">
            <el-upload
              style="display: none"
              :limit="1"
              ref="upload"
              :on-preview="handlePreview"
              :on-change="upChange"
              :auto-upload="false"
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :file-list="fileList"
            >
              <el-button size="small" type="primary" ref="upFile"></el-button>
            </el-upload>
          </i>  
            </el-tooltip>
          
          <el-tooltip content="语音通话" placement="top">
               <i class="iconfont icon-dianhua yuyin" @click="dialog(1)"></i>
            </el-tooltip>
        
          <el-tooltip content="视频通话" placement="top">
              <i class="iconfont icon-shipin" @click="dialog(2)"></i>
            </el-tooltip>
         
           <el-tooltip content="语音发送" placement="top">
             <i class="iconfont icon-yuyin"></i> 
            </el-tooltip>

          <el-tooltip content="视频会议" placement="top">
             <i class="iconfont icon-shipintonghua"></i>         
            </el-tooltip>

          <el-tooltip content="IP拨号" placement="top">
            <i class="iconfont icon-IPbohao"></i>
            </el-tooltip>
          
         
        
        </div>
        <!-- 输入框 @dragenter="drag"-->
        <div
          id="input"
          ref="ip"
          contenteditable="true"
          @click="db"
          @contextmenu="menu(3)"
        >
          <!-- 文件发送 -->
          <div
            v-if="fileList.length > 0"
            class="file"
            contenteditable="false"
            @click="openFile(fileList[0].raw)"
          >
            <i class="el-icon-close" @click.stop="fileList = []"></i>
            <i class="el-icon-document"></i>
            <!--<div v-html="getFileImg(fileList[0].row)"></div>-->
            <div class="info">
              <p style="margin-bottom: 5px">{{ fileList[0].name }}</p>
              <p>{{ getSize(fileList[0].size) }}</p>
            </div>
          </div>
        </div>
        <!-- 按钮 -->
        <button class="btn" @click="send">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
import menu from "../../../../common/rightClick";
import { remote, ipcRenderer } from "electron";
const BrowserWindow = remote.BrowserWindow;
// const  { BrowserWindow }  =  require ( '@electron/remote' )
const path = require("path");
// let childWindow = null;

export default {
  name: "chat",
  props: ["chat"],
  data() {
    return {
      sendHeight: 50,
      input: "",
      fileList: [],
      showBrow: false,
      activeBrow: 0,
    };
  },
  mounted() {

    //  加上异步setTimeout，延迟获取dom的代码的执行
    this.$nextTick(() => {
      setTimeout(() => {
        // this.enter();
        this.drag();
        this.paste();
        // this.setPasteImg();
      });
    });
  },

  methods: {
    //回车键发送
    // enter() {
    //   console.log("w k s l");
    //   document.onkeydown = cdk;
    //   let inp = document.getElementById("input");
    //   var that = this;
    //   function cdk() {
    //     if (inp.focus) {
    //       if (event.keyCode == 13) {
    //         event.preventDefault();
    //         that.send();
    //       }
    //     }
    //   }
    // },
    menu,
 
    // 功能小窗
    // dialog(type) {
    //   console.log(window.location.href);
    //   console.log(type);
    //   const childURL =
    //     process.env.NODE_ENV === "development"
    //       ? "http://localhost:9080" + "#/dialog?type=" + type
    //       : path.join("file://", __dirname, "../renderer/components/dialog/dialogCenter.vue");
    //   // 判读是否已经存在子窗口
    //   if (childWindow) {
    //     childWindow.show();
    //   } else {
    //     childWindow = new BrowserWindow({
    //       useContentSize: true,
    //       height: 600,
    //       width: 360,
    //       resizable: true,
    //       show: false,
    //       frame: false,
    //       // titleBarStyle:'hidden-inset',
    //       // titleBarOverlay: true,
    //       parent: remote.mainWindow,
    //       webPreferences: {
    //         webSecurity: false,
    //       },
    //     });

    //     childWindow.loadURL(childURL);
    //     childWindow.once("ready-to-show", () => {
    //       childWindow.show();
    //     });
    //     childWindow.on("closed", () => {
    //       childWindow = null;
    //     });
    //   }
    //   // 定时发送目的是等待子窗口完成渲染才能监听数据
    //   setTimeout(() => {
    //     ipcRenderer.send("yydata", this.chat);
    //   }, 2000);
    // },
   

   
 

   dialog(type){
      console.log(type)
      //   // 判读是否已经存在子窗口
      // if (remote.childWindow) {
      //   console.log("erzi")
      //   childWindow.show();
      // } 
      // remote.getChildWindows()
  // ipcRenderer.send("yydata", this.chat,type);
    //  定时发送目的是等待子窗口完成渲染才能监听数据
      setTimeout(() => {
        ipcRenderer.send("yydata", this.chat,type);
      }, 2000);
  
   },
   
    //发送按钮
   send() {
      if (this.$refs.ip.innerHTML.length > 0) {
        let msg = {
          isMe: true,
          content: this.$refs.ip.innerHTML,
          time: new Date().getTime(),
          type:'text'
        };
        this.$refs.ip.innerHTML = "";
        this.$emit("send", msg, this.chat.groupId);
      }
      //自动滚动到底部
      setTimeout(() => {
        document.getElementById("msg").scrollTop =
          document.getElementById("msg").scrollHeight;
      }, 100);
      // 删除草稿箱    
       document.body.removeChild( document.getElementById(this.chat.groupId)); 
      // console.log(this.chat.groupId)
    },
    getSize(size) {
      if (size > 1024000) {
        return (size / 1024000).toFixed(2) + "MB";
      } else if (size > 1024) {
        return (size / 1024).toFixed(2) + "KB";
      } else {
        return size + "B";
      }
    },
    showBrowWin() {
      this.showBrow = true;
      //this.$refs.ip.focus()
    },
    foceEnd(id) {
      var range,
        doc = document.getElementById(id);
      if (doc.setSelectionRange) {
        doc.focus();
        doc.setSelectionRange(doc.value.length, doc.value.length);
      } else {
        range = doc.createTextRange();
        range.collapse(false);
        range.select();
      }
    },
    addBrow(br) {
      this.$refs.ip.focus();
      if (document.activeElement === document.getElementById("input")) {
        this.insertHtml("<span>" + br + "</span>");
      }
      this.showBrow = false;
      //this.foceEnd('input')
    },
    getFileImg(row) {},
    db() {
      let a = window.getSelection();
      //a.selectAllChildren(document.getElementById('input'))
      console.log(a);
    },
    openFile(row) {
      exec(row.path, {});
      //exec.exec(row.path, {})
    },
    handlePreview(file) {
      console.log(file);
      this.$refs.ip.innerHTML = "";
    },
    upChange(file, fileList) {
      this.fileList = fileList;
      console.log(file, fileList);
    },
    uploadFile() {
      this.$refs.upFile.$el.click();
    },
    // 拖拽条功能
    resize(ev) {
      let initY = 0,
        tph = 0,
        bth = 0;
      let tp = document.getElementById("msg");
      let bt = document.getElementById("send");
      let drag = document.getElementById("drag");
      let inp = document.getElementById("input");
      tph = tp.clientHeight;//对话框的可视高度
      bth = bt.clientHeight;//发送框的可视高度
      
      initY = (ev || event).clientY;
      document.onmousemove = function (ev2) {
        var y = (ev2 || event).clientY - initY;//鼠标y轴移动距离
        //tp.style.cursor = 's-resize'
        bt.style.height = bth - y + "px"; //发送框高度
        drag.style.bottom = bth - y + "px"; //拖拽条底部
        inp.style.height = bth -100 -65 - y + "px"; //输入框高度
        tp.style.height = "calc(100% - " + (bth - y) + "px)"; //对话框高度
        // console.log("——————————————")
        //  console.log("鼠标y轴移动距离:"+y)
        //  console.log("对话框可视高度:"+tph)
        //   console.log("发送框可视高度:"+bth)
        // console.log("**发送框高度:"+bt.style.height)
        // console.log( "**拖拽条离底部高度:"+drag.style.bottom)
        //  console.log("**输入框高度:"+inp.style.height)
        //  console.log("**对话框高度:"+tp.style.height)
        //  console.log("输入框可视高度:"+inp.clientHeight)
        //  console.log("对话框可视高度:"+tp.clientHeight)
        //  console.log("发送框可视高度:"+bt.clientHeight)
  
        if (inp.clientHeight > 590) {
          bt.style.height = "755px";
          drag.style.bottom = "755px";
          tp.style.height = "calc(100% - " + 755 + "px)";
          inp.style.height = "590px";      
          document.onmousemove = null;inp.style.height >= 650
        } else if (inp.clientHeight < 100) {
          bt.style.height = "265px";
          drag.style.bottom = "265px";
          tp.style.height = "calc(100% - " + 265 + "px)";
          inp.style.height = "100px";
           document.onmousemove = null;
        }     
      };
    },
    // 拖拽结束
    resizeover() {
      //    document.onmouseup = function () {
      //   document.onmousedown = null;
      //   document.onmousemove = null;
      // };
      document.onmousedown = null;
      document.onmousemove = null;
      console.log("drag-over")
    },

    // 粘贴去格式
    paste() {
      let inp = document.getElementById("input");
      inp.addEventListener("paste", function (event) {
        const text = event.clipboardData.getData("Text");
        document.execCommand("insertText", false, text);
        console.log("粘贴的文本是：" + text);
        event.preventDefault();
      });
    },

    // 拖拽去格式
    drag() {
      let inp = document.getElementById("input");
      inp.addEventListener(
        "dragenter",
        function (e) {
          e.preventDefault();
          e.stopPropagation();
          console.log("拖拽开始");
        },
        false
      );
      inp.addEventListener(
        "dragover",
        function (e) {
          e.preventDefault();
          e.stopPropagation();
        },
        false
      );
      inp.addEventListener(
        "dragleave",
        function (e) {
          e.preventDefault();
          e.stopPropagation();
        },
        false
      );
      //
      inp.addEventListener(
        "drop",
        function (e) {
          e.preventDefault();
          e.stopPropagation();
          // 处理拖拽的逻辑
          console.log("拖拽结束");

          // const contentEditableDiv = document.getElementById("input");
          // 获取被选中的内容，起点和终点在同一位置为光标，不同位置为选区
          const selection = window.getSelection();
          // 被选中/focus的元素
          const anchorNode = selection.anchorNode;
          if (!anchorNode) return;
          // 父节点
          const parentNode = selection.anchorNode.parentNode;
          // const range = selection.getRangeAt(0);
          const textNode = document.createTextNode(selection.toString());

          // 判断选中区域的父元素是否等于当前区域，如果是，则拖拽插入无效
          if (parentNode !== inp) {
            inp.appendChild(textNode);
          }
        },
        false
      );
    },
    // setPasteImg() {
    //   document.addEventListener("paste", function (event) {
    //     if (!document.activeElement === document.getElementById("input")) {
    //       return;
    //     }
    //     if (event.clipboardData || event.originalEvent) {
    //       var clipboardData =
    //         event.clipboardData || event.originalEvent.clipboardData;
    //       if (clipboardData.items) {
    //         var blob;
    //         for (var i = 0; i < clipboardData.items.length; i++) {
    //           if (clipboardData.items[i].type.indexOf("image") !== -1) {
    //             blob = clipboardData.items[i].getAsFile();
    //           }
    //         }
    //         var render = new FileReader();
    //         render.onload = function (evt) {
    //           //输出base64编码
    //           var base64 = evt.target.result;
    //           var img = document.createElement("img");
    //           img.setAttribute("src", base64);
    //           img.setAttribute("style", "max-width:150px; max-height:120px");
    //           document.activeElement.appendChild(img);
    //         };
    //         render.readAsDataURL(blob);
    //       }
    //     }
    //   });
    // },
    insertHtml(html) {
      var sel = window.getSelection(),
        range;
      if (sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        var el = document.createElement("span");
        el.innerHTML = html;
        var frag = document.createDocumentFragment(),
          node,
          lastNode;
        while ((node = el.firstChild)) {
          lastNode = frag.appendChild(node);
        }
        range.insertNode(frag);
        if (lastNode) {
          range = range.cloneRange();
          range.setStartAfter(lastNode);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    },
  },
  watch: {
    fileList: {
      deep: true,
      handler(val) {
        console.log(val);
      },
    },
  },
};
</script>

<style scoped>
.chatmain {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.chattop {
  /* position: fixed; */
  height: 80px;
  line-height: 80px;
  /* top: 30px; */
  /* margin-left: 50px; */
  font-size: 24px;
  font-weight: bold;
  background-color: #f3f3f3;
  width: 100%;
  padding-left: 30px;
  border-bottom: 1px solid #ddd;
}
.chatbody {
  /* padding: 0 0 334px 0 ; 方案二 */
  box-sizing: border-box ; 
  font-family: 微软雅黑, serif;
  /* height: calc(100%-81px); */
  height: 100%;
  margin-bottom: -81px;
  /* height:789px; */
  width: 100%;
  position: relative;
}
/* 消息框 */
.chatbody .msg {
  background-color: #f3f3f3;
   /* height: 100%;方案二 */
  /* height: 716px; */
  /* height: calc(100% -334px) ; */
 height: 60vh;
 /* bottom: 334px; */
  width: 100%;
  overflow: hidden;
}
.chatbody .msg:hover {
  overflow-y: overlay;
}
.chatbody .msg ul {
  margin: 0;
  padding: 0 20px;
  list-style-type: none;
  position: relative;
}
.chatbody .msg ul li {
  position: relative;
  margin: 10px 0;
  height: 100%;
  width: 100%;
  word-wrap: break-word;
  word-break: break-all;
}
.chatbody .msg ul li .content {
  display: inline-block;
  width: 100%;
}
.chatbody .msg ul li .content .other-img {
  float: left;
}
.chatbody .msg ul li .content .other {
  padding: 15px 10px 20px 10px;
  float: left;
  max-width: 50%;
  margin-left: 15px;
  background-color: #fff;
  font-size: 15px;
  border-radius: 2px;
}
/* 对话框小三角 */
.chatbody .msg ul li .content .other-img::after {
  content: "";
  position: absolute;
  left: 50px;
  top: 8px;
  width: 0;
  height: 0;
  border: 8px solid rgb(255, 255, 255);
  border-top-color: transparent;
  border-left-color: transparent;
  border-bottom-color: transparent;
}
.chatbody .msg ul li .content .me-img {
  position: absolute;
  right: 0;
}
/* 文本内容 */
.chatbody .msg ul li .content .metext {
  max-width: 50%;
  float: right;
  margin-right: 65px;
  font-size: 15px;
  border-radius: 2px;
  padding: 15px 10px 20px 10px;
  background-color: #9bccff;
}
/* 语音内容 */
.chatbody .msg ul li .content .mevoice {
  max-width: 50%;
  width: 80px;
  line-height: 55px;
  height: 55px;
  float: right;
  margin-right: 65px;
  font-size: 15px;
  border-radius: 2px;
  /* padding: 0px 0px 5px 0px; */
  background-color: #9bccff;
}
.chatbody .msg ul li .content .mevoice::after {
  content: "";
  position: absolute;
  right: 50px;
  top: 8px;
  width: 0;
  height: 0;
}
.chatbody .msg ul li .content .mevoice p{
  float: left;
  transform: translateX(-25px);
  color: #7e7e7e;
  font-size: 17px;
  margin: 0;
}
.chatbody .msg ul li .content .mevoice i{
  float: right;
  margin-right: 5px;
  font-size: 30px;
  transform: rotate(180deg);
}
/* others语音内容 */
.chatbody .msg ul li .content .othervoice {
  /* padding: 15px 10px 20px 10px; */
  float: left;
  max-width: 50%;
   width: 80px;
  line-height: 55px;
  height: 55px;
  margin-left: 15px;
  background-color: #fff;
  font-size: 15px;
  border-radius: 2px;

}
.chatbody .msg ul li .content .othervoice::after {
  content: "";
  position: absolute;
  right: 50px;
  top: 8px;
  width: 0;
  height: 0;
}
.chatbody .msg ul li .content .othervoice p{
  float: right;
  transform: translateX(35px);
  color: #7e7e7e;
  font-size: 17px;
  margin: 0;
}
.chatbody .msg ul li .content .othervoice i{
  float:left;
  margin-left: 5px;
  font-size: 30px;
  /* transform: rotate(180deg); */
}
/* me文件内容 */
.chatbody .msg ul li .content .mefile {
  max-width: 50%;
  float: right;
  margin-right: 65px;
  width: 225px;
  /* line-height: 70px; */
  height: 70px;
  font-size: 15px;
  border-radius: 2px;
  /* padding: 15px 10px 20px 10px; */
  background-color: #ffffff;
}
.chatbody .msg ul li .content .mefile::after {
  content: "";
  position: absolute;
  right: 50px;
  top: 8px;
  width: 0;
  height: 0;
  z-index: 5;
  border: 8px solid #ffffff;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
}
.chatbody .msg ul li .content .mefile i{
  float: right;
  margin: 15px;
  font-size: 40px;
}
.chatbody .msg ul li .content .mefile .mefilename{
  margin: 15px 10px 5px;
  font-size: 13px;
  font-weight: 800;
     overflow: hidden;    
    text-overflow:ellipsis;    
    white-space: nowrap;
}
.chatbody .msg ul li .content .mefile .mefilesize{
  margin: 10px;
  font-size: 12px;
  color: #7e7e7e;
}
/* other文件内容 */
.chatbody .msg ul li .content .otherfile {
  max-width: 50%;
  float: left;
  margin-left: 15px;
  width: 225px;
  /* line-height: 70px; */
  height: 70px;
  font-size: 15px;
  border-radius: 2px;
  /* padding: 15px 10px 20px 10px; */
  background-color: #ffffff;
}
.chatbody .msg ul li .content .otherfile i{
  float: right;
  margin: 15px;
  font-size: 40px;
}
.chatbody .msg ul li .content .otherfile .otherfilename{
  margin: 15px 10px 5px;
  font-size: 13px;
  font-weight: 800;
   overflow: hidden;    
    text-overflow:ellipsis;    
    white-space: nowrap;
}
.chatbody .msg ul li .content .otherfile .otherfilesize{
  margin: 10px;
  font-size: 12px;
  color: #7e7e7e;
}
/* 对话框小三角 */
.chatbody .msg ul li .content .me-img::after {
  content: "";
  position: absolute;
  right: 50px;
  top: 8px;
  width: 0;
  height: 0;
  border: 8px solid #9bccff;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
}
/*拖拽条 */
#drag {
  width: calc(100% + 64px);
  cursor: n-resize;
  border: 2px solid #e8e8e8;
  position: absolute;
  /* bottom: 334px; */
  bottom: 40vh;
}
/* 发送框 */
.chatbody .send {
  /* margin-bottom: -332px;方案二 */
  /* padding: 0 30px; */
  /* height: 330px; */
  height: 39.9vh;
  width: 100%;
  bottom: 1px;
  position: absolute;
  background-color: #f3f3f3;
}
.chatbody .send .tool-bar {
  height: 50px;
  line-height: 50px;
  background-color: #f3f3f3;
}
.chatbody .send .tool-bar i {
  cursor: pointer;
  margin-left: 15px;
  font-size: large;
  color: #666;
}
.icon-IPbohao{
  float: right;
}
.icon-shipintonghua{
  float: right;
  margin-right: 15px;
}
/* //表情包 */
.chatbody .send .brows {
  position: absolute;
  border-radius: 5px;
  box-shadow: 1px 1px 10px #7f7f7f;
  top: -290px;
  left: 10px;
  width: 400px;
  height: 290px;
  padding: 0 8px;
  background-color: #fff;
  border: 0.5px solid #bbbbbb;
}
.chatbody .send .brows .brow {
  height: 210px;
  padding-left: 5px;
  margin-top: 20px;
  overflow-y: auto;
}
.chatbody .send .brows .select ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.chatbody .send .brows .select ul li {
  cursor: pointer;
  padding: 10px 17.5px;
}
.chatbody .send .brows .select ul li:hover {
  background: #f5f5f5;
}
.chatbody .send .brows ul {
  padding: 5px 5px;
  margin: 0;
  list-style: none;
}
.chatbody .send .brows ul li {
  cursor: default;
  float: left;
  font-size: large;
}
.chatbody .send .brows ul li:hover {
  background-color: #e7e7e7;
}
/* 按钮 */
.chatbody .send .btn {
  cursor: pointer;
  bottom: 10px;
  right: 20px;
  position: fixed;
  width: 80px;
  height: 26px;
  font-size: 14px;
  font-family: 微软雅黑, serif;
  color: #606060;
  border: 1px solid #e5e5e5;
  background-color: #f5f5f5;
  outline: none;
}
.chatbody .send .btn:hover {
  color: #fff;
  background-color: hsl(211, 100%, 80%);
}
/* 输入框 */
#input {
  box-sizing: border-box;
  padding: 0px 17px 7px 17px;
  background-color: #f3f3f3;
  /* height: 160px; */
   height: 21.5vh;
  overflow-y: auto;
  width: 100%;
  word-wrap: break-word;
  word-break: break-all;
  overflow-x: hidden;
  overflow-y: hidden;
  outline: none;
}
#input:hover {
  overflow-y: overlay;
} 
/* 文件 */
.chatbody #input .file {
  cursor: default;
  height: 45px;
  padding: 5px 10px;
  width: 300px;
  position: relative;
  border: 0.5px solid #d0d0d0;
  border-radius: 3px;
}
.chatbody #input .file:hover {
  background: #d0cecd;
}
.chatbody #input .file .el-icon-close {
  position: absolute;
  top: 3px;
  right: 5px;
  cursor: pointer;
  color: #969696;
}
.chatbody #input .file .el-icon-close:hover {
  color: #6b6b6b;
}
.chatbody #input .file .el-icon-document {
  color: #969696;
  font-size: 40px;
  float: left;
}
.chatbody #input .file .info {
  margin-left: 15px;
  font-size: small;
  float: left;
}
.chatbody #input .file .info p {
  margin: 0;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  /* border-radius: 10px; */
  background: transparent;
  /* background-color: rgba(216, 16, 16, 0.1);   */
  /* opacity: 0; */
  /* display: none; */
}
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 8px;
  /* -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2); */
  background: rgba(58, 57, 54, 0.5);
  /* opacity:0.50; */
  /* filter:alpha(opacity=50); */
}
</style>
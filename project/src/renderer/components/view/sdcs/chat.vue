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
          <!-- style="min-height: 100px" -->
          <li v-for="c in chat.msgs">
            <div v-if="c.isMe" class="content" style="min-height: 55px">
              <div class="me" v-html="c.content" @contextmenu="menu(2)"></div>
              <img
                class="me-img"
                src="../../../assets/tx.png"
                width="50"
                height="50"
              />
            </div>
            <div v-else class="content">
              <img :src="chat.img" width="50" height="50" class="other-img" />
              <div
                class="other"
                v-html="c.content"
                @contextmenu="menu(2)"
              ></div>
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
          <i class="el-icon-eleme" @click.stop="showBrow = !showBrow"></i>
          <!-- 文件发送 -->
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
          <i class="iconfont icon-dianhua yuyin" @click="gn(1)"></i>
          <i class="iconfont icon-shipin" @click="gn(2)"></i>
          <i class="iconfont icon-yuyin"></i>
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
let childWindow = null;

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
      brows: [
        {
          icon: "😀",
          brow: [
            "😀",
            "😁",
            "�",
            "🤣",
            "😃",
            "😭",
            "😜",
            "😝",
            "☺",
            "😂",
            "😂",
            "😂",
            "😂",
            "😂",
            "😂",
            "😂",
            "😂",
            "😂",
            "😂",
            "😂",
            "😂",
            "😂",
          ],
        },
        {
          icon: "😭",
          brow: [
            "😀",
            "😁",
            "😂",
            "🤣",
            "😃",
            "😭",
            "😜",
            "😝",
            "☺",
            "😂",
            "😂",
            "😂",
            "😂",
          ],
        },
      ],
    };
  },
  mounted() {
    this.drag();
    this.paste();
    this.setPasteImg();
  },
  methods: {
    menu,
    // 功能小窗
    gn(type) {
      console.log(window.location.href);
      console.log(type);
      const childURL =
        process.env.NODE_ENV === "development"
          ? "http://localhost:9080" + "#/gn?type=" + type
          : path.join("file://", __dirname, "../renderer/components/gn/gn.vue");
      // 判读是否已经存在子窗口
      if (childWindow) {
        childWindow.show();
      } else {
        childWindow = new BrowserWindow({
          useContentSize: true,
          height: 600,
          width: 360,
          resizable: true,
          show: false,
          frame: false,
          // titleBarStyle:'hidden-inset',
          // titleBarOverlay: true,
          parent: remote.mainWindow,
          webPreferences: {
            webSecurity: false,
          },
        });

        childWindow.loadURL(childURL);
        childWindow.once("ready-to-show", () => {
          childWindow.show();
        });
        childWindow.on("closed", () => {
          childWindow = null;
        });
      }
      // 定时发送目的是等待子窗口完成渲染才能监听数据
      setTimeout(() => {
        ipcRenderer.send("yydata", this.chat);
      }, 2000);
    },
    //      shipin() {
    //       const childURL =
    //         process.env.NODE_ENV === "development"
    //           ? "http://localhost:9080" + "#/spth"
    //           : path.join("file://", __dirname, "../renderer/components/gn/spth.vue");
    //       // 判读是否已经存在子窗口
    //       if (childWindow) {
    //         childWindow.show();
    //       } else {
    //         childWindow = new BrowserWindow({
    //           useContentSize: true,
    //           height: 600,
    //           width: 360,
    //           resizable: true,
    //           show: false,
    //           frame:false,
    //           // titleBarStyle:'hidden-inset',
    //           // titleBarOverlay: true,
    //           parent: remote.mainWindow,
    //           webPreferences: {
    //             webSecurity: false,
    //           },
    //         });

    //         childWindow.loadURL(childURL);
    //         childWindow.once("ready-to-show", () => {
    //           childWindow.show();
    //         });
    //         childWindow.on("closed", () => {
    //           childWindow = null;
    //         });
    //       }
    // // 定时发送目的是等待子窗口完成渲染才能监听数据
    //       setTimeout(() => {
    //         ipcRenderer.send("yydata", this.chat);
    //       }, 2000);
    //     },
    send() {
      if (this.$refs.ip.innerHTML.length > 0) {
        let msg = {
          isMe: true,
          content: this.$refs.ip.innerHTML,
          time: new Date().getTime(),
        };
        this.$refs.ip.innerHTML = "";
        this.$emit("send", msg, this.chat.groupId);
      }
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
      tph = tp.offsetHeight;
      bth = bt.offsetHeight;
      //   inp.style.height=btn+120+"px";
      initY = (ev || event).clientY;
      document.onmousemove = function (ev2) {
        var y = (ev2 || event).clientY - initY;
        //tp.style.cursor = 's-resize'
        bt.style.height = bth - y + "px"; //发送框高度
        drag.style.bottom = bth - y + "px"; //拖拽条底部
        inp.style.height = bth - 65 - y + "px"; //输入框高度
        tp.style.height = "calc(100% - " + (bth - y) + "px)"; //对话框高度
        // console.log(bt.style.height)
        // console.log( drag.style.bottom)
        //  console.log(inp.style.height)
        //  console.log(tp.style.height)
        //  console.log(inp.clientHeight)
        //  console.log(tp.clientHeight)
        if (inp.clientHeight > 500) {
          bt.style.height = "565px";
          drag.style.bottom = "565px";
          tp.style.height = "calc(100% - " + 565 + "px)";
          inp.style.height = "500px";
          // document.onmousemove = null;
        } else if (tp.clientHeight > 755) {
          bt.style.height = "165px";
          drag.style.bottom = "165px";
          tp.style.height = "calc(100% - " + 165 + "px)";
          inp.style.height = "100px";
          //  document.onmousemove = null;
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
    },

    // 粘贴去格式
    paste() {
      const inp = document.getElementById("input");
      inp.addEventListener("paste", function (event) {
        const text = event.clipboardData.getData("Text");
        document.execCommand("insertText", false, text);
        console.log("粘贴的文本是：" + text);
        event.preventDefault();
      });
    },

    range() {
      // var sendEmoji = document.getElementById('input')

      // 定义最后光标对象
      var lastEditRange;

      // 编辑框点击事件
      document.getElementById("input").onclick = function () {
        // 获取选定对象
        var selection = getSelection();
        // 设置最后光标对象
        lastEditRange = selection.getRangeAt(0);
      };

      // 编辑框按键弹起事件
      document.getElementById("input").onkeyup = function () {
        // 获取选定对象
        var selection = getSelection();
        // 设置最后光标对象
        lastEditRange = selection.getRangeAt(0);
      };

      // 表情点击事件
      document.getElementById("sendEmoji").onclick = function () {
        // 获取编辑框对象
        var edit = document.getElementById("input");
        // 获取插入文本对象
        // var emojiInput = document.getElementById('emojiInput')
        let selection = window.getSelection();
        //调用selection对象的toString()方法就可以获取鼠标拖动选中的文本。
        console.log("选中的文本为：");
        console.log(selection.toString());
        var emojiInput = selection.toString();
        // 编辑框设置焦点
        edit.focus();
        // 获取选定对象
        // var selection = getSelection()
        // 判断是否有最后光标对象存在
        if (lastEditRange) {
          // 存在最后光标对象，选定对象清除所有光标并添加最后光标还原之前的状态
          selection.removeAllRanges();
          selection.addRange(lastEditRange);
        }
        // 判断选定对象范围是编辑框还是文本节点
        if (selection.anchorNode.nodeName != "#text") {
          // 如果是编辑框范围。则创建表情文本节点进行插入
          var emojiText = document.createTextNode(emojiInput.value);

          if (edit.childNodes.length > 0) {
            // 如果文本框的子元素大于0，则表示有其他元素，则按照位置插入表情节点
            for (var i = 0; i < edit.childNodes.length; i++) {
              if (i == selection.anchorOffset) {
                edit.insertBefore(emojiText, edit.childNodes[i]);
              }
            }
          } else {
            // 否则直接插入一个表情元素
            edit.appendChild(emojiText);
          }
          // 创建新的光标对象
          var range = document.createRange();
          // 光标对象的范围界定为新建的表情节点
          range.selectNodeContents(emojiText);
          // 光标位置定位在表情节点的最大长度
          range.setStart(emojiText, emojiText.length);
          // 使光标开始和光标结束重叠
          range.collapse(true);
          // 清除选定对象的所有光标对象
          selection.removeAllRanges();
          // 插入新的光标对象
          selection.addRange(range);
        } else {
          // 如果是文本节点则先获取光标对象
          var range = selection.getRangeAt(0);
          // 获取光标对象的范围界定对象，一般就是textNode对象
          var textNode = range.startContainer;
          // 获取光标位置
          var rangeStartOffset = range.startOffset;
          // 文本节点在光标位置处插入新的表情内容
          textNode.insertData(rangeStartOffset, emojiInput.value);
          // 光标移动到到原来的位置加上新内容的长度
          range.setStart(textNode, rangeStartOffset + emojiInput.value.length);
          // 光标开始和光标结束重叠
          range.collapse(true);
          // 清除选定对象的所有光标对象
          selection.removeAllRanges();
          // 插入新的光标对象
          selection.addRange(range);
        }
        // 无论如何都要记录最后光标对象
        lastEditRange = selection.getRangeAt(0);
      };
    },
    // 拖拽去格式
    drag() {
      const inp = document.getElementById("input");
      inp.addEventListener(
        "dragenter",
        function (e) {
          e.preventDefault();
          e.stopPropagation();
          console.log("drog");
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
          console.log("drog2");

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

          // var el = window.document.body;
          // window.document.body.onmouseover = function(event) {
          // el = event.target.nodeName;
          //   console.log(el)
          // }
  
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
  font-family: 微软雅黑, serif;
  /* height: calc(100%-80px); */
  height: 920px;
  width: 100%;
  position: relative;
}
/* 消息框 */
.chatbody .msg {
  background-color: #f3f3f3;
  height: 716px;
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
  margin: 20px 0;
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
.chatbody .msg ul li .content .other::before {
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

.chatbody .msg ul li .content .me {
  max-width: 50%;
  float: right;
  margin-right: 65px;
  font-size: 15px;
  border-radius: 2px;
  padding: 15px 10px 20px 10px;
  background-color: #9bccff;
}
.chatbody .msg ul li .content .me::after {
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
  bottom: 200px;
}
/* 发送框 */
.chatbody .send {
  /* padding: 0 30px; */
  height: 200px;
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
}
.chatbody .send .btn:hover {
  color: #fff;
  background-color: hsl(211, 100%, 80%);
}
/* 输入框 */
#input {
  padding: 0 5px;
  background-color: #f3f3f3;
  height: 120px;
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
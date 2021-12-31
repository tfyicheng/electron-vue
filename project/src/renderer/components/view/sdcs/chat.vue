<template>
<div>
    <div class="chattop">标题</div>
     <div class="chatbody" v-if="chat !== null" @click="showBrow = false">
      
    <div class="msg" id="msg">
      <ul>
        <li v-for="c in chat.msgs">
          <div v-if="c.isMe" style="min-height: 37px">
            <div class="me" v-html="c.content"></div>
            <img
              class="me-img"
              src="../../../assets/tx.png"
              width="33"
              height="33"
            />
          </div>
          <div v-else>
            <img :src="chat.img" width="33" height="33" />
            <div class="other" v-html="c.content"></div>
          </div>
        </li>
      </ul>
    </div>
    <!--   -->
    <div id="drag"
      @mousedown="resize"
      style="
       width: calc(100% + 64px);
        cursor: n-resize;
        border: 2px solid #fff;
        position: absolute;
        bottom: 150px;
      "
    ></div>
    <div class="send" id="send">
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
      <div class="tool-bar">
        <i class="el-icon-eleme" @click.stop="showBrow = !showBrow"></i>
        <i class="el-icon-folder-opened" @click="uploadFile">
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
        <i class="el-icon-scissors"></i>
        <i class="el-icon-chat-dot-round"></i>
        <i class="el-icon-phone-outline"></i>
      </div>
      <div id="input" ref="ip" contenteditable="true" @click="db">
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
      <button class="btn" @click="send">发送(S)</button>
    </div>
  </div>
</div>
 
</template>

<script>
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
    this.setPasteImg();
    document.onmouseup = function () {
      document.onmousedown = null;
      document.onmousemove = null;
    };
  },
  methods: {
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
    resize(ev) {
      let initY = 0,
        tph = 0,
        bth = 0;
      let tp = document.getElementById("msg");
      let bt = document.getElementById("send");
      let drag = document.getElementById("drag");
      tph = tp.offsetHeight;
      bth = bt.offsetHeight;
      initY = (ev || event).clientY;
      document.onmousemove = function (ev2) {
        //tp.style.cursor = 's-resize'
        var y = (ev2 || event).clientY - initY;
        bt.style.height = bth - y + "px";
        drag.style.bottom = bth - y + "px";
        tp.style.height = "calc(100% - " + (bth - y) + "px)";
      };
    },
    setPasteImg() {
      document.addEventListener("paste", function (event) {
        if (!document.activeElement === document.getElementById("input")) {
          return;
        }
        if (event.clipboardData || event.originalEvent) {
          var clipboardData =
            event.clipboardData || event.originalEvent.clipboardData;
          if (clipboardData.items) {
            var blob;
            for (var i = 0; i < clipboardData.items.length; i++) {
              if (clipboardData.items[i].type.indexOf("image") !== -1) {
                blob = clipboardData.items[i].getAsFile();
              }
            }
            var render = new FileReader();
            render.onload = function (evt) {
              //输出base64编码
              var base64 = evt.target.result;
              var img = document.createElement("img");
              img.setAttribute("src", base64);
              img.setAttribute("style", "max-width:150px; max-height:120px");
              document.activeElement.appendChild(img);
            };
            render.readAsDataURL(blob);
          }
        }
      });
    },
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
.chattop {
    position: fixed;
    top: 30px;
    margin-left: 50px;
}
  .chatbody {
  font-family: 微软雅黑, serif;
  height: 100%;
  width: 100%;
  /* position: relative; */
}
.chatbody .msg {
  /* border-top: 1px solid rgb(116, 21, 36); */
  /* padding: 0 30px; */
  background-color: rgb(250, 250, 250);
  /* position: absolute; */
  /* height: calc(-50%); */
  /* height: 800px; */
  width: 100%;
  overflow-y: auto;
}
#drag {
     /* width: calc(100% + 64px); */
        cursor: n-resize;
        border: 2px solid rgb(216, 32, 32);
        position: absolute;
        bottom: 150px;
}
.chatbody .send {
  padding: 0 30px;
  height: 150px;
  width: 100%;
  bottom: 0;
  position: absolute;
  background-color: #fff;
}
</style>
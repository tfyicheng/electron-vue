<template>
    <div class="body">
        <!-- list -->
        <div class="group">
            <grouptop ></grouptop>
            <div class="gul">
                     <ul  >
		    	<li v-for="g in groups" @click="selects(g)"
		    	    :style="(select !== null && g.groupId === select.groupId) ? 'background-color: #eee;':''">
		    		<list :group="g" :select="select"></list>
		    	</li>
		    </ul> 
            </div>
       
        </div>
        <div class="content">
			<chat :chat="select" @send="send"></chat>
		</div>
  
    <!-- <chat class="chat"></chat> -->
    </div>
</template>

<script>
import chat from './chat.vue'
import grouptop from './grouptop.vue'
import list from './list.vue'
export default {
  components: { grouptop, chat,list },
        data(){
            return{
                select:null,
	            haha:require('../../../assets/tx.png'),
                groups: [{
                    img: require('../../../assets/tx.png'),
                    name: '陈一发',
                    type: 'group',
                    msgs: [{
                        isMe: true,
                        content: '哈哈哈哈',
                        time: new Date().getTime()
                    }],
                    groupId: 1,
                    unRead: 20
                }, {
                    img: require('../../../assets/tx.png'),
                    name: '王力宏',
                    type: 'group',
                    msgs: [{
                        isMe: false,
                        content: '天王盖地虎,天王盖地虎天王盖地虎天王盖地虎天王盖地虎,天王盖地虎天王盖地虎',
                        time: new Date().getTime()
                    }, {
                        isMe: true,
                        content: '宝塔镇河妖',
                        time: new Date().getTime()
                    }],
                    groupId: 4,
                    unRead: 5
                }, {
                    img: require('../../../assets/tx.png'),
                    name: '王力宏',
                    type: 'group',
                    msgs: [{
                        isMe: false,
                        content: '今天是部门培训会议，你什么时候过来吖',
                        time: new Date().getTime()
                    }, {
                        isMe: true,
                        content: '我现在马上过来',
                        time: new Date().getTime()
                    },{
                        isMe: false,
                        content: '今天部门有一个非常重要的会议，领导也会出席，你什么时候过来吖',
                        time: new Date().getTime()
                    }],
                    groupId: 4,
                    unRead: 5
                }, {
                    img: require('../../../assets/tx.png'),
                    name: '王力宏',
                    type: 'group',
                    msgs: [{
                        isMe: false,
                        content: '今天是部门培训会议，你什么时候过来吖',
                        time: new Date().getTime()
                    }, {
                        isMe: true,
                        content: '我现在马上过来',
                        time: new Date().getTime()
                    },{
                        isMe: false,
                        content: '今天部门有一个非常重要的会议，领导也会出席，你什么时候过来吖',
                        time: new Date().getTime()
                    }],
                    groupId: 4,
                    unRead: 5
                }, {
                    img: require('../../../assets/tx.png'),
                    name: '王力宏',
                    type: 'group',
                    msgs: [{
                        isMe: false,
                        content: '今天是部门培训会议，你什么时候过来吖',
                        time: new Date().getTime()
                    }, {
                        isMe: true,
                        content: '我现在马上过来',
                        time: new Date().getTime()
                    },{
                        isMe: false,
                        content: '今天部门有一个非常重要的会议，领导也会出席，你什么时候过来吖',
                        time: new Date().getTime()
                    }],
                    groupId: 4,
                    unRead: 5
                }, {
                    img: require('../../../assets/tx.png'),
                    name: '王力宏',
                    type: 'group',
                    msgs: [{
                        isMe: false,
                        content: '今天是部门培训会议，你什么时候过来吖',
                        time: new Date().getTime()
                    }, {
                        isMe: true,
                        content: '我现在马上过来',
                        time: new Date().getTime()
                    },{
                        isMe: false,
                        content: '今天部门有一个非常重要的会议，领导也会出席，你什么时候过来吖',
                        time: new Date().getTime()
                    }],
                    groupId: 4,
                    unRead: 5
                }, {
                    img: require('../../../assets/tx.png'),
                    name: '王力宏',
                    type: 'group',
                    msgs: [{
                        isMe: false,
                        content: '今天是部门培训会议，你什么时候过来吖',
                        time: new Date().getTime()
                    }, {
                        isMe: true,
                        content: '我现在马上过来',
                        time: new Date().getTime()
                    },{
                        isMe: false,
                        content: '今天部门有一个非常重要的会议，领导也会出席，你什么时候过来吖',
                        time: new Date().getTime()
                    }],
                    groupId: 4,
                    unRead: 5
                }, {
                    img: require('../../../assets/tx.png'),
                    name: '王力宏',
                    type: 'group',
                    msgs: [{
                        isMe: false,
                        content: '今天是部门培训会议，你什么时候过来吖',
                        time: new Date().getTime()
                    }, {
                        isMe: true,
                        content: '我现在马上过来',
                        time: new Date().getTime()
                    },{
                        isMe: false,
                        content: '今天部门有一个非常重要的会议，领导也会出席，你什么时候过来吖',
                        time: new Date().getTime()
                    }],
                    groupId: 4,
                    unRead: 5
                }, {
                    img: require('../../../assets/tx.png'),
                    name: '王力宏',
                    type: 'group',
                    msgs: [{
                        isMe: false,
                        content: '今天是部门培训会议，你什么时候过来吖',
                        time: new Date().getTime()
                    }, {
                        isMe: true,
                        content: '我现在马上过来',
                        time: new Date().getTime()
                    },{
                        isMe: false,
                        content: '今天部门有一个非常重要的会议，领导也会出席，你什么时候过来吖',
                        time: new Date().getTime()
                    }],
                    groupId: 4,
                    unRead: 5
                }, {
                    img: require('../../../assets/tx.png'),
                    name: '王力宏',
                    type: 'group',
                    msgs: [{
                        isMe: false,
                        content: '今天是部门培训会议，你什么时候过来吖',
                        time: new Date().getTime()
                    }, {
                        isMe: true,
                        content: '我现在马上过来',
                        time: new Date().getTime()
                    },{
                        isMe: false,
                        content: '今天部门有一个非常重要的会议，领导也会出席，你什么时候过来吖',
                        time: new Date().getTime()
                    }],
                    groupId: 4,
                    unRead: 5
                }, {
                    img: require('../../../assets/tx.png'),
                    name: '周铁轮',
                    msgs: [{
                        isMe: false,
                        content: '过来开会',
                        time: new Date().getTime()
                    },{
                        isMe: true,
                        content: '<img src="https://s1.ax1x.com/2020/08/14/dC2uw9.jpg"/><p>溜了溜了</p>',
                        time: new Date().getTime()
                    }],
                    groupId: 6,
                    type: 'user',
                    unRead: 3
                }, {
                    img: require('../../../assets/tx.png'),
                    name: '周铁轮',
                    msgs: [{
                        isMe: false,
                        content: '打电话',
                        time: new Date().getTime()
                    }, {
                        isMe: true,
                        content: '你什么时候过来吖',
                        time: new Date().getTime()
                    }, ],
                    groupId: 7,
                    type: 'user',
                    unRead: 2
                },
                ]
            }
	    },
	    methods:{
            send(content, groupId) {
                this.groups.forEach(group => {
                    if (group.groupId === groupId) {
                        group.msgs.push(content)
                    }
                })
            },
            selects(s) {
                this.select = s
                this.$store.commit('setSelectSession', s)
            },
	    }
}
</script>

<style scoped>
    .body {   
             height: 100%;
    }
    .group {
        width: 440px;
        /* z-index: 999; */
        /* display: inline-block; */
        height: 100%;
        position: fixed;
        top: 0; 
        /* left: 0;  */
        left: 120px; 
        border-right: 1px solid #ddd;
           background-color: #f7f7f7;
           overflow: hidden;
    }
  .group  .gul {
      /* height: 100%; */
      /* padding-bottom: 80px; */
     /* height: 100vh; */
     /* min-height: 100vh; */
      /* height: calc(100%-80px); */
      height: 944px;
      overflow-y: hidden;;
  }
  .group .gul:hover {
      overflow-y: overlay;
  }
    .group ul {
			width: 100%;
			padding: 0;
			margin: 0 0;
			background-color: #f7f7f7;         
    }
    .group li {
				color: rgb(153, 153, 153);
				/* padding: 5px 10px; */
				list-style-type: none;
                /* width: 600px; */
    }
     .content {
          /* display: inline-block;  */
         /* left: 440px; */
         padding-left: 440px;
         position: relative;
        height: 100%;
        /* height: 1024px; */
        background-color: #f3f3f3;
    } 

/* 滚动槽 */
::-webkit-scrollbar-track {
  /* border-radius: 10px; */
   background: transparent;
}

::-webkit-scrollbar{
    width: 10px;
  
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb{
    border-radius: 8px;
    /* -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2); */
    background: rgba(58, 57, 54, 0.5);
       /* opacity:0.50; */
   /* filter:alpha(opacity=50); */
}
</style>

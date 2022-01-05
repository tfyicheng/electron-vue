<template>
    <div class="body">
        <!-- list -->
        <div class="group">
            <grouptop ></grouptop>
             <ul  >
		    	<li v-for="g in groups" @click="selects(g)"
		    	    :style="(select !== null && g.groupId === select.groupId) ? 'background-color: #eee;':''">
		    		<list :group="g" :select="select"></list>
		    	</li>
		    </ul>
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
                    name: '嗦泡大队',
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
                    name: '小芳',
                    type: 'user',
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
                    name: '婉婉',
                    msgs: [{
                        isMe: false,
                        content: '你不爱我了吗',
                        time: new Date().getTime()
                    }],
                    type: 'user',
                    groupId: 5,
                    unRead: 3
                }, {
                    img: require('../../../assets/tx.png'),
                    name: '娜娜',
                    msgs: [{
                        isMe: false,
                        content: '亲爱的，我怀孕了',
                        time: new Date().getTime()
                    },{
                        isMe: true,
                        content: '<img src="https://s1.ax1x.com/2020/08/14/dC2uw9.jpg"/><p>孩子肯定不是我的</p>',
                        time: new Date().getTime()
                    }],
                    groupId: 6,
                    type: 'user',
                    unRead: 3
                }, {
                    img: require('../../../assets/tx.png'),
                    name: '王阿姨',
                    msgs: [{
                        isMe: false,
                        content: '想通了就给阿姨打电话',
                        time: new Date().getTime()
                    }, {
                        isMe: true,
                        content: '好',
                        time: new Date().getTime()
                    }, {
                        isMe: true,
                        content: '阿姨我不想努力了😭',
                        time: new Date().getTime()
                    }],
                    groupId: 7,
                    type: 'user',
                    unRead: 2
                },{
                    img: require('../../../assets/tx.png'),
                    name: '嗦泡大队',
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
                    name: '小芳',
                    type: 'user',
                    msgs: [{
                        isMe: false,
                        content: '天王盖地虎',
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
                    name: '婉婉',
                    msgs: [{
                        isMe: false,
                        content: '你不爱我了吗',
                        time: new Date().getTime()
                    }],
                    type: 'user',
                    groupId: 5,
                    unRead: 3
                }, {
                    img: require('../../../assets/tx.png'),
                    name: '娜娜',
                    msgs: [{
                        isMe: false,
                        content: '亲爱的，我怀孕了',
                        time: new Date().getTime()
                    },{
                        isMe: true,
                        content: '<img src="https://s1.ax1x.com/2020/08/14/dC2uw9.jpg"/><p>孩子肯定不是我的</p>',
                        time: new Date().getTime()
                    }],
                    groupId: 6,
                    type: 'user',
                    unRead: 3
                }, {
                    img: require('../../../assets/tx.png'),
                    name: '王阿姨',
                    msgs: [{
                        isMe: false,
                        content: '想通了就给阿姨打电话',
                        time: new Date().getTime()
                    }, {
                        isMe: true,
                        content: '好',
                        time: new Date().getTime()
                    }, {
                        isMe: true,
                        content: '阿姨我不想努力了😭',
                        time: new Date().getTime()
                    }],
                    groupId: 7,
                    type: 'user',
                    unRead: 2
                },{
                    img: require('../../../assets/tx.png'),
                    name: '嗦泡大队',
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
                    name: '小芳',
                    type: 'user',
                    msgs: [{
                        isMe: false,
                        content: '天王盖地虎',
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
                    name: '婉婉',
                    msgs: [{
                        isMe: false,
                        content: '你不爱我了吗',
                        time: new Date().getTime()
                    }],
                    type: 'user',
                    groupId: 5,
                    unRead: 3
                }, {
                    img: require('../../../assets/tx.png'),
                    name: '娜娜',
                    msgs: [{
                        isMe: false,
                        content: '亲爱的，我怀孕了',
                        time: new Date().getTime()
                    },{
                        isMe: true,
                        content: '<img src="https://s1.ax1x.com/2020/08/14/dC2uw9.jpg"/><p>孩子肯定不是我的</p>',
                        time: new Date().getTime()
                    }],
                    groupId: 6,
                    type: 'user',
                    unRead: 3
                }, {
                    img: require('../../../assets/tx.png'),
                    name: '王阿姨',
                    msgs: [{
                        isMe: false,
                        content: '想通了就给阿姨打电话',
                        time: new Date().getTime()
                    }, {
                        isMe: true,
                        content: '好',
                        time: new Date().getTime()
                    }, {
                        isMe: true,
                        content: '阿姨我不想努力了😭',
                        time: new Date().getTime()
                    }],
                    groupId: 7,
                    type: 'user',
                    unRead: 2
                }
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
        /* float: left; */
        /* margin-top: 80px; */
         /* width: 100%; */
             height: 100%;
             /* height: 1040px; */
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
         
    }

    .group ul {
        	/* height: 944px; */
            /* height: 100vh; */
            height: 100%;
			width: 100%;
			padding: 0;
			margin: 0 0;
			background-color: #f7f7f7;
			 overflow-y: auto;/* overflow: hidden;*/
          
    }
    /* .group  ul :hover {
     overflow-y: auto;

    } */
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
         /* position: fixed; */
        height: 100%;
        /* height: 1024px; */
        background-color: #f3f3f3;
        /* width: 500px; */
        /* width: 100%; */

        /* top: 80px; */
     
        /* overflow: hidden !important; */
    } 

/* 滚动槽 */
::-webkit-scrollbar-track {
  /* border-radius: 10px; */
   background: transparent;
   /* background-color: rgba(216, 16, 16, 0.1);   */
    /* opacity: 0; */
    /* display: none; */
}

::-webkit-scrollbar{
    width: 10px;
    height: 10px; 
    /* background: rgba(250, 249, 249, 0.9); */
     /* background-color: transparent ; */
      /* opacity: 0.1; */
     /* display: none; */
  
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

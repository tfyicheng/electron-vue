const {remote} = require('electron');
const {Menu, MenuItem} = remote;
import Vue from 'vue';
export default function (type,e){
    console.log("66")
    console.log(e)
    console.log(type)
     console.log(this)
    // console.log(e.offsetX)
    // console.log(e.offsetY)
    const that = this
    // const menu2 = new Menu();
    let listmenu = [{
        label: '删除',
        click:function ()  {
            console.log('item：'+e+"__"+that)
            // that.removeItem(e)
            that.$emit('deleteIndex', e);
        }       
    },
]
    let chatmenu=[{
        label: '复制',
        role: 'copy',
    },{
        label: '剪切',
        role: 'cut',
    },
]
    let inpmenu=[{
        label: '粘贴',
        role: 'paste',
    },]
    let menu=Menu.buildFromTemplate(listmenu);
    let menu2=Menu.buildFromTemplate(chatmenu);
    let menu3=Menu.buildFromTemplate(inpmenu);
    // const menu = new Menu();
    // menu.append(new MenuItem({label:'撤销', role: 'undo' }));
//    menu.popup({window: remote.getCurrentWindow()})
    // console.log("监听1："+e)
    // window.addEventListener('contextmenu', (e) => {
    //     e.preventDefault();      
    //     console.log("监听2："+e)
    // }, false)

switch (type){
    case 1: menu.popup({window: remote.getCurrentWindow()}) ;break;
    case 2: menu2.popup({window: remote.getCurrentWindow()}) ;break;
    case 3: menu3.popup({window: remote.getCurrentWindow()}) ;break;
}


    // let demo = document.getElementsByClassName("cp-group"); 
    // demo.oncontextmenu = function(e) {
    //     e.preventDefault();
    //     // 执行代码块
    //     console.log(this)
    // }

}

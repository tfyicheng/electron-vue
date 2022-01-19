const {remote} = require('electron');
const {Menu, MenuItem} = remote;
import Vue from 'vue';
export default function (e){
    console.log("66")
    console.log(e)
     console.log(this)
    console.log(e.offsetX)
    console.log(e.offsetY)
    const that = this
    const menu2 = new Menu();
    let listmenu = [{
        label: '删除',
        click:function ()  {
            console.log('item 1 clicked'+e+that)
            // that.removeItem(e)
            that.$emit('deleteIndex', e);
        }
    }]
    let menu=Menu.buildFromTemplate(listmenu);

    // const menu = new Menu();
    // menu.append(new MenuItem({label:'撤销', role: 'undo' }));
   
    
    window.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        menu.popup({window: remote.getCurrentWindow()})
    }, false)

    // let demo = document.getElementsByClassName("cp-group"); 
    // demo.oncontextmenu = function(e) {
    //     e.preventDefault();
    //     // 执行代码块
    //     console.log(this)
    // }

}

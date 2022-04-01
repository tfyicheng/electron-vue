import { app, BrowserWindow, Tray, Menu, ipcMain,dialog } from 'electron'
import path from 'path'  
import '../renderer/store'
// require('web-frame').setZoomLevelLimits(1, 1);
// var webFrame = require('electron').webFrame; 
// webFrame.setZoomFactor(2);
     
/**    
 * Set `__static` path to static files in production    
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */   
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
 
let mainWindow, tray = null, trayIcon = null
let childWindow1 = null;
let childWindow2 = null;
const winURL = process.env.NODE_ENV === 'development' 
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`;
  const childURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:9080" + "#/drcs"
    : `file://${__dirname}/index.html#/drcs`;
    const child2URL =
      process.env.NODE_ENV === "development"
        ? "http://localhost:9080" + "#/dialog"
        : `file://${__dirname}/index.html#/dialog`;
 
function createWindow() {
  /**  
   * Initial window options
   */         
  mainWindow = new BrowserWindow({
    height: 372,
    useContentSize: true,
    width: 300,
    frame: false,
    // resizable: false,   
    show: false
  })
  
  mainWindow.loadURL(winURL)
  //屏蔽窗口菜单（-webkit-app-region:drag）
  mainWindow.hookWindowMessage(278, function (e) { 
  mainWindow.setEnabled(false)
  setTimeout(()=> {mainWindow.setEnabled(true)
  }, 100) 
 return true 
  })
mainWindow.on('ready-to-show', () => {
  mainWindow.show()
})
// mainWindow.on('closed', () => {
//   mainWindow = null
//   // mainWindow.hide() 
// }) 
/***
   * 关闭窗口前提示确认信息
   */
 mainWindow.on('close', (e) => {
  e.preventDefault()//阻止默认行为，一定要有
  dialog.showMessageBox({
    type: 'info',
    title: 'Information',
    cancelId:2,
    defaultId: 0,
    message: '确定要关闭吗？',
    buttons: ['最小化到托盘','直接退出']
  },(index)=>{
    if( index == 0) {
      e.preventDefault();		//阻止默认行为，一定要有
      mainWindow.hide();	//调用 隐藏
    } else if(index == 1) {
      mainWindow = null;
      //app.quit();	//不要用quit();试了会弹两次
      app.exit();		//exit()直接关闭客户端，不会执行quit();
    }
  })
  });

// 添加群聊界面
childWindow1 = new BrowserWindow({
  useContentSize: true,
  modal: true,
  height: 480,
  width: 700,
  resizable: false,//禁止改变主窗口大小，再设置大小就需要使用setContentSize
  show: false,
  frame: false,
  // titleBarStyle:'hidden-inset',
  // titleBarOverlay: true,remote.
  parent: mainWindow,
  webPreferences: {
    webSecurity: false,
  },
});

childWindow1.loadURL(childURL);
childWindow1.on('ready-to-show', () => {
  mainWindow.show()
})
childWindow1.on('close', (e) => {
  e.preventDefault();
childWindow1.hide()
})
//屏蔽窗口菜单 
childWindow1.hookWindowMessage(278, function (e) {
  childWindow1.setEnabled(false);
  setTimeout(() => {
    childWindow1.setEnabled(true);
  }, 100);
  return true;
});


    // 功能小窗

    //   // 判读是否已经存在子窗口 path.join("file://", __dirname, "../renderer/components/dialog/dialogCenter.vue");
    //     if (childWindow) {
    //       childWindow.hide();
    //     } else {
    //       childWindow = new BrowserWindow({
    //     
    //       });

    //       childWindow.loadURL(childURL);

    // } 

    childWindow2 = new BrowserWindow({
      useContentSize: true,
      // modal: true,
      height: 600,
      width: 660,
      resizable: false,//禁止改变主窗口大小，再设置大小就需要使用setContentSize
      show: false,
      frame: false,
      // titleBarStyle:'hidden-inset',
      // titleBarOverlay: true,remote.
      // parent: mainWindow,
      webPreferences: {
        webSecurity: false,
      },
    });

    childWindow2.loadURL(child2URL);
    childWindow2.on('ready-to-show', () => {
      mainWindow.show()
    })
   childWindow2.on('close', (e) => {
      e.preventDefault();
childWindow2.hide()
})
//屏蔽窗口菜单 
    childWindow2.hookWindowMessage(278, function (e) {
      childWindow2.setEnabled(false);
      setTimeout(() => {
        childWindow2.setEnabled(true);
      }, 100);
      return true;
    });



createTray()// 创建图标托盘 
}



app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
 
//设置任务栏任务菜单
// app.setUserTasks([
//   {
//     program: process.execPath,
//     arguments: '--new-window',
//     iconPath: process.execPath,
//     iconIndex: 0,
//     title: 'New Window',
//     description: 'Create a new window'
//   }
// ])

const createTray = () => {
  // trayIcon = path.join(__dirname, './');
  trayIcon = path.join(__static, './');
  tray = new Tray(path.join(trayIcon, 'zd.png'));
  // tray = new Tray(path.join(__static,'./zd.png'))
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '忽略', click: function () {
        trayInit()
      }
    },
    {
      label: '退出', click: function () {
        app.quit()
      }

    },
    // {
    //   label: '重新启动', click: function () {
    //     // app.relaunch({args: process.argv.slice(1).concat(['--relaunch'])})
    //     // app.exit(0)
    //     app.relaunch()
    //     app.quit()
    //   }
    // },
  ])
  tray.on('click', () => {
    mainWindow.show()
    trayInit()
  })
  tray.setToolTip('终端')
  tray.setTitle('终端')
  tray.setContextMenu(contextMenu)
  // trayFlashing()
}

let show = false, timer = null;
//图标初始化
const trayInit = () => {
  if (null !== timer) {
    clearInterval(timer)
    timer = null
    tray.setImage(path.join(trayIcon, 'zd.png'))
  }
} 
//图标闪烁
const trayFlashing = () => {
  timer = setInterval(function () {
    if (show) {
      tray.setImage(path.join(trayIcon, 'zd.png'))
    } else {
      tray.setImage(path.join(trayIcon, 'zd2.png'))
    }
    show = !show
  }, 600);
}
//通知闪烁
ipcMain.on('new-msg', (event, params) => {
  console.log('收到新消息：', params)
  trayFlashing()
  return true
}) 
//退出
ipcMain.on('login-window', () => {
  mainWindow.setContentSize(300, 372)
  mainWindow.center() 
})
//显示添加群聊
ipcMain.on('showdrcs', () => {
  childWindow1.show()
  childWindow1.center()
})



/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
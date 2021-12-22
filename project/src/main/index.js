import { app, BrowserWindow,Tray, Menu,ipcMain} from 'electron'
import path from 'path'
import '../renderer/store'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow,tray= null,trayIcon = null
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 372,
    useContentSize: true,
    width: 300,
    frame:false,
    resizable:false
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
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

const createTray = () => {
  trayIcon = path.join(__dirname, './');
  tray = new Tray(path.join(trayIcon, 'zd.png'));
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
      }
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
    console.log('收到新消息：',params)
    trayFlashing()
    return true
})
//退出
ipcMain.on('login-window', () => {
  // remote.getCurrentWindow().setContentSize(300, 372)

  mainWindow.setContentSize(300, 372)
  mainWindow.center()

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
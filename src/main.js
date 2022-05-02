const { app, BrowserWindow, Menu, MenuItem } = require('electron');
const path = require('path');
const isMac = process.platform === 'darwin'
if (require('electron-squirrel-startup')) {
  app.quit();
}
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    minHeight: 700,
    minWidth: 1030,
    width: 1030,
    height: 700,
    show: false,
  })
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  const splash = new BrowserWindow({
    width: 700,
    height: 250,
    transparent: true,
    frame: false,
    alwaysOnTop: true
  });
  splash.loadFile(path.join(__dirname, 'splash.html'));
  splash.center();
  setTimeout(function () {
    splash.close();
    mainWindow.center();
    mainWindow.show();
  }, 2000);
  //cors for hanime streams
  mainWindow.webContents.session.webRequest.onBeforeSendHeaders(
    (details, callback) => {
      const { requestHeaders } = details;
      UpsertKeyValue(requestHeaders, 'Access-Control-Allow-Origin', ['*']);
      callback({ requestHeaders });
    },
  );
  function UpsertKeyValue(obj, keyToChange, value) {
    const keyToChangeLower = keyToChange.toLowerCase();
    for (const key of Object.keys(obj)) {
      if (key.toLowerCase() === keyToChangeLower) {
        // Reassign old key
        obj[key] = value;
        // Done
        return;
      }
    }
    obj[keyToChange] = value;
  }
  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    const { responseHeaders } = details;
    UpsertKeyValue(responseHeaders, 'Access-Control-Allow-Origin', ['*']);
    UpsertKeyValue(responseHeaders, 'Access-Control-Allow-Headers', ['*']);
    callback({
      responseHeaders,
    });
  });
  mainWindow.webContents.on('new-window', function (e, url) {
    e.preventDefault();
    require('electron').shell.openExternal(url);
  });
}

const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Settings',
        click: async(menuItem, browserWindow, event) => {
          await browserWindow.loadURL(__dirname + '/settings.html');
        },
      },
      {
        label: 'About App',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://github.com/nyt92/hanimedesktop#readme')
        },
      },
      {
        label: 'Update',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://aslnk.ml/hanimedesktop/download')
        }
      },
      { type: 'separator' },
      isMac ? { role: 'close' } : { role: 'quit' },
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      { type: 'separator' },
      ...(isMac ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [
        { role: 'close' }
      ])
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click() { 
          require('electron').shell.openExternal('https://aslnk.ml/hanimedesktop');
        },
      }
    ]
  }
]
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
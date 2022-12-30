import { app, shell, ipcMain, dialog } from "electron";
import contextMenu from "electron-context-menu";
import BrowserWinHandler from "./BrowserWinHandler";
import winHandler from "./mainWindow";
contextMenu({
  menu: (actions, props, browserWindow, dictionarySuggestions) => [
    ...dictionarySuggestions,
    actions.separator(),
    actions.searchWithGoogle({
      label: "Search Google for {selection}",
      visible: props.selectionText.trim().length > 0,
      click: () => {
        shell.openExternal(
          `https://google.com/search?q=${encodeURIComponent(
            props.selectionText
          )}`
        );
      },
    }),
    actions.separator(),
    actions.learnSpelling({
      label: "Learn “{selection}”",
      visible: props.selectionText.trim().length > 0,
      click: () => {
        app.send("spellcheck-learn-word", props.selectionText);
      },
    }),
    actions.separator(),
    {
      label: "HIDE...",
      visible: true,
      click: () => {
        app.on("minimize", function (e) {
          app.hide();
        });
      },
    },
    actions.separator(),
    actions.copy({
      transform: (content) => `${content}`,
    }),
    actions.paste({
      transform: (content) => `${content}`,
    }),
    actions.cut({
      transform: (content) => `${content}`,
    }),
    actions.saveImageAs({
      transform: (content) => `${content}`,
    }),
  ],
});
// Quit when all windows are closed.
app.on("window-all-closed", function () {
	if (process.platform !== "darwin") app.quit();
});

ipcMain.on("openFileFindVLC", (e) => {
	dialog
		.showOpenDialog({
			filters: [{ name: "vlc.exe", extensions: ["exe"] }],
			properties: ["openFile"],
		})
		.then((result) => {
			console.log(result.canceled);
			console.log(result.filePaths);
			// send results.filePaths to renderer
			winHandler.onCreated(_browserWindow => {
				_browserWindow.webContents.send('filepath', result.filePaths);
			})
		})
		.catch((err) => {
			console.log(err);
		});
});

ipcMain.on("launchvlc_stream", (e, str_url, vlcpath) => {
  let spawn = require("child_process").spawn;
  let cmd = spawn("cmd.exe", ["/c", vlcpath, str_url]);
  cmd.stdout.on("data", (data) => {
    console.log(data);
  });

  console.log("yes", str_url);
});
// Load here all startup windows
require("./mainWindow");

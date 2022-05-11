import { app, shell } from 'electron'
import contextMenu from 'electron-context-menu'
contextMenu({
	menu: (actions, props, browserWindow, dictionarySuggestions) => [
		...dictionarySuggestions,
		actions.separator(),
		actions.searchWithGoogle({
			label: 'Search Google for {selection}',
			visible: props.selectionText.trim().length > 0,
			click: () => {
				shell.openExternal(`https://google.com/search?q=${encodeURIComponent(props.selectionText)}`);
			}
		}),
		actions.separator(),
		actions.learnSpelling({
			label: 'Learn “{selection}”',
			visible: props.selectionText.trim().length > 0,
			click: () => {
				app.send('spellcheck-learn-word', props.selectionText);
			}
		}),
		actions.separator(),
		{
			label: "HIDE...",
			visible: true,
			click: () => {
				app.on('minimize', function (e) {
					e.preventDefault();
					app.hide();
				})
			}
		},
		actions.separator(),
		actions.copy({
			transform: content => `${content}`
		}),
		actions.paste({
			transform: content => `${content}`
		}),
		actions.cut({
			transform: content => `${content}`
		}),
		actions.saveImageAs({
			transform: content => `${content}`
		}),
	]
});
// Quit when all windows are closed.
app.on('window-all-closed', function () {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') app.quit()
})

// Load here all startup windows
require('./mainWindow')

const { app, BrowserWindow, ipcMain } = require("electron");
const { join } = require("path");
const { autoUpdater } = require("electron-updater");
const remote = require("@electron/remote/main");
const config = require("./config");
const createAndPrintPDF = require("./print");

// remote.initialize();

let mainWindow;

const createMainWindow = async () => {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
			devTools: config.isDev,
			contextIsolation: false,
		},
		frame: false,
		icon: config.icon,
		title: config.appName,
	});

	remote.enable(mainWindow.webContents);

	await mainWindow.loadURL(
		config.isDev
			? "http://localhost:3000"
			: `file://${join(__dirname, "..", "../build/index.html")}`,
	);

	mainWindow.once("ready-to-show", () => {
		autoUpdater.checkForUpdatesAndNotify();
	});

	mainWindow.on("close", (e) => {
		if (!config.isQuiting) {
			e.preventDefault();
			mainWindow.hide();
		}
	});

	return mainWindow;
};

app.on("ready", async () => {
	mainWindow = await createMainWindow();

	ipcMain.on("print", async (event, data, code) => {
		try {
			await createAndPrintPDF(data, code);
		} catch (error) {
			console.error("Failed to print:", error);
		}
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", async () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		mainWindow = await createMainWindow();
	}
});


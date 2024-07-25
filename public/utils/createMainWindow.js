const { app, BrowserWindow, ipcMain } = require("electron");
const HID = require("node-hid");
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
			: `file://${join(__dirname, "..", "../build/index.html")}`
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

	// Continuous USB Barcode Reader detection
	const detectBarcodeScanner = () => {
		try {
			const devices = HID.devices();
			const barcodeDevice = devices.find(
				(d) => d.vendorId === 1234 && d.productId === 5678 // Replace with your barcode scanner's vendorId and productId
			);

			if (barcodeDevice) {
				const device = new HID.HID(barcodeDevice.path);

				device.on("data", (data) => {
					const barcode = data.toString("utf-8").trim();
					console.log("Barcode scanned:", barcode);
					mainWindow.webContents.send("barcode-scanned", barcode); // Send barcode data to renderer process if needed
				});

				device.on("error", (err) => {
					console.error("Barcode reader error:", err);
				});
			} else {
				console.error("Barcode scanner not found");
			}
		} catch (err) {
			console.error("Error initializing barcode reader:", err);
		}
	};

	// Check for barcode scanner every 5 seconds
	setInterval(detectBarcodeScanner, 5000 * 12);

	return mainWindow;
};

app.on("ready", async () => {
	mainWindow = await createMainWindow();

	ipcMain.on("print", async (event, data) => {
		createAndPrintPDF(data);
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

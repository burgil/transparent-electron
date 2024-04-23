const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const windowSettings = {
        width: 60,
        height: 120,
        // minWidth: 1360,
        // minHeight: 726,
        transparent: true,
        title: "Test",
        show: true,
        draggable: true,
        frame: false,
        roundedCorners:  true, // macOS, not working on Windows
        thickFrame:      false,
        alwaysOnTop: true, // Make window top-most
        backgroundColor: '#00FFFFFF', // Set background color with alpha for transparency
        // enableLargerThanScreen: true, // Allow the window to be larger than the screen
        // hasShadow: false, // Optional: Disable window shadow for a clean look
        // skipTaskbar: true, // Optional: Remove from taskbar
        focusable: false, // Optional: Make window non-focusable
        // fullscreenable: false, // Optional: Make window non-fullscreenable
        // maximizable: false, // Optional: Make window non-maximizable
        // minimizable: false, // Optional: Make window non-minimizable
        resizable: false, // Optional: Make window non-resizable
        // movable: false, // Optional: Make window non-movable
        webPreferences: {
            // plugins: true
            // Additional preferences
            // preload: join(app.getAppPath(), 'build', 'src', 'preload.js'),
        },
        // closable: true,
        // parent: mainWindow
    };
    let win = new BrowserWindow(windowSettings);

    // Open the DevTools.
    // win.webContents.openDevTools(); // Uncomment if you want to open DevTools

    // Make window click-through
    if (!windowSettings.draggable) win.setIgnoreMouseEvents(true, { forward: true });
    // win.setIgnoreMouseEvents(true); // Make the window ignore mouse events

    win.loadURL(`file://${path.join(__dirname, 'index.html')}`);

    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}

app.whenReady().then(createWindow);
// app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
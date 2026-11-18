const { app, BrowserWindow, shell, Menu } = require('electron');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

// Open web links in Brave if it is installed, otherwise in the default browser.
function findBrave() {
  const e = process.env;
  const rel = path.join('BraveSoftware', 'Brave-Browser', 'Application', 'brave.exe');
  return [e['ProgramFiles'], e['ProgramFiles(x86)'], e['LOCALAPPDATA']]
    .filter(Boolean).map(b => path.join(b, rel)).find(p => fs.existsSync(p));
}
function openInBrave(url) {
  const brave = process.platform === 'win32' ? findBrave() : null;
  if (!brave) return shell.openExternal(url);
  try {
    const c = spawn(brave, [url], { detached: true, stdio: 'ignore' });
    c.on('error', () => shell.openExternal(url));
    c.unref();
  } catch (err) { shell.openExternal(url); }
}

app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

if (!app.requestSingleInstanceLock()) {
  app.quit();
}

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 420,
    minHeight: 600,
    title: 'Symphony 6th',
    backgroundColor: '#000000',
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'build', 'icon.png'),
    webPreferences: { contextIsolation: true, nodeIntegration: false, webSecurity: false }
  });
  Menu.setApplicationMenu(null);
  win.loadFile(path.join(__dirname, 'app', 'index.html'));
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/.test(url)) openInBrave(url);
    return { action: 'deny' };
  });
  win.webContents.on('will-navigate', (e, url) => {
    if (/^https?:/.test(url)) { e.preventDefault(); openInBrave(url); }
  });
  win.webContents.on('before-input-event', (e, input) => {
    if (input.type === 'keyDown' && input.key === 'F11') win.setFullScreen(!win.isFullScreen());
  });
}

app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());

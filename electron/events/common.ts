import { BrowserWindow, ipcMain, remote } from "electron";

function common(mainWindow: BrowserWindow) {
  ipcMain.on("minimize", () => {
    mainWindow.minimize();
  });
  ipcMain.on("maximize", () => {
    if (mainWindow.isMaximized()) {
      return mainWindow.restore();
    }
    return mainWindow.maximize();
  });
  ipcMain.on("close", () => {
    mainWindow.close();
  });
}

export default common;

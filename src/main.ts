import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { APP_CONFIG } from "../config/app.config.js";
import { createLogger } from "./utils/logger.js";

const __filename = fileURLToPath(import.meta.url);

const logger = createLogger("main");

let mainWindow: BrowserWindow | null = null;

function createWindow(): void {
  logger.info("Creating main window...");

  mainWindow = new BrowserWindow({
    width: APP_CONFIG.window.width,
    height: APP_CONFIG.window.height,
    minWidth: APP_CONFIG.window.minWidth,
    minHeight: APP_CONFIG.window.minHeight,
    resizable: APP_CONFIG.window.resizable,
    alwaysOnTop: APP_CONFIG.window.alwaysOnTop,
    frame: APP_CONFIG.window.frame,
    titleBarStyle: APP_CONFIG.window.titleBarStyle as any,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
    },
    title: "Calculator",
    backgroundColor: "#f8f9fa",
    show: false,
  });

  mainWindow.loadFile("index.html");

  mainWindow.once("ready-to-show", () => {
    mainWindow?.show();
    logger.info("Main window shown");

    if (process.platform === "darwin") {
      mainWindow?.focus();
    }
  });

  mainWindow.on("closed", () => {
    logger.info("Main window closed");
    mainWindow = null;
  });

  if (process.env.NODE_ENV === "development" && APP_CONFIG.development.showDevTools) {
    mainWindow.webContents.openDevTools();
  }

  logger.info("Main window created successfully");
}

app.whenReady().then(() => {
  logger.info("App ready, creating window...");
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  logger.info("All windows closed");

  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("before-quit", () => {
  logger.info("App quitting...");
});

app.on("web-contents-created", (_, contents) => {
  contents.setWindowOpenHandler(({ url }) => {
    logger.warn("Blocked new window creation to:", url);
    return { action: "deny" };
  });
});

app.on("certificate-error", (event, _, __, error, ___, callback) => {
  event.preventDefault();
  callback(false);
  logger.error("Certificate error:", error);
});

logger.info("Calculator app starting...");
logger.info("Platform:", process.platform);
logger.info("Electron version:", process.versions.electron);
logger.info("Node version:", process.versions.node);
logger.info("Environment:", process.env.NODE_ENV || "production");
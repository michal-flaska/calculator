/**
 * Main Electron process
 * Handles application lifecycle and window management
 */

import { app, BrowserWindow } from "electron"
import path from "path"
import { fileURLToPath } from "url"
import { APP_CONFIG } from "../config/app.config.js"
import { createLogger } from "./utils/logger.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Initialize logger
const logger = createLogger("main")

// Keep a global reference of the window object
let mainWindow

/**
 * Create the main application window
 */
function createWindow() {
  logger.info("Creating main window...")

  // Create the browser window
  mainWindow = new BrowserWindow({
    width: APP_CONFIG.window.width,
    height: APP_CONFIG.window.height,
    minWidth: APP_CONFIG.window.minWidth,
    minHeight: APP_CONFIG.window.minHeight,
    resizable: APP_CONFIG.window.resizable,
    alwaysOnTop: APP_CONFIG.window.alwaysOnTop,
    frame: APP_CONFIG.window.frame,
    titleBarStyle: APP_CONFIG.window.titleBarStyle,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
    },
    icon: path.join(__dirname, "../assets/icon.png"),
    title: "Calculator",
    backgroundColor: "#f8f9fa",
    show: false,
    titleBarOverlay: false,
  })

  // Load the app
  mainWindow.loadFile("index.html")

  // Show window when ready
  mainWindow.once("ready-to-show", () => {
    mainWindow.show()
    logger.info("Main window shown")

    // Focus on the window (especially important on macOS)
    if (process.platform === "darwin") {
      mainWindow.focus()
    }
  })

  // Handle window closed
  mainWindow.on("closed", () => {
    logger.info("Main window closed")
    mainWindow = null
  })

  // Development tools
  if (process.env.NODE_ENV === "development" && APP_CONFIG.development.showDevTools) {
    mainWindow.webContents.openDevTools()
  }

  logger.info("Main window created successfully")
}

/**
 * Application event handlers
 */

// App ready
app.whenReady().then(() => {
  logger.info("App ready, creating window...")
  createWindow()

  // macOS specific: Re-create window when dock icon is clicked
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// All windows closed
app.on("window-all-closed", () => {
  logger.info("All windows closed")

  // Quit app (except on macOS)
  if (process.platform !== "darwin") {
    app.quit()
  }
})

// Before quit
app.on("before-quit", () => {
  logger.info("App quitting...")
})

// Security: Prevent new window creation
app.on("web-contents-created", (event, contents) => {
  contents.on("new-window", (event, navigationUrl) => {
    event.preventDefault()
    logger.warn("Blocked new window creation to:", navigationUrl)
  })
})

// Handle certificate errors
app.on("certificate-error", (event, webContents, url, error, certificate, callback) => {
  event.preventDefault()
  callback(false)
  logger.error("Certificate error:", error)
})

// Log startup information
logger.info("Calculator app starting...")
logger.info("Platform:", process.platform)
logger.info("Electron version:", process.versions.electron)
logger.info("Node version:", process.versions.node)
logger.info("Environment:", process.env.NODE_ENV || "production")

// Main process file - Entry point for Electron application
import { app, BrowserWindow } from "electron"
import path from "path"
import { fileURLToPath } from "url"

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Keep a global reference of the window object to prevent garbage collection
let mainWindow

function createWindow() {
  // Create the browser window with specific configurations
  mainWindow = new BrowserWindow({
    width: 320,
    height: 500,
    resizable: false,
    webPreferences: {
      nodeIntegration: false, // Security: Disable Node.js integration in renderer
      contextIsolation: true, // Security: Enable context isolation
      preload: path.join(__dirname, "preload.js"), // Load preload script
    },
    icon: path.join(__dirname, "assets/icon.png"),
    title: "Calculator",
    backgroundColor: "#f8f9fa",
    show: false, // Don't show until ready to prevent visual flash
  })

  // Load the index.html file
  mainWindow.loadFile("index.html")

  // Show window when ready
  mainWindow.once("ready-to-show", () => {
    mainWindow.show()
  })

  // Handle window closed
  mainWindow.on("closed", () => {
    mainWindow = null
  })

  // Remove default menu bar
  mainWindow.setMenuBarVisibility(false)
}

// Create window when Electron has finished initialization
app.whenReady().then(() => {
  createWindow()

  // On macOS, re-create window when dock icon is clicked
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// Quit when all windows are closed (except on macOS)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

// Log app start information
console.log("Calculator app starting...")
console.log("Electron version:", process.versions.electron)
console.log("Node version:", process.versions.node)

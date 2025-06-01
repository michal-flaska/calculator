// Preload script - Secure bridge between renderer and main processes
const { contextBridge } = require("electron")

// Expose a limited API to the renderer process
contextBridge.exposeInMainWorld("calculator", {
  // We're not using IPC for this simple calculator as all logic can be handled in the renderer
  // But this is where you would add IPC communication if needed for more complex features
  version: process.versions.electron,
})

// Log when preload script is executed
console.log("Preload script loaded")

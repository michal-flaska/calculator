const { contextBridge } = require("electron")

contextBridge.exposeInMainWorld("calculator", {
  version: process.versions.electron,
})

console.log("Preload script loaded")

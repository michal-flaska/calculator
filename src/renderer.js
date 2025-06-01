/**
 * Main renderer process script
 * Entry point for the calculator UI
 */

import UIController from "./calculator/ui-controller.js"
import { createLogger } from "./utils/logger.js"

const logger = createLogger("renderer")

// Initialize the calculator when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  logger.info("DOM loaded, initializing calculator...")

  try {
    // Create UI controller instance
    const calculator = new UIController()

    logger.info("Calculator initialized successfully")
  } catch (error) {
    logger.error("Failed to initialize calculator:", error)
  }
})

// Handle app errors
window.addEventListener("error", (event) => {
  logger.error("Unhandled error:", event.error)
})

window.addEventListener("unhandledrejection", (event) => {
  logger.error("Unhandled promise rejection:", event.reason)
})

logger.info("Renderer script loaded")

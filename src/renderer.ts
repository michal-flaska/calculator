import UIController from "./calculator/ui-controller.js";
import { createLogger } from "./utils/logger.js";

const logger = createLogger("renderer");

document.addEventListener("DOMContentLoaded", () => {
  logger.info("DOM loaded, initializing calculator...");

  try {
    new UIController();
    logger.info("Calculator initialized successfully");
  } catch (error) {
    logger.error("Failed to initialize calculator:", error);
    console.error("Calculator initialization failed:", error);
  }
});

window.addEventListener("error", (event) => {
  logger.error("Unhandled error:", event.error);
  console.error("Unhandled error:", event.error);
});

window.addEventListener("unhandledrejection", (event) => {
  logger.error("Unhandled promise rejection:", event.reason);
  console.error("Unhandled promise rejection:", event.reason);
});

logger.info("Renderer script loaded");
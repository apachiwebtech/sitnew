// utils/logger.js
const fs = require('fs');
const path = require('path');

// Log file path
const logPath = path.join(__dirname, 'error.log');

const logError = (error) => {
  const time = new Date().toISOString();
  const message = `[${time}] ${error.stack || error}\n\n`;

  fs.appendFile(logPath, message, (err) => {
    if (err) {
      console.error("Failed to write to log file", err);
    }
  });
};

module.exports = { logError };

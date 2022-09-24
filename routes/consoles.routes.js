const express = require("express");

// Controllers
const {
  getAllConsoles,
  createConsole,
  updateConsole,
  deleteConsole,
} = require("../controllers/console.controller");

// Middlewares
const {
  protectSession,
  protectUsersAccount,
} = require("../middlewares/auth.middlewares");
const {
  createConsoleValidators,
} = require("../middlewares/validators.middlewares");
const { consoleExists } = require("../middlewares/consoles.middlewares");

const consoleRouter = express.Router();

consoleRouter.get("/", getAllConsoles);

// Protecting below endpoints
consoleRouter.use(protectSession);

consoleRouter.post("/", createConsoleValidators, createConsole);

consoleRouter.patch("/:id", consoleExists, updateConsole);

consoleRouter.delete("/:id", consoleExists, deleteConsole);

module.exports = { consoleRouter };

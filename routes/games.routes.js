const express = require("express");

// Controllers
const {
  getAllGames,
  createGame,
  updateGame,
  createReviewAboutGame,
  deleteGame,
} = require("../controllers/games.controller");

// Middlewares
const {
  protectSession,
  protectUsersAccount,
} = require("../middlewares/auth.middlewares");
const {
  createGameValidators,
  createCommentValidators,
} = require("../middlewares/validators.middlewares");
const { gameExists } = require("../middlewares/games.middlewares");

const gamesRouter = express.Router();

gamesRouter.get("/", getAllGames); //getAllGames

// Protecting below endpoints
gamesRouter.use(protectSession);

gamesRouter.post("/", createGameValidators, createGame);

gamesRouter.post(
  "/reviews/:gameId",
  createCommentValidators,
  createReviewAboutGame
);

gamesRouter.patch("/:id", gameExists, updateGame);

gamesRouter.delete("/:id", gameExists, deleteGame);

module.exports = { gamesRouter };

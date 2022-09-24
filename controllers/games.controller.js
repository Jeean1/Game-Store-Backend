// Models
const { Game } = require("../models/game.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { Review } = require("../models/review.model");
const { GameInConsole } = require("../models/gameInConsole.model");
const { Console } = require("../models/console.model");

const getAllGames = catchAsync(async (req, res, next) => {
  const games = await Game.findAll({
    where: { status: "active" },
    include: { model: Console, through: {attributes: []} },
  });

  res.status(200).json({
    status: "success",
    data: { games },
  });
});

const createGame = catchAsync(async (req, res, next) => {
  const { title, genre, consoleId } = req.body;

  const newGame = await Game.create({ title, genre });

  // Assign game to console

  await GameInConsole.create({
    gameId: newGame.id,
    consoleId,
  });

  // 201 -> Success and a resource has been created
  res.status(201).json({
    status: "success",
    data: { newGame },
  });
});

const createReviewAboutGame = catchAsync(async (req, res, next) => {
  const { comment } = req.body;

  const { gameId } = req.params;
  const { sessionUser } = req;

  const newReview = await Review.create({
    userId: sessionUser.id,
    gameId,
    comment,
  });

  // 201 -> Success and a resource has been created
  res.status(201).json({
    status: "success",
    data: { newReview },
  });
});

const updateGame = catchAsync(async (req, res, next) => {
  const { title } = req.body;
  const { game } = req;

  await game.update({ title });

  res.status(200).json({
    status: "success",
    data: { game },
  });
});

const deleteGame = catchAsync(async (req, res, next) => {
  const { game } = req;

  await game.update({ status: "deleted" });

  res.status(204).json({ status: "success" });
});

module.exports = {
  getAllGames,
  createGame,
  createReviewAboutGame,
  updateGame,
  deleteGame,
};

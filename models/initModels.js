// Models
const { Console } = require("./console.model");
const { Game } = require("./game.model");
const { Review } = require("./review.model");
const { User } = require("./user.model");

const initModels = () => {
  // 1 User <----> M Reviews

  User.hasMany(Review, { foreignKey: "userId" });
  Review.belongsTo(User);
};

// 1 Game <----> M Reviews

Game.hasMany(Review, { foreignKey: "gameId" });
Review.belongsTo(Game);

// M Game <----> M Console

Game.belongsToMany(Console, {
  through: "gameinconsole",
  foreignKey: "gameId",
});
Console.belongsToMany(Game, {
  through: "gameinconsole",
  foreignKey: "consoleId",
});

module.exports = { initModels };

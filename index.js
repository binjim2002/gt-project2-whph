"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + "/../config/config.json")[env];
var db = {}; 

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
  })
  .forEach(function(file) {
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// db.game = require('../models/games.js')(sequelize, Sequelize);
// db.user = require('../models/user.js')(sequelize, Sequelize);

// db.game.belongsToMany(db.user, { as: 'Users', through: 'users_games', foreignKey: 'gameId', otherKey: 'userId'});
// db.user.belongsToMany(db.game, { as: 'Games', through: 'users_games', foreignKey: 'userId', otherKey: 'gameId'});
 
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;


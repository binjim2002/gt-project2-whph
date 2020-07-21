// tagUserGame.js
module.exports = function(sequelize, DataTypes) {
    const User_games = sequelize.define('User_games', {
      game_user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.INTEGER,
        primaryKey: true
      },
      game_id: {
        type: DataTypes.INTEGER(11),
        primaryKey: false,
        references: {
          model: 'games',
          key: 'game_id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        unique: 'unique-user-per-game'
      },
      user_id: {
        type: DataTypes.INTEGER(11),
        primaryKey: false,
        references: {
          model: 'user',
          key: 'user_id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        unique: 'unique-game-per-user'
      },
    }, {
      timestamps: false,
      underscored: true,
      tableName: 'users_games'
    });

    User_games.associate = (models) => {
        User_games.belongsTo(models.Game, { foreignKey: 'game_id', targetKey: 'game_id', as: 'Game' });
        User_games.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'user_id', as: 'User' });
      }
  
    return User_games
  };
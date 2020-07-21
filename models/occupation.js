module.exports = function(sequelize, DataTypes) {
    let Occupation = sequelize.define("Occupation", {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      occupation: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true
      }
    }, {timestamps: false})
    Occupation.associate = (models) => {
      Occupation.hasOne(models.User);
    }

    return Occupation;
};
module.exports = (sequelize, DataTypes) => {
  const UserBands = sequelize.define(
    "UserBands",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      band_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Bands",
          key: "id",
        },
      },
    },
    {
      tableName: "UserBands",
      timestamps: true,
      freezeTableName: true,
    }
  );

  UserBands.associate = function (models) {
    UserBands.belongsTo(models.Users, { foreignKey: "user_id" });
    UserBands.belongsTo(models.Bands, { foreignKey: "band_id" });
  };

  return UserBands;
};

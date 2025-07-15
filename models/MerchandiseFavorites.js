module.exports = (sequelize, DataTypes) => {
  const MerchandiseFavorites = sequelize.define(
    "MerchandiseFavorites",
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
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
      },
      merchandise_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Merchandise",
          key: "id",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
      },
    },
    {
      tableName: "merchandise_favorites",
      timestamps: false,
    }
  );
  MerchandiseFavorites.associate = (models) => {
    MerchandiseFavorites.belongsTo(models.Users, { foreignKey: "user_id" });
    MerchandiseFavorites.belongsTo(models.Merchandise, {
      foreignKey: "merchandise_id",
    });
  };
  return MerchandiseFavorites;
};

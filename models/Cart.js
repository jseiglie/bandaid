module.exports = (sequelize, DataTypes) => {
  const Carts = sequelize.define(
    "Carts",
    {
      id: {
        type: DataTypes.INTEGER,
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
    },
    {
      tableName: "carts",
      timestamps: true,
      freezeTableName: true,
    }
  );

  Carts.associate = (models) => {
    Carts.belongsTo(models.Users, { foreignKey: "user_id" });
    Carts.hasMany(models.CartItems, { foreignKey: "cart_id" });
  };

  return Carts;
};
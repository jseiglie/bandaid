module.exports = (sequelize, DataTypes) => {
  const CartItems = sequelize.define(
    "CartItems",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "carts",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",

      },
      merchandise_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "merchandise",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      tableName: "cart_items",
      timestamps: true,
      freezeTableName: true,
    }
  );

  CartItems.associate = (models) => {
  CartItems.belongsTo(models.Carts, { foreignKey: "cart_id" });
  CartItems.belongsTo(models.Merchandise, { foreignKey: "merchandise_id" });
  };

  return CartItems;
};

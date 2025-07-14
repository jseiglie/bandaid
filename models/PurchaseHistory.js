module.exports = (sequelize, DataTypes) => {
  const PurchaseHistory = sequelize.define(
    "PurchaseHistory",
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
      merchandise_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Merchandise",
          key: "id",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      purchaseDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
      },
      transaction_id: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    },
    {
      tableName: "purchase_history",
      timestamps: true,
      freezeTableName: true,
    }
  );

  PurchaseHistory.associate = (models) => {
    PurchaseHistory.belongsTo(models.Users, { foreignKey: "user_id" });
    PurchaseHistory.belongsTo(models.Merchandise, { foreignKey: "merchandise_id" });
  };

  return PurchaseHistory;
};
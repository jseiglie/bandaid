module.exports = (sequelize, DataTypes) => {
  const UserSubscriptions = sequelize.define(
    "UserSubscriptions",
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
      },
      subscription_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stripe_subscription_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      stripe_customer_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      stripe_invoice_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      price_amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      price_currency: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      invoice_pdf: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      hosted_invoice_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      
      current_period_start: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      current_period_end: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: "active",
      },
    },
    {
      tableName: "UserSubscriptions",
      timestamps: true,
      freezeTableName: true,
    }
  );
  //associations with Users and Subscriptions
  UserSubscriptions.associate = function (models) {
    UserSubscriptions.belongsTo(models.Users, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
    });
    UserSubscriptions.belongsTo(models.Subscriptions, {
      foreignKey: "subscription_id",

      onDelete: "CASCADE",
    });
  };

  return UserSubscriptions;
};

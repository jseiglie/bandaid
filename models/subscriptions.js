module.exports = (sequelize, DataTypes) => {
  const Subscriptions = sequelize.define(
    "Subscriptions",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      recurring: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },

      price_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      tableName: "Subscriptions",
      timestamps: true,
      freezeTableName: true,
      underscored: true, 
    }
  );
  //Associationswith users thought userSubscriptions

 Subscriptions.associate = function (models) {
    Subscriptions.belongsToMany(models.Users, {
      through: models.UserSubscriptions,
      foreignKey: "subscription_id",
      otherKey: "user_id",
    });
    Subscriptions.hasMany(models.UserSubscriptions, {
      foreignKey: "subscription_id",
      onDelete: "CASCADE",
    });
  };

  return Subscriptions;
};

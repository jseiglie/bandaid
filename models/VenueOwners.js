module.exports = (sequelize, DataTypes) => {
  const VenuesOwner = sequelize.define(
    "VenuesOwner",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      venue_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: "VenuesOwner",
      freezeTableName: true,
    }
  );

  VenuesOwner.associate = (models) => {
    VenuesOwner.belongsTo(models.Venues, {
      foreignKey: "venue_id",
    });
    VenuesOwner.belongsTo(models.Users, {
      foreignKey: "owner_id",
    });
  };

  return VenuesOwner;
};

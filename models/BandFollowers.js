module.exports = (sequelize, DataTypes) => {
  const BandFollowers = sequelize.define(
    "BandFollowers",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      band_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Bands", 
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      follower_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users", 
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "BandFollowers",
      timestamps: true,
      freezeTableName: true,
    }
  );
  BandFollowers.associate = function (models) {
    BandFollowers.belongsTo(models.Bands, {
      foreignKey: "band_id",
      as: "band",
    });
    BandFollowers.belongsTo(models.Users, {
      foreignKey: "follower_id",
      as: "follower",
    });
  };
  return BandFollowers;
};

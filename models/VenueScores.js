module.exports = (sequelize, DataTypes) => {
  const VenueScores = sequelize.define(
    "VenueScores",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      venue_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Venues",
          key: "id",
        },
      },
      score: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "venue_scores",
      timestamps: true,
      freezeTableName: true,
      underscored: true,
    }
  );

  VenueScores.associate = (models) => {
    VenueScores.belongsTo(models.Venues, {
      foreignKey: "venue_id",
      as: "venue",
    });
    VenueScores.belongsTo(models.Users, {
      foreignKey: "user_id",
      as: "user",
    });
  };

  VenueScores.prototype.toJSON = function () {
    const values = this.get();

    delete values.user_id;
    delete values.venue_id;

    return values;
  };

  return VenueScores;
};

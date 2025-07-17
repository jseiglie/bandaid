module.exports = (sequelize, DataTypes) => {
  const Venues = sequelize.define(
    "Venues",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zip: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      website: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      score: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      tableName: "venues",
      timestamps: true,
      freezeTableName: true,
      underscored: true,
    }
  );

  Venues.associate = (models) => {
    Venues.hasMany(models.VenueScores, {
      foreignKey: "venue_id",
      as: "scores",
    });
    Venues.hasMany(models.VenuesOwner, {
      foreignKey: "venue_id",
    });
  };

  Venues.prototype.toJSON = function () {
    const values = this.get();
    delete values.email;
    delete values.phone;
    delete values.website;

    return values;
  };

  return Venues;
};

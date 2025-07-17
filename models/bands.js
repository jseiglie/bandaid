module.exports = (sequelize, DataTypes) => {
  const Bands = sequelize.define(
    "Bands",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: true,
      },
      band_admin: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      genre: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      website: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      logo: {
        type: DataTypes.TEXT(),
        defaultValue:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffreepngimg.com%2Fthumb%2Fband%2F26223-1-band-photos.png&f=1&nofb=1&ipt=4d20faa39f989336905b6721f7dba99b693a340d1df470aed77958d3f02a72ef",
      },
      cover_photo: {
        type: DataTypes.TEXT(),
        allowNull: true,
      },
      logo_public_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
      cover_photo_public_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
      contact_email: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      contact_phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      contact_person: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      established_year: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      members_count: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      social_media: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      tableName: "Bands",
      timestamps: true,
      freezeTableName: true,
      underscored: true,
    }
  );

  Bands.associate = function (models) {
    Bands.belongsToMany(models.Users, {
      through: "UserBands",
      foreignKey: "band_id",
      onDelete: "CASCADE",
    });
    Bands.hasMany(models.BandMembers, { foreignKey: "band_id" });
    Bands.hasMany(models.SetLists, { foreignKey: "band_id" });
    Bands.hasMany(models.Lives, { foreignKey: "band_id" });
    Bands.hasMany(models.Songs, { foreignKey: "band_id" });
    Bands.hasMany(models.Rehearsals, { foreignKey: "band_id" });
    Bands.hasMany(models.BandDefaultSchedules, {
      foreignKey: "band_id",
      as: "defaultSchedules",
      onDelete: "CASCADE",
    });
    Bands.belongsTo(models.Users, {
      foreignKey: "band_admin",
      as: "admin",
      onDelete: "SET NULL",
    });
    Bands.belongsToMany(models.BandTags, {
      through: "BandTagsRel",
      foreignKey: "band_id",
      otherKey: "tag_id",
      onDelete: "CASCADE",
    });
    Bands.hasMany(models.Merchandise, { foreignKey: "owner" });
  };

  Bands.prototype.toJSON = function () {
    const values = this.get();

    delete values.createdAt;
    delete values.updatedAt;
    return values;
  };

  return Bands;
};

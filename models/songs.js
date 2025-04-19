module.exports = (sequelize, DataTypes) => {
  const Songs = sequelize.define(
    "Songs",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      writtenBy: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      arrengedBy: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      recordedBy: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      producedBy: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      mixedBy: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      masteredBy: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      isSingle: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      isDemo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      album: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      releaseDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      key: {
        type: DataTypes.STRING(3),
        allowNull: false,
      },
      isCover: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      lyrics: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      genre: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      bpm: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      timeSignature: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      hasVideo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      videoLink: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      isPublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      hasCopyright: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      tableName: "Songs",
      timeStamp: true,
      freezeTableName: true,
    }
  );
  Songs.associate = function (models) {
    Songs.belongsToMany(models.SetLists, {
      through: "SetListSongs",
      foreignKey: "song_id",
      onDelete: "CASCADE",
    });
    Songs.belongsTo(models.Bands, { foreignKey: "band_id", onDelete: "CASCADE" });
    Songs.belongsTo(models.Users, { foreignKey: "proposed_by", onDelete: "CASCADE" });
  };

  return Songs;
};

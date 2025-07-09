module.exports = (sequelize, DataTypes) => {
  const SetListSongs = sequelize.define(
    "SetListSongs",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      setlist_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "SetLists",
          key: "id",
        },
      },
      song_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Songs",
          key: "id",
        },
      },
    },
    {
      tableName: "SetListSongs",
      timestamps: true, // ← corregido
      freezeTableName: true,
    }
  );

  SetListSongs.associate = function (models) {
    SetListSongs.belongsTo(models.SetLists, { foreignKey: "setlist_id" });
    SetListSongs.belongsTo(models.Songs, { foreignKey: "song_id", as: "song" });
  };

  return SetListSongs;
};

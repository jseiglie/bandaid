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
      timeStamp: true,
      freezeTableName: true,
    }
  );

  SetListSongs.associate = function (models) {
    // Define the relationship between SetListSongs and SetLists
    SetListSongs.belongsTo(models.SetLists, { foreignKey: "setlist_id" });
    // Define the relationship between SetListSongs and Songs
    SetListSongs.belongsTo(models.Songs, { foreignKey: "song_id" });
  };

  return SetListSongs;
};

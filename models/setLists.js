module.exports = (sequelize, DataTypes) => {
  const SetLists = sequelize.define(
    "SetLists",
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
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
     
      accepted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      tableName: "SetLists",
      timeStamp: true,
      freezeTableName: true,
    }
  );
  SetLists.associate = function (models) {
    // Define the relationship between SetLists and Bands
    SetLists.belongsTo(models.Bands, { foreignKey: "band_id" });
    // Define the relationship between SetLists and Users
    SetLists.belongsTo(models.Users, { foreignKey: "proposed_by" });
    // Define the relationship between SetLists and Lives
    SetLists.hasMany(models.Lives, { foreignKey: "setlist_id" });
    // Define the relationship between SetLists and Songs
    SetLists.belongsToMany(models.Songs, {
      through: "SetListSongs",
      foreignKey: "setlist_id",
      onDelete: "CASCADE",
    });
   };

  return SetLists;
};
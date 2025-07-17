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
      proposed_by: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
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
      timestamps: true, // ← corregido
      freezeTableName: true,
      underscored: true, 
    }
  );

  SetLists.associate = function (models) {
    SetLists.belongsTo(models.Bands, { foreignKey: "band_id" });
    SetLists.belongsTo(models.Users, { foreignKey: "proposed_by" });
    SetLists.hasMany(models.Lives, { foreignKey: "setlist_id" });
    SetLists.hasMany(models.SetListSongs, {
    foreignKey: 'setlist_id',
    as: 'setlist_songs',
  });
    SetLists.belongsToMany(models.Songs, {
      through: "SetListSongs",
      foreignKey: "setlist_id",
      onDelete: "CASCADE",
    });
  };

  return SetLists;
};
module.exports = (sequelize, DataTypes) => {
    const BandMembers = sequelize.define(
      "BandMembers",
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
        musician_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "MusicianProfiles",
            key: "id",
          },
        },
        role: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
      },
      {
        tableName: "BandMembers",
        timestamps: true,
        freezeTableName: true,
      }
    );
  
    BandMembers.associate = function (models) {
      BandMembers.belongsTo(models.Bands, { foreignKey: "band_id" });
      BandMembers.belongsTo(models.MusicianProfile, { foreignKey: "musician_id" });
    };
  
    return BandMembers;
  };
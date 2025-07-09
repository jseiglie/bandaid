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
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Users",
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
      BandMembers.belongsTo(models.Users, { foreignKey: "user_id" });
    };
  
    return BandMembers;
  };
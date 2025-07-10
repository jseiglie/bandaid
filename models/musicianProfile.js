module.exports = (sequelize, DataTypes) => {
    const MusicianProfile = sequelize.define(
      "MusicianProfile",
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true,
          references: {
            model: "Users",
            key: "id",
          },
        },
        bio: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        instruments: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        genres: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        experience: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        social_links: {
          type: DataTypes.JSON,
          allowNull: true,
        },
      },
      {
        tableName: "MusicianProfiles",
        timestamps: true,
        freezeTableName: true,
      }
    );
  
    MusicianProfile.associate = function (models) {
      MusicianProfile.belongsTo(models.Users, { foreignKey: "user_id" });
    };
  
    MusicianProfile.prototype.toJSON = function () {
      const values = this.get();
      delete values.createdAt; // Exclude createdAt from the JSON representation
      delete values.updatedAt; // Exclude updatedAt from the JSON representation
      delete values.user_id; // Exclude user_id from the JSON representation
      return values;
    };

    return MusicianProfile;
  };
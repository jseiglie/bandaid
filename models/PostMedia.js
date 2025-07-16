module.exports = (sequelize, DataTypes) => {
  const PostMedia = sequelize.define(
    "PostMedia",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      media_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      media_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "post_media",
      timestamps: true,
      freezeTableName: true,
    }
  );
  PostMedia.associate = (models) => {
    PostMedia.belongsTo(models.Posts, { foreignKey: "post_id" });
  };

  PostMedia.prototype.toJSON = function () {
    const values = this.get();
    delete values.createdAt;
    delete values.updatedAt;
    return values;
  };

  return PostMedia;
};

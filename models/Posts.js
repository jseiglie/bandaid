module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define(
    "Posts",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      likes_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      dislikes_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: "Posts",
      timestamps: true,
      freezeTableName: true,
    }
  );
  Posts.associate = (models) => {
    Posts.belongsTo(models.Users, { foreignKey: "author_id" });
    Posts.hasMany(models.Comments, { foreignKey: "post_id", as: "comments" });
    Posts.hasMany(models.PostMedia, { foreignKey: "post_id", as: "media" });
    Posts.belongsToMany(models.Tags, {
      through: models.PostTags,
      foreignKey: "post_id",
      otherKey: "tag_id",
      as: "tags",
    });
  };
  return Posts;
};

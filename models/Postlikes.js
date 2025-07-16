module.exports = (sequelize, DataTypes) => {
  const PostLikes = sequelize.define(
    "PostLikes",
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
        references: {
          model: "Posts",
          key: "id",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
      },
      liked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: "post_likes",
      timestamps: true,
      freezeTableName: true,
    }
  );

  PostLikes.associate = (models) => {
    PostLikes.belongsTo(models.Posts, { foreignKey: "post_id" });
    PostLikes.belongsTo(models.Users, { foreignKey: "user_id" });

    // Hook para evitar duplicados y actualizar contadores
    PostLikes.addHook("beforeCreate", async (like) => {
      const post = await models.Posts.findByPk(like.post_id);
      if (!post) throw new Error("Post not found");

      const user = await models.Users.findByPk(like.user_id);
      if (!user) throw new Error("User not found");

      const exists = await PostLikes.findOne({
        where: {
          post_id: like.post_id,
          user_id: like.user_id,
        },
      });
      if (exists) throw new Error("User already liked/disliked this post");
    });

    PostLikes.addHook("afterCreate", async (like) => {
      const post = await models.Posts.findByPk(like.post_id);
      if (!post) return;

      if (like.liked) post.likes_count += 1;
      else post.dislikes_count += 1;

      await post.save();
    });

    PostLikes.addHook("afterDestroy", async (like) => {
      const post = await models.Posts.findByPk(like.post_id);
      if (!post) return;

      if (like.liked && post.likes_count > 0) post.likes_count -= 1;
      else if (!like.liked && post.dislikes_count > 0) post.dislikes_count -= 1;

      await post.save();
    });
  };

  PostLikes.prototype.toJSON = function () {
    const values = this.get();
    delete values.createdAt;
    delete values.updatedAt;
    return values;
  };

  return PostLikes;
};

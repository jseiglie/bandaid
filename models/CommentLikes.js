module.exports = (sequelize, DataTypes) => {
  const CommentLikes = sequelize.define(
    "CommentLikes",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      comment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Comments",
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
      tableName: "comment_likes",
      timestamps: true,
      freezeTableName: true,
    }
  );

  CommentLikes.associate = (models) => {
    CommentLikes.belongsTo(models.Comments, { foreignKey: "comment_id" });
    CommentLikes.belongsTo(models.Users, { foreignKey: "user_id" });

    // Hook to prevent duplicates
    CommentLikes.addHook("beforeCreate", async (like) => {
      const comment = await models.Comments.findByPk(like.comment_id);
      if (!comment) throw new Error("Comment not found");

      const user = await models.Users.findByPk(like.user_id);
      if (!user) throw new Error("User not found");

      const exists = await CommentLikes.findOne({
        where: {
          comment_id: like.comment_id,
          user_id: like.user_id,
        },
      });
      if (exists) throw new Error("User already liked/disliked this comment");
    });

    // update counters after creation
    CommentLikes.addHook("afterCreate", async (like) => {
      const comment = await models.Comments.findByPk(like.comment_id);
      if (!comment) return;

      if (like.liked) comment.likes_count += 1;
      else comment.dislikes_count += 1;

      await comment.save();
    });

    // update counters after deletion
    CommentLikes.addHook("afterDestroy", async (like) => {
      const comment = await models.Comments.findByPk(like.comment_id);
      if (!comment) return;

      if (like.liked && comment.likes_count > 0) comment.likes_count -= 1;
      else if (!like.liked && comment.dislikes_count > 0)
        comment.dislikes_count -= 1;

      await comment.save();
    });
  };

  CommentLikes.prototype.toJSON = function () {
    const values = this.get();
    delete values.createdAt;
    delete values.updatedAt;
    return values;
  };

  return CommentLikes;
};

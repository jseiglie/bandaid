module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    "Comments",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Posts",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      comment_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Comments",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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
      tableName: "Comments",
      timestamps: true,
      freezeTableName: true,
    }
  );

  Comments.associate = (models) => {
    Comments.belongsTo(models.Posts, { foreignKey: "post_id" });
    Comments.belongsTo(models.Users, { foreignKey: "author_id" });
    Comments.hasMany(models.Comments, {
      foreignKey: "comment_id",
      as: "comments",
    });
  };

  // Before create hook to ensure post and user exist
  Comments.beforeCreate(async (comment, options) => {
    const { Posts, Users, Comments: CommentsModel } = sequelize.models;

    if (comment.post_id) {
      const post = await Posts.findByPk(comment.post_id);
      if (!post) throw new Error("Post not found");
    }

    const user = await Users.findByPk(comment.author_id);
    if (!user) throw new Error("User not found");

    if (comment.comment_id) {
      const parent = await CommentsModel.findByPk(comment.comment_id);
      if (!parent) throw new Error("Parent comment not found");
    }
  });

  Comments.prototype.toJSON = function () {
    const values = this.get();
    delete values.createdAt;
    delete values.updatedAt;
    return values;
  };

  return Comments;
};

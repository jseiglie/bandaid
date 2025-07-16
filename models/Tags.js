module.exports = (sequelize, DataTypes) => {
  const Tags = sequelize.define(
    "Tags",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      tag_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "tags",
      timestamps: false,
      freezeTableName: true,
    }
  );
  Tags.assciate = (models) => {
    Tags.belongsToMany(models.Posts, {
      through: models.PostTags,
      foreignKey: "tag_id",
      otherKey: "post_id",
      as: "posts",
    });
  };
  return Tags;
};

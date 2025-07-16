module.exports = (sequelize, DataTypes) => {
    const PostTags = sequelize.define(
      "PostTags",
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
            tag_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            timestamps: true,
            tableName: "post_tags",
            freezeTableName: true,
        }
    );
    return PostTags;
}
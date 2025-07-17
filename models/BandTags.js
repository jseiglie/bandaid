module.exports = (sequelize, DataTypes) => {
    const BandTags = sequelize.define(
        "BandTags",
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            tag_name: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
        },
        {
            tableName: "bandTags",
            timestamps: false,
            freezeTableName: true,
            underscored: true,
        }
    );
    BandTags.associate = function (models) {
        BandTags.belongsToMany(models.Bands, {
            through: "BandTagsRel",
            foreignKey: "tag_id",
            otherKey: "band_id",
            onDelete: "CASCADE",
        });
    };

    return BandTags;
};

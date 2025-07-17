module.exports = (sequelize, DataTypes) => {
    const BandTagsRel = sequelize.define(
        "BandTagsRel",
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
            },
            tag_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: "BandTagsRel",
            timestamps: false,
            freezeTableName: true,
            underscored: true,
        }

    );
    BandTagsRel.associate = (models) => {
        BandTagsRel.belongsTo(models.Bands, { foreignKey: "band_id" });
        BandTagsRel.belongsTo(models.BandTags, { foreignKey: "tag_id" });
    };

    return BandTagsRel;
};

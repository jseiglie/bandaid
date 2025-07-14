module.exports = (sequelize, DataTypes) => {
  const Merchandise = sequelize.define(
    "Merchandise",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      owner: { // The owner of the merchandise should be the user or the band?
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Bands",
          key: "id",
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      timesSold: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "merchandise",
      timestamps: true, 
      freezeTableName: true,
    }
  );

  Merchandise.associate = (models) => {
    Merchandise.belongsTo(models.Bands, { foreignKey: "owner" });
    Merchandise.hasMany(models.CartItems, { foreignKey: "merchandise_id" });
    Merchandise.belongsTo(models.Categories, { foreignKey: "category_id" });
  }

  return Merchandise;
};

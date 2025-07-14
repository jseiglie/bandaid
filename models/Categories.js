module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define(
    "Categories",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "categories",
      timestamps: true,
      freezeTableName: true,
    }
  );
  Categories.associate = (models) => {
    Categories.hasMany(models.Merchandise, { foreignKey: "category_id" });
  };
  return Categories;
};

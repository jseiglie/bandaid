module.exports = (sequelize, DataTypes) => {
  const Lives = sequelize.define(
    "Lives",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      date_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      venue: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      tickets_link: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      promoted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    },
    {
      tableName: "Lives",
      timeStamp: true,
      freezeTableName: true,
    }
  );

  Lives.associate = function (models) {
    Lives.belongsTo(models.Bands, {
      foreignKey: "band_id",
      onDelete: "CASCADE",
    });
    Lives.belongsTo(models.SetLists, {
      foreignKey: "setlist_id",
      onDelete: "CASCADE",
    });
  };

  return Lives;
};

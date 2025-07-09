module.exports = (sequelize, DataTypes) => {
  const BandDefaultSchedules = sequelize.define(
    "BandDefaultSchedules",
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
        references: {
          model: "Bands", // debe coincidir con el nombre exacto de la tabla
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      local_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "rehearsal_locals",
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
      location: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      day: {
        type: DataTypes.ENUM(
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ),
        allowNull: false,
      },
      start_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    },
    {
      tableName: "BandDefaultSchedules",
      freezeTableName: true,
      timestamps: true,
    }
  );

  BandDefaultSchedules.associate = (models) => {
    BandDefaultSchedules.belongsTo(models.Bands, {
      foreignKey: "band_id",
    });
    BandDefaultSchedules.belongsTo(models.Rehearsal_Locals, {
      foreignKey: "local_id",
    });
  };

  return BandDefaultSchedules;
};

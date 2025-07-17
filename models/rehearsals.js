module.exports = (sequelize, DataTypes) => {
  const Rehearsals = sequelize.define(
    "Rehearsals",
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
          model: "Bands",
          key: "id",
        },
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      local_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "rehearsal_locals",
          key: "id",
        },
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    },
    {
      tableName: "rehearsals",
      timestamps: true,
      freezeTableName: true,
      underscored: true, 
    }
  );
  Rehearsals.associate = (models) => {
    Rehearsals.belongsTo(models.Bands, {
      foreignKey: "band_id",
      as: "band",
    });
    Rehearsals.belongsTo(models.Rehearsal_Locals, {
      foreignKey: "local_id",
      as: "local",
    });
  };
  return Rehearsals;
};

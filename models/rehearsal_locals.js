module.exports = (sequelize, DataTypes) => {
  const Rehearsal_Locals = sequelize.define(
    "Rehearsal_Locals",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(80),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zip_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "rehearsal_locals",
      timestamps: true,
      freezeTableName: true,
    }
  );
  Rehearsal_Locals.associate = (models) => {
    Rehearsal_Locals.hasMany(models.Rehearsals, {
      foreignKey: "local_id",
      as: "rehearsals",
    });
  };
  return Rehearsal_Locals;
};

module.exports = (sequelize, DataTypes) => {
  const TokenBlackList = sequelize.define(
    "TokenBlackList",
    {
      token: {
        type: DataTypes.STRING(500),
        allowNull: false,
        unique: true,
      },
      expiration: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      tableName: "TokenBlackList",
      timestamps: true,
      freezeTableName: true,
    }
  );
  return TokenBlackList;
}
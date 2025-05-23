const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(120),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM,
        values: ["user", "admin"],
        defaultValue: "user",
      },
      avatar: {
        type: DataTypes.TEXT(),
        defaultValue:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffreepngimg.com%2Fthumb%2Fband%2F26223-1-band-photos.png&f=1&nofb=1&ipt=4d20faa39f989336905b6721f7dba99b693a340d1df470aed77958d3f02a72ef",
      },
    },
    {
      tableName: "Users",
      timeStamp: true,
      freezeTableName: true,
    }
  );

  Users.associate = function (models) {
    Users.belongsToMany(models.Bands, {
      through: "UserBands",
      foreignKey: "user_id",
      onDelete: "CASCADE",
    });
  };

  // existing username and email check
  Users.beforeCreate(async (user) => {
    //check if email is registered
    const existingUser = await Users.findOne({ where: { email: user.email } });
    const existingUsername = await Users.findOne({
      where: { username: user.username },
    });
    if (existingUser) {
      throw new Error("Email already registered");
    }
    if (existingUsername) {
      throw new Error("Username already registered");
    }
  });
  
  Users.prototype.toJSON = function () {
    const user = this.get();
    delete user.password;
    return user;
  };

  return Users;
};

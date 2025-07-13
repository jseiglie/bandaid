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
      avatar: {
        type: DataTypes.TEXT(),
        defaultValue:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffreepngimg.com%2Fthumb%2Fband%2F26223-1-band-photos.png&f=1&nofb=1&ipt=4d20faa39f989336905b6721f7dba99b693a340d1df470aed77958d3f02a72ef",
      },
      avatar_public_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
      has_subscription: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      active_subscription_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // puede no tener ninguna activa
      },

      // last_login: {
      //   type: DataTypes.DATE,
      //   allowNull: true,
      //   defaultValue: DataTypes.NOW,
      // },
    },
    {
      tableName: "Users",
      timestamps: true,
      freezeTableName: true,
    }
  );

  Users.associate = function (models) {
    Users.hasOne(models.MusicianProfile, {
      foreignKey: "user_id",
      nullable: true,
    });
    Users.hasMany(models.SetLists, { foreignKey: "proposed_by" });
    Users.hasMany(models.Songs, { foreignKey: "proposed_by" });
    Users.hasMany(models.UserSubscriptions, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
    });
    // Users.hasMany(models.BandMembers, { foreignKey: "user_id" });

    // Users.belongsToMany(models.Bands, {
    //   through: "UserBands",
    //   foreignKey: "user_id",
    //   onDelete: "CASCADE",
    // });
  };

  Users.beforeCreate(async (user) => {
    const existingUser = await Users.findOne({ where: { email: user.email } });
    const existingUsername = await Users.findOne({
      where: { username: user.username },
    });

    if (existingUser) throw new Error("Email already registered");
    if (existingUsername) throw new Error("Username already registered");

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });

  Users.beforeUpdate(async (user) => {
    if (user.changed("password")) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  });

  Users.prototype.toJSON = function () {
    const user = this.get();
    delete user.password;
    return user;
  };

  return Users;
};

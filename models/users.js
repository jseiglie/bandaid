module.exports = (sequelize, DataTypes)=>{
    const Users = sequelize.define("Users", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: true,
            unique: true
        },
        email: {
            type: DataTypes.STRING(120),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM,
            values: ['user', 'admin'],
            defaultValue: 'user'
        },
        avatar:{
            type: DataTypes.TEXT(),
            defaultValue: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffreepngimg.com%2Fthumb%2Fband%2F26223-1-band-photos.png&f=1&nofb=1&ipt=4d20faa39f989336905b6721f7dba99b693a340d1df470aed77958d3f02a72ef'
        }
    }, 
    {
        tableName: "Users",
        timeStamp: true,
        freezeTableName: true
    }
    );

    Users.associate = function (models) {
        // Define the relationship between Users and Collections
       // Users.hasMany(models.Collections, { foreignKey: 'user_id' });
        Users.belongsToMany(models.Bands, { through: 'UserBands', foreignKey: 'user_id' });
    };

    return Users
}
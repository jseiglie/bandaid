module.exports = (sequelize, DataTypes)=>{
    const Bands = sequelize.define("Bands", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: true,
            unique: true
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        genre: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        location: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        website: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        logo:{
            type: DataTypes.TEXT(),
            defaultValue: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffreepngimg.com%2Fthumb%2Fband%2F26223-1-band-photos.png&f=1&nofb=1&ipt=4d20faa39f989336905b6721f7dba99b693a340d1df470aed77958d3f02a72ef'
        },
        social_media: {
            type: DataTypes.JSON,
            allowNull: true,
          },
    }, 
    {
        tableName: "Bands",
        timeStamp: true,
        freezeTableName: true
    }
    );

    Bands.associate = function (models) {
        Bands.belongsToMany(models.Users, { through: "UserBands", foreignKey: "band_id", onDelete: "CASCADE" });
      };

    return Bands
}
module.exports = (sequelize, DataTypes)=>{
    const UserBands = sequelize.define("UserBands", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        band_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Bands',
                key: 'id'
            }
        },
    }, 
    {
        tableName: "UserBands",
        timeStamp: true,
        freezeTableName: true
    }
    );

    
    return UserBands
}

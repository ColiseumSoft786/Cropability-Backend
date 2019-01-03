module.exports = (sequelize, type) => {
    return sequelize.define('settings', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        value: type.BOOLEAN        
    })
};

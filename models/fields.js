module.exports = (sequelize, type) => {
    return sequelize.define('fields', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        lat: type.STRING,
        lng: type.STRING,
        description: type.STRING 
    })
};
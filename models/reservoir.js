module.exports = (sequelize, type) => {
    return sequelize.define('reservoir', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        capacity: type.INTEGER,
        unit: type.STRING
    })
};

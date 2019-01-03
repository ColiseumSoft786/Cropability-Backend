module.exports = (sequelize, type) => {
    return sequelize.define('features', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        label: type.STRING,
    })
};

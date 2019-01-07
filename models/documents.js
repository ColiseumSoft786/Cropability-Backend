module.exports = (sequelize, type) => {
    return sequelize.define('documents', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        expiry: type.DATE,
        photo: type.STRING
    })
};

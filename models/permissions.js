module.exports = (sequelize, type) => {
    return sequelize.define('permissions', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        full: type.BOOLEAN,
        read: type.BOOLEAN,
        create: type.BOOLEAN,
        update: type.BOOLEAN,
        delete: type.BOOLEAN,
    })
};

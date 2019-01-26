module.exports = (sequelize, type) => {
    return sequelize.define('area', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        isGrowing: type.BOOLEAN,
        area: type.STRING,
        image: type.STRING,
        unit: type.STRING,
        qrcode: type.STRING
    })
};
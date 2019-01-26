module.exports = (sequelize, type) => {
    return sequelize.define('zone', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        growingMethod: type.STRING,
        boards: type.INTEGER,
        holes: type.INTEGER,
        name: type.STRING,
        isGrowing: type.BOOLEAN,
        area_total: type.STRING,
        image: type.STRING,
        unit: type.STRING,
        qrcode: type.STRING,
        isActive: type.BOOLEAN
    })
};
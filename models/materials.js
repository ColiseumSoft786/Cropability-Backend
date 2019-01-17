module.exports = (sequelize, type) => {
    return sequelize.define('material', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        category: type.STRING,
        quantity: type.INTEGER,
        unit: type.STRING,
        producer: type.STRING,
        country: type.STRING,
        note: type.STRING,
        expiry: type.DATE,
        germinationRate: type.STRING,
        image: type.STRING,
        type: type.STRING,
        price: type.STRING,
        qrcode: type.STRING
    })
};

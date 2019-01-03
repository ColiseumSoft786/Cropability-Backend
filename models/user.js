module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: type.STRING,
        email: type.STRING,
        enabled: type.BOOLEAN,
        password: type.STRING,
        fullname: type.STRING,
        phone: type.STRING,
        position: type.STRING,
        photo: type.STRING,
        joining_date: type.DATE,
        salary: type.STRING,
        cnic: type.STRING
    })
};

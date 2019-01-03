const Sequelize = require('sequelize');
const UserModel = require('./models/user');
const RoleModel = require('./models/role');
const SettingModel = require('./models/settings');
const FeaturesModel = require('./models/features');
const PermissionsModel = require('./models/permissions');



const sequelize = new Sequelize('cropability', 'root', 'root1234', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const User = UserModel(sequelize, Sequelize);
const Role = RoleModel(sequelize, Sequelize);
const Setting = SettingModel(sequelize, Sequelize);
const Permission = PermissionsModel(sequelize, Sequelize);
const Features = FeaturesModel(sequelize, Sequelize);


// User and Role
User.belongsTo(Role);
Role.hasMany(User, {foreignKey: 'roleId', sourceKey: 'id'});
// Permissions and Role
Permission.belongsTo(Role);
Role.hasMany(Permission, {foreignKey: 'roleId', sourceKey: 'id'});
// Permissions and Features
Permission.belongsTo(Features);
Features.hasMany(Permission, {foreignKey: 'featureId', sourceKey: 'id'});



sequelize.sync()
    .then(() => {
        console.log(`Database & tables created!`)
    });
module.exports = {
    User,
    Role,
    Setting,
    Features,
    Permission
};

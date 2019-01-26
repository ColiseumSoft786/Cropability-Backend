const Sequelize = require('sequelize');
const UserModel = require('./models/user');
const RoleModel = require('./models/role');
const SettingModel = require('./models/settings');
const FeaturesModel = require('./models/features');
const PermissionsModel = require('./models/permissions');
const DocumentsModel = require('./models/documents');
const FieldModel = require('./models/fields');
const ReservoirModel = require('./models/reservoir');
const MaterialModel = require('./models/materials');
const AreaModel = require('./models/area');
const ZoneModel = require('./models/zone');

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
const Documents = DocumentsModel(sequelize, Sequelize);
const Field = FieldModel(sequelize, Sequelize);
const Reservoir = ReservoirModel(sequelize, Sequelize);
const Material = MaterialModel(sequelize, Sequelize);
const Area = AreaModel(sequelize, Sequelize);
const Zone = ZoneModel(sequelize, Sequelize);

// User and Role
User.belongsTo(Role);
Role.hasMany(User, {foreignKey: 'roleId', sourceKey: 'id'});
// Permissions and Role
Permission.belongsTo(Role);
Role.hasMany(Permission, {foreignKey: 'roleId', sourceKey: 'id'});
// Permissions and Features
Permission.belongsTo(Features);
Features.hasMany(Permission, {foreignKey: 'featureId', sourceKey: 'id'});
// Documents and User
Documents.belongsTo(User);
User.hasMany(Documents, {foreignKey: 'userId', sourceKey: 'id'});
// Reservior and Field
Reservoir.belongsTo(Field);
Field.hasMany(Reservoir, {foreignKey: 'fieldId', sourceKey: 'id'});
// Area and Field
Area.belongsTo(Field);
Field.hasMany(Area, {foreignKey: 'fieldId', sourceKey: 'id'});
// Area and User
Area.belongsTo(User);
User.hasMany(Area, {foreignKey: 'userId', sourceKey: 'id'});
// Zone and User
Zone.belongsTo(User);
User.hasMany(Zone, {foreignKey: 'userId', sourceKey: 'id'});
// Zone and Reservoir
Zone.belongsTo(Reservoir);
Reservoir.hasMany(Zone, {foreignKey: 'reservoirId', sourceKey: 'id'});
// Zone and Field
Zone.belongsTo(Field);
Field.hasMany(Zone, {foreignKey: 'fieldId', sourceKey: 'id'});
// Zone and Field
Zone.belongsTo(Area);
Area.hasMany(Zone, {foreignKey: 'areaId', sourceKey: 'id'});

// sequelize.sync({ alter: true })
//     .then(() => {
//         console.log(`Database & tables created!`)
//     });
module.exports = {
    User,
    Role,
    Setting,
    Features,
    Permission,
    Documents,
    Field,
    Reservoir,
    Material,
    Area,
    Zone
};

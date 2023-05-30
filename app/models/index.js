const dbConfig = require("/Fuentes/Node.js/FideCliente/config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
host: dbConfig.HOST,
dialect: dbConfig.dialect,
operatorsAliases: false,
pool: {
max: dbConfig.pool.max,
min: dbConfig.pool.min,
acquire: dbConfig.pool.acquire,
idle: dbConfig.pool.idle
}
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Ventas = require("./venta.model.js")(sequelize, Sequelize);
db.Cliente = require("./cliente.model.js")(sequelize, Sequelize);
db.Puntos_uso = require("./puntos_uso_admin.model.js")(sequelize, Sequelize);
db.Puntos_asignacion = require("./puntos_asignacion.model.js")(sequelize, Sequelize);
db.Puntos_vencimiento = require("./puntos_vencimiento.model.js")(sequelize, Sequelize);
db.Puntos_bolsa = require("./puntos_bolsa.model.js")(sequelize, Sequelize);
db.Cabecera = require("./cabecera_model.js")(sequelize, Sequelize);
db.Detalle = require("./detalle_model.js")(sequelize, Sequelize);

db.Cliente.hasMany(db.Puntos_bolsa, {as: 'puntos_bolsa'});
db.Puntos_bolsa.belongsTo(db.Cliente, {
    foreignKey: "id",
    as: "cliente_id",
});

db.Cabecera.hasMany(db.Detalle, {as: 'detalle'});
db.Detalle.belongsTo(db.Cabecera, {
    foreignKey: "id",
    as: "cabecera_id",
});

db.Puntos_bolsa.hasMany(db.Detalle, {as: 'bolsa_detalle'});
db.Detalle.belongsTo(db.Puntos_bolsa, {
    foreignKey: "id",
    as: "bolsa_id",
});

db.Cliente.hasMany(db.Cabecera, {as: 'cabecera'});
db.Cabecera.belongsTo(db.Cliente, {
    foreignKey: "id",
    as: "cliente_id",
});

module.exports = db;
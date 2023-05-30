module.exports = (sequelize, Sequelize) => {
    const Puntos_Bolsa = sequelize.define("PuntosBolsa", {
    id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
    },
    fecha_asignacion: {
    type: Sequelize.DATE
    },
    fecha_caducidad: {
    type: Sequelize.DATE
    },
    punto_asignado: {
    type: Sequelize.INTEGER
    },
    punto_utilizado: {
    type: Sequelize.INTEGER
    },
    punto_saldo: {
    type: Sequelize.INTEGER
    },
    monto_operacion: {
    type: Sequelize.INTEGER
    },
    });
    return Puntos_Bolsa;
};
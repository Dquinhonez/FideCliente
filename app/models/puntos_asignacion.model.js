module.exports = (sequelize, Sequelize) => {
    const Puntos_asignacion = sequelize.define("PuntosAsignacion", {
    id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
    },
    limite_inferior: {
    type: Sequelize.INTEGER
    },
    limite_superior: {
    type: Sequelize.INTEGER
    },
    monto_punto_equivalencia: {
    type: Sequelize.INTEGER
    },
    punto_equivalencia: {
    type: Sequelize.INTEGER
    }
    });
    return Puntos_asignacion;
};
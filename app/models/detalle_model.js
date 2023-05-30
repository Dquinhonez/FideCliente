module.exports = (sequelize, Sequelize) => {
    const Detalle = sequelize.define("Detalle", {
    id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
    },
    puntaje_utilizado: {
    type: Sequelize.INTEGER
    }
    });
    return Detalle;
};
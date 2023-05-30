module.exports = (sequelize, Sequelize) => {
    const Cabecera = sequelize.define("Cabecera", {
    id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
    },
    fecha_utilizacion: {
    type: Sequelize.DATE
    },
    concepto_uso: {
    type: Sequelize.STRING
    }
    });
    return Cabecera;
};
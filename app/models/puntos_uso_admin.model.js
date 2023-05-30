module.exports = (sequelize, Sequelize) => {
    const Puntos_uso = sequelize.define("PuntosUso", {
    id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
    },
    concepto_uso: {
    type: Sequelize.STRING
    },
    puntos_requeridos: {
    type: Sequelize.INTEGER
    }
    });
    return Puntos_uso;
};


module.exports = (sequelize, Sequelize) => {
    const Puntos_vencimiento = sequelize.define("PuntosVencimiento", {
    id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
    },
    fecha_inicio_validez: {
    type: Sequelize.DATE
    },
    fecha_fin_validez: {
    type: Sequelize.DATE
    },
    dias_duracion: {
    type: Sequelize.INTEGER
    },
    dia_especial: {
        type: Sequelize.BOOLEAN
        },
    });
    return Puntos_vencimiento;
};

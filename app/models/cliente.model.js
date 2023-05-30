module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define("Cliente", {
    id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
    },
    nombre: {
    type: Sequelize.STRING
    },
    apellido: {
    type: Sequelize.STRING
    },
    nro_documento: {
    type: Sequelize.STRING
    },
    tipo_documento: {
    type: Sequelize.STRING
    },
    email: {
    type: Sequelize.STRING
    },
    nacionalidad: {
    type: Sequelize.STRING
    },
    telefono: {
    type: Sequelize.STRING
    },
    fecha_nacimiento: {
    type: Sequelize.DATE
    }
    });
    return Cliente;
    };
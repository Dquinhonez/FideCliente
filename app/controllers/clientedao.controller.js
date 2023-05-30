const db = require("../models");
const Cliente = db.Cliente;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
// Validate request
if (!req.body.nombre || !req.body.apellido || !req.body.nro_documento || !req.body.tipo_documento
    || !req.body.email || !req.body.nacionalidad || !req.body.telefono || !req.body.fecha_nacimiento) {
res.status(400).send({
message: "Envie todos los campos requeridos"
});
return;
}
// crea una cliente
const cliente = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    nro_documento: req.body.nro_documento,
    tipo_documento: req.body.tipo_documento,
    email: req.body.email,
    nacionalidad: req.body.nacionalidad,
    telefono: req.body.telefono,
    fecha_nacimiento: req.body.fecha_nacimiento,
};
// Guardamos a la base de datos
Cliente.create(cliente)
.then(data => {
res.send(data);
})
.catch(err => {
res.status(500).send({
message:
err.message || "Ha ocurrido un error al crear un cliente."
});
});
};

// Obtenemos todos los clientes
exports.findAll = (req, res) => {
    const nro_documento = req.params.nro_documento;
    var condition = nro_documento ? { nro_documento: { [Op.like]: `%${nro_documento}%` } } : null;
    Cliente.findAll({ where: condition })
    .then(data => {
    res.send(data);
    })
    .catch(err => {
    res.status(500).send({
    message:
    err.message || "Ocurrio un error al obtener los clientes."
    });
    });
    };

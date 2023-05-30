module.exports = app => {
    const cliente = require("../controllers/clientedao.controller");
    var router = require("express").Router();
    router.post("/", cliente.create);
    router.get("/obtenerClientes/", cliente.findAll);
    router.get("/obtenerClientes/:nro_documento", cliente.findAll);
    app.use('/api/cliente', router);
    };
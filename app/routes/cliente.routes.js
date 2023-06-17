module.exports = app => {
    const cliente = require("../controllers/clientedao.controller");
    var router = require("express").Router();
    router.post("/add", cliente.create);
    router.get("/obtenerClientes/", cliente.findAll);
    router.get("/obtenerClientes/:nro_documento", cliente.findAll);
    router.get("/obtenerClientesByaprox", cliente.getClienteByAprox);
    app.use('/api/cliente', router);
    };
module.exports = app => {
    const puntos = require("../controllers/puntos.controller");
    var router = require("express").Router();
    router.post("/create_concepto_uso", puntos.createConceptoUso);
    router.post("/create_punto_asignacion", puntos.createPuntoAsignacion);
    router.post("/create_punto_vencimiento", puntos.createPuntoVencimiento);
    router.post("/add_punto_bolsa", puntos.createPuntoBolsa);
    router.post("/debitar_puntos", puntos.debitarPuntos);
    router.get("/get_regla_venc", puntos.getReglaVencimientos);
    router.get("/get_uso_puntos", puntos.getUsoDePuntos);
    router.get("/get_all_puntos", puntos.getAllPuntosCliente);
    router.get("/get_xpuntos_byMonto/:monto", puntos.Xmonto);
    router.get("/get_concepto_uso", puntos.findAll);
    router.get("/get_punto_asignacion", puntos.obtenerPuntoAsignacion);
    app.use('/api/puntos', router);
    };
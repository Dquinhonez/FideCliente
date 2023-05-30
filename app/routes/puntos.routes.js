module.exports = app => {
    const puntos = require("../controllers/puntos.controller");
    var router = require("express").Router();
    router.post("/create_concepto_uso", puntos.createConceptoUso);
    router.post("/create_punto_asignacion", puntos.createPuntoAsignacion);
    router.post("/create_punto_vencimiento", puntos.createPuntoVencimiento);
    router.post("/add_punto_bolsa", puntos.createPuntoBolsa);
    router.post("/debitar_puntos", puntos.debitarPuntos);
    router.get("/get_uso_puntos", puntos.getUsoDePuntos);
    app.use('/api/puntos', router);
    };
const db = require("../models");
const Puntos_uso = db.Puntos_uso;
const Puntos_asignacion = db.Puntos_asignacion;
const Puntos_vencimiento = db.Puntos_vencimiento;
const Puntos_bolsa = db.Puntos_bolsa;
const Cabecera = db.Cabecera;
const Detalle = db.Detalle;
const Op = db.Sequelize.Op;

// uso de puntos por: concepto de uso, fecha de uso, cliente 
exports.consultaUsoPuntos = (req, res) => {

}

//bolsa de puntos por: cliente, rango de puntos
exports.consultaBolsaPuntos = (req, res) => {

}

// crea un concepto de uso y cantidad de puntos requerido
exports.createConceptoUso = (req, res) => {
    
    const puntos_uso = {
        concepto_uso: req.body.concepto_uso,
        puntos_requeridos: req.body.puntos_requeridos,
    };
    console.log(puntos_uso);
    // Guardamos a la base de datos
    Puntos_uso.create(puntos_uso)
    .then(data => {
    res.send(data);
    })
    .catch(err => {
    res.status(500).send({  
    message:
    err.message || "Ha ocurrido un error al crear un concepto de uso de puntos."
    });
    });
};

// Obtenemos todos los conceptos de uso
exports.findAll = (req, res) => {
    var condition = null;
    Puntos_uso.findAll({})
    .then(data => {
    res.send(data);
    })
    .catch(err => {
    res.status(500).send({
    message:
    err.message || "Ocurrio un error al obtener los conceptos de uso de puntos."
    });
    });
};

// crea parametro de asignacion de puntos
exports.createPuntoAsignacion = (req, res) => {
    // crea un concepto de uso y cantidad de puntos requerido
    const puntos_asignacion = {
        limite_inferior: req.body.limite_inferior,
        limite_superior: req.body.limite_superior,
        monto_punto_equivalencia: req.body.monto_punto_equivalencia
    };
    // Guardamos a la base de datos
    Puntos_asignacion.create(puntos_asignacion)
    .then(data => {
    res.send(data);
    })
    .catch(err => {
    res.status(500).send({  
    message:
    err.message || "Ha ocurrido un error al crear una asignacion de puntos."
    });
    });
};

//crea vencimiento de puntos
exports.createPuntoVencimiento = (req, res) => {
    // crea un concepto de uso y cantidad de puntos requerido
    let date_1 = new Date(req.body.fecha_inicio_validez);
    let date_2 = new Date(req.body.fecha_fin_validez);

    const days = (date_1, date_2) =>{
        let difference = date_1.getTime() - date_2.getTime();
        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
        return TotalDays;
    }

    const puntos_vencimiento = {
        fecha_inicio_validez: date_1,
        fecha_fin_validez: date_2,
        dias_duracion: days(date_2,date_1)
    };

    // Guardamos a la base de datos
    Puntos_vencimiento.create(puntos_vencimiento)
    .then(data => {
    res.send(data);
    })
    .catch(err => {
    res.status(500).send({  
    message:
    err.message || "Ha ocurrido un error al crear vencimiento de puntos."
    });
    });
};

// Agregar puntos a la Bolsa
exports.createPuntoBolsa = async (req, res) => {
    let cliente_id = req.body.idCliente;
    let fecha_caducidad = req.body.fecha_caducidad;
    let monto_Operacion = req.body.monto;
    let total_punto_asignar = 0;
    let asignar_punto = false;
    let query = 'select * from public."PuntosAsignacions"';

    const { QueryTypes } = require('sequelize');
    const range = await db.sequelize.query(query, { type: QueryTypes.SELECT });
    range.forEach(function(row) { 
        if((monto_Operacion >= row.limite_inferior && monto_Operacion <= row.limite_superior) || monto_Operacion > row.limite_superior ){
            total_punto_asignar = Math.trunc(monto_Operacion / row.monto_punto_equivalencia);
            asignar_punto = true;
        }
    });
    
    if(asignar_punto){
        const puntos = {
            fecha_asignacion: GetCurrentDate(),
            fecha_caducidad: fecha_caducidad,
            punto_asignado: total_punto_asignar,
            punto_utilizado: 0,
            punto_saldo: total_punto_asignar,
            monto_operacion: monto_Operacion,
            ClienteId: cliente_id
        };
        console.log(puntos);
        Puntos_bolsa.create(puntos).then(data => {
            res.send(data);
            })
            .catch(err => {
            res.status(500).send({  
            message:
            err.message || "Ha ocurrido un error al crear asignacion de puntos."
            });
        });
    }
    else{
        res.send("No se generaron puntos..");
    }
};

//Utilizar puntos
exports.debitarPuntos = async (req, res) => {
    let cliente_id = req.body.idCliente;
    let concepto_uso = req.body.concepto_uso;
    let puntos_cliente = 0;
    const { QueryTypes } = require('sequelize');
    let query = 'select * from public."PuntosBolsas" where "ClienteId" = :client_id order by "fecha_asignacion", "id" asc';

    const bolsa_cliente = await db.sequelize.query(query, { 
        replacements: { client_id: cliente_id },
        type: QueryTypes.SELECT 
    });
    bolsa_cliente.forEach(function(row) { 
        puntos_cliente = puntos_cliente + row['punto_saldo'];
    });
    console.log(puntos_cliente);

    query = 'select puntos_requeridos, concepto_uso from public."PuntosUsos" where "id" = :concepto_uso';
    const puntos_requeridos = await db.sequelize.query(query, { 
        replacements: { concepto_uso: concepto_uso },
        type: QueryTypes.SELECT 
    });

    let punto_debitado = 0;
    let punto_utilizado = 0;
    let punto_saldo = 0;
    let punto_faltante = puntos_requeridos[0]["puntos_requeridos"];

    query = 'update public."PuntosBolsas" set punto_saldo = :punto_saldo, punto_utilizado = :punto_utilizado where id = :id';
    let query1 = 'insert into public."Cabeceras" (fecha_utilizacion, concepto_uso, "ClienteId") values (:fecha_utilizacion, :concepto_uso, :clienteId) RETURNING id';
    let query2 = 'insert into public."Detalles"(puntaje_utilizado, "CabeceraId", "PuntosBolsaId") values (:puntaje_utilizado, :CabeceraId, :PuntosBolsaId)';
    
    if(puntos_cliente >= puntos_requeridos[0]["puntos_requeridos"]){
        //Inserto la cabecera del uso de puntos
        const insert_cabecera = await db.sequelize.query(query1, { 
            replacements: { fecha_utilizacion: GetCurrentDate(),  concepto_uso: puntos_requeridos[0]["concepto_uso"], clienteId: cliente_id},
            type: QueryTypes.INSERT,
        });
        var cabecera_id = insert_cabecera[0][0]['id'];
        for (const row of bolsa_cliente) {
            if(row['punto_saldo'] == 0) continue;
            if(punto_debitado == puntos_requeridos[0]["puntos_requeridos"]) break;
            if(row['punto_saldo'] <= punto_faltante){
                punto_debitado = punto_debitado + row['punto_saldo'];
                punto_faltante = punto_faltante - row['punto_saldo'];
                punto_saldo = 0;
                punto_utilizado = row['punto_saldo'];
            }
            else{
                punto_utilizado = punto_faltante;
                punto_debitado = punto_debitado + punto_utilizado;
                punto_saldo = row['punto_saldo'] - punto_utilizado;
            }
            //Actualizo punto dentro las bolsas
            await db.sequelize.query(query, { 
                replacements: { punto_saldo: punto_saldo,  punto_utilizado: punto_utilizado, id: row['id']},
                type: QueryTypes.UPDATE 
            });
            //Inserto detalles del uso de puntos
            await db.sequelize.query(query2, { 
                replacements: { puntaje_utilizado: punto_utilizado,  CabeceraId: cabecera_id, PuntosBolsaId: row['id']},
                type: QueryTypes.INSERT 
            });
        }
        res.send("Si cuenta con suficientes puntos");
    }
    else{
        res.send("No cuenta con suficientes puntos");
    }

    
}

//uso de puntos por: concepto de uso, fecha de uso, cliente 
exports.getUsoDePuntos = async (req, res) =>{
    let concepto_uso = req.body.concepto_uso;
    let fecha_uso = req.body.fecha_uso;
    let cliente_id = req.body.cliente_id;
    console.log(cliente_id);
    let query = ' select d.puntaje_utilizado, c.concepto_uso, c.fecha_utilizacion FROM public."Detalles" d ' +
                'inner join public."Cabeceras" c on d."CabeceraId" = c.id where c."ClienteId" = :cliente_id and ' +
                'c.concepto_uso = :concepto_uso and c.fecha_utilizacion = :fecha_uso';
    console.log(query);
    const { QueryTypes } = require('sequelize');
    const usoDePuntos = await db.sequelize.query(query, {
        replacements: {cliente_id: cliente_id, concepto_uso: concepto_uso, fecha_uso: fecha_uso}, 
        type: QueryTypes.SELECT 
    });

    res.send(usoDePuntos);

}

function GetCurrentDate(){
    let date_time = new Date();
    let date = ("0" + date_time.getDate()).slice(-2);
    let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
    let year = date_time.getFullYear();
    return year + "-" + month + "-" + date;
}

function UpdateVencimientoPuntos(){
    const { QueryTypes } = require('sequelize');
    let query = 'select * from public."PuntosBolsas" order by "fecha_caducidad" asc';

    const bolsa_venc = db.sequelize.query(query, { 
        type: QueryTypes.SELECT 
    });

    query = '';
    bolsa_venc.forEach(function(row) { 
        puntos_cliente = puntos_cliente + row['punto_saldo'];
    });
}

const schedule = require('node-schedule');
const job = schedule.scheduleJob('1 * * * * *', function(){
    console.log(GetCurrentDate());
});
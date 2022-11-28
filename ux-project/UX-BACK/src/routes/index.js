const {Router} = require('express');
const router = Router();

const {
conexion,
getUsuario,
getCuentas,
getCuenta,
/*
getAbonos,
getCargos,
*/
getContactos,
postContacto,
deleteContacto,
postTransferencia,
getBancos,
getAllCuentas
} = require('../controllers/index.controllers.js');


router.get('/conexion',conexion);

//Login
router.get('/usuario/:correo', getUsuario); //Información del usuario a partir de un correo
router.get('/bancos',getBancos);
router.get('/cuentas', getAllCuentas);
//Account
router.get('/cuentas/:id', getCuentas);//Cuentas asociadas a partir un id
router.get('/cuenta/:ncta', getCuenta); //Obtener detalle cuenta a partir del n_cuenta
router.get('/miscuentas');

//Record
/*
router.get('/abono/:idcta', getAbonos); //Abonos asociados a partir de un n_cuenta
router.get('/cargo/:idcta', getCargos); //Cargos asociados a partir de un n_cuenta
*/
//Contacts
router.get('/contactos/:id', getContactos); //Información contactos asociados a partir de un RUT
router.delete('/contacto/:id', deleteContacto); //Eliminar un contacto asociado a un RUT

router.post('/contacto/:rut', postContacto); //Asociar un contacto a un RUT


//Transfer
router.post('/transferir/', postTransferencia); //Realizar transferencia a partir de una cuenta

module.exports = router;
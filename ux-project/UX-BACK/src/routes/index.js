const {Router} = require('express');
const router = Router();

const {
conexion,
getUsuario,
getCuentas,
getCuenta,
getAbonos,
getCargos,
getContactos,
postContacto,
deleteContacto,
postTransferencia
} = require('../controllers/index.controllers.js');


router.get('/conexion',conexion);

//Login
router.get('/usuario/:correo', getUsuario); //Información del usuario a partir de un correo

//Account
router.get('/cuentas/:id', getCuentas);//Cuentas asociadas a partir un id
router.get('/cuenta/:ncta', getCuenta); //Obtener detalle cuenta a partir del n_cuenta

//Record
router.get('/abono/:ncta', getAbonos); //Abonos asociados a partir de un n_cuenta
router.get('/cargo/:ncta', getCargos); //Cargos asociados a partir de un n_cuenta

//Contacts
router.get('/contactos/:rut', getContactos); //Información contactos asociados a partir de un RUT
router.post('/contacto/:rut', postContacto); //Asociar un contacto a un RUT
router.delete('/contacto/:rut', deleteContacto); //Eliminar un contacto asociado a un RUT

//Transfer
router.post('/transferir/:n_cuenta', postTransferencia); //Realizar transferencia a partir de una cuenta

module.exports = router;
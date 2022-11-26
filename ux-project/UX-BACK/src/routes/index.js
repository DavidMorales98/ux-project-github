const {Router} = require('express');
const router = Router();

const {
conexion,
getUsuario,
getCuentas,
getAbonos,
getCargos,
getContactos,
postContacto,
deleteContacto,
postTransferencia
} = require('../controllers/index.controllers.js');


router.get('/conexion',conexion);

//Login
router.get('/usuario/:rut', getUsuario); //Información del usuario a partir de un RUT

//Account
router.get('/cuentas/:rut', getCuentas);//Cuentas asociadas a partir un RUT

//Record
router.get('/abono/:cta', getAbonos); //Abonos asociados a partir de un n_cuenta
router.get('/cargo/:cta', getCargos); //Cargos asociados a partir de un n_cuenta

//Contacts
router.get('/contactos/:rut', getContactos); //Información contactos asociados a partir de un RUT
router.post('/contacto/:rut', postContacto); //Asociar un contacto a un RUT
router.delete('/contacto/:rut', deleteContacto); //Eliminar un contacto asociado a un RUT

//Transfer
router.post('/transferir/:n_cuenta', postTransferencia); //Realizar transferencia a partir de una cuenta

module.exports = router;
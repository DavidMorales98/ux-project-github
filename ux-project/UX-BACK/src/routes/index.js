const {Router} = require('express');
const router = Router();

const {
conexion,
getUsuario,
getCuentas,
getAbonos,
getCargos,
getContactosInfo,
getContactos
} = require('../controllers/index.controllers.js');


router.get('/conexion',conexion);

//Login
router.get('/usuario/:rut', getUsuario); //Información del usuario a partir de un RUT

//Account
router.get('/cuentas/:rut', getCuentas) //Cuentas asociadas a partir un RUT

//Record
router.get('/abono/:cta', getAbonos) //Abonos asociados a partir de un n_cuenta
router.get('/cargo/:cta', getCargos) //Cargos asociados a partir de un n_cuenta

//Transfer
//Contacts
router.get('/contactos/:rut', getContactos) //Información contactos asociados a partir de un RUT
router.post('/contactos/:rut', postContactos) //Asociar un contacto a un RUT



module.exports = router;
const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ux-local',
    password: '1234',
    port: 5433
});

const conexion = (req, res) => {
    res.send('Conexión a la base de datos exitosa!');
};

const getUsuario = async (req, res) => {
    const response = await pool.query('SELECT * from t_usuario\
        WHERE correo = $1', [req.params.correo]);
    res.json(response.rows[0]);
};
const getUsuarios = async (req, res) => {
    const response = await pool.query('SELECT * from t_usuario');
    res.json(response.rows);
};

const getCuentas = async (req, res) => {
    const response = await pool.query('SELECT id, n_cuenta, tipo_cuenta, saldo  FROM t_cuenta\
    WHERE id_usuario = $1', [req.params.id]);
    res.json(response.rows);
};

const getCuenta = async (req, res) =>{
    const response = await pool.query('SELECT * from t_cuenta where n_cuenta = $1', [req.params.ncta]);
  
    res.json(response.rows[0]);
};
/*
const getAbonos = async (req, res) => {
    const response = await pool.query('SELECT DISTINCT tr.id, bn.nombre, tr.id_cuenta_origen, ct.tipo_cuenta, us.nombre, tr.monto \
    FROM t_cuenta as ct, t_transferencia as tr, t_usuario as us, t_banco as bn\
    WHERE tr.id_cuenta_destino = $1 and ct.id = tr.id_cuenta_origen and us.id = ct.id_usuario and bn.id = ct.id_banco', [req.params.idcta]);
    res.json(response.rows);
};

const getCargos = async (req, res) => {
    const response = await pool.query('SELECT DISTINCT tr.id, bn.nombre, tr.id_cuenta_destino, ct.tipo_cuenta, us.nombre, tr.monto\
        FROM t_cuenta as ct, t_transferencia as tr, t_usuario as us, t_banco as bn\
        WHERE tr.id_cuenta_origen = $1\
        and ct.id = tr.id_cuenta_destino\
        and us.id = ct.id_usuario \
        and bn.id = ct.id_banco', [req.params.idcta]);
    res.json(response.rows);
};
*/
const getContactos = async (req, res) => {
    const response = await pool.query('select CC.id as id_cuenta, C.id, U.rut as rutContacto,U.nombre, CC.n_cuenta as nCuenta, CC.tipo_cuenta as tipoCuenta, B.nombre as nombreBanco\
    from t_contacto C, t_cuenta CC, t_banco B, t_usuario U\
    where C.id_usuario1 = $1 and C.id_cuenta = CC.id and CC.id_banco = B.id and C.id_usuario2 = U.id', [req.params.id]);
    res.json(response.rows);
};
const getAllCuentas = async (req, res) =>{
    const response = await pool.query('select id,n_cuenta from t_cuenta');
    res.json(response.rows);
};
const postContacto = async (req, res) => {
    const rut = req.params.rut;
    const { rut_usuario2, n_cuenta } = req.body.params;
    const response = await pool.query('INSERT INTO t_contactos\
    (rut_usuario1, rut_usuario2, n_cuenta)\
    VALUES ($1, $2, $3)',
        rut, rut_usuario2, n_cuenta);
    res.send('Contacto añadido!');
};

const deleteContacto = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('delete\
    from t_contacto\
    where id = $1',[id]);
    res.send('Contacto eliminado correctamente!')
};

const postTransferencia = async (req, res) => {
    const { monto, comentario,id_cuenta_origen, id_cuenta_destino, saldo, n_cuenta } = req.body;
    var hoy = new Date();
    var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    if (id_cuenta_destino != 0){
        const response = await pool.query('insert into t_transferencia\
        (monto,comentario,fecha,hora,id_cuenta_origen,id_cuenta_destino)\
        values ($1,$2,$3,$4,$5,$6)',[monto, comentario, fecha, hora, id_cuenta_origen, id_cuenta_destino]);
        const response2 = await pool.query('update t_cuenta set saldo = $1 where id = $2',[saldo,id_cuenta_origen]);
        const response3 = await pool.query('update t_cuenta set saldo = (select (select saldo + $1) as nuevoSaldo from t_cuenta where id=$2) where id= $2',
        [monto,id_cuenta_destino]);
    }
    else{
        const response = await pool.query('insert into t_transferencia\
        (monto,comentario,fecha,hora,id_cuenta_origen,id_cuenta_destino)\
        values ($1,$2,$3,$4,$5,(select id from t_cuenta where n_cuenta=$6))',[monto, comentario, fecha, hora, id_cuenta_origen, n_cuenta]);
        const response2 = await pool.query('update t_cuenta set saldo = $1 where id = $2',[saldo,id_cuenta_origen]);
        const response3 = await pool.query('update t_cuenta set saldo = (select (select saldo + $1) as nuevoSaldo from t_cuenta where id=(select id from t_cuenta where n_cuenta=$2)) where id= (select id from t_cuenta where n_cuenta=$2)',
        [monto,n_cuenta]);
    }
    res.send('Transferencia realizada con exito!')
};

const getBancos = async (req, res) =>{
    const response = await pool.query('select * from t_banco');
    res.json(response.rows);
};
module.exports = {
    conexion,
    getUsuario,
    getCuentas,
    getCuenta,
    getUsuarios,
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
}



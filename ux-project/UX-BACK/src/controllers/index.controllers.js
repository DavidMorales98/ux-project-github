const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: '170.79.232.136',
    database: 'ux',
    password: '1234',
    port: 5432
});

const conexion = (req, res) =>{
    res.send();
};

const getUsuario = async (req, res) =>{
    const response = await pool.query('SELECT * from t_usuario\
        WHERE rut = $1', [req.params.rut]);
    res.send().json(response.rows);
};

const getCuentas = async (req, res) =>{
    const response = await pool.query('SELECT C.n_cuenta, C.tipo_cuenta, C.saldo, B.nombre FROM t_cuenta C, t_banco B\
        WHERE C.rut_usuario = $1\
        and C.id_banco = B.id',[req.params.rut]);
    res.send().json(response.rows);
};

const getAbonos = async (req, res) =>{
    const response = await pool.query('SELECT DISTINCT tr.n_operacion, bn.nombre, tr.n_cuenta_origen, ct.tipo_cuenta, us.nombre, "ABONO" as tipo, tr.monto FROM t_cuenta as ct, t_transferencia as tr, t_usuario as us, t_banco as bn\
        WHERE tr.n_cuenta_destino = $1\
        and ct.n_cuenta = tr.n_cuenta_origen \
        and us.rut = ct.rut_usuario\
        and bn.id = ct.id_banco',[req.params.rut]);
    res.send().json(response.rows);
};

const getCargos = async (req, res) =>{
    const response = await pool.query('SELECT DISTINCT tr.n_operacion, bn.nombre, tr.n_cuenta_destino, ct.tipo_cuenta, us.nombre, "CARGO" as tipo, tr.monto\
        FROM t_cuenta as ct, t_transferencia as tr, t_usuario as us, t_banco as bn\
        WHERE tr.n_cuenta_origen = $1\
        and ct.n_cuenta = tr.n_cuenta_destino\
        and us.rut = ct.rut_usuario \
        and bn.id = ct.id_banco',[req.params.rut]);
    res.send().json(response.rows);
};

const getContactos = async (req, res) =>{
    const response = await pool.query('select U.rut, U.nombre, C.n_cuenta, CC.tipo_cuenta, CC.saldo, B.nombre\
        from t_contacto C, t_usuario U, t_cuenta CC, t_banco B\
        where C.rut_usuario1 = $1\
        and C.rut_usuario2 = U.rut\
        and C.n_cuenta = CC.n_cuenta\
        and CC.id_banco = B.id',[req.params.rut]);
    res.send().json(response.rows);
};

const postContacto = async (req, res) =>{
    const rut = req.params.rut;
    const {rut_usuario2, n_cuenta}  = req.body.params;
    const response = await pool.query('INSERT INTO t_contactos\
    (rut_usuario1, rut_usuario2, n_cuenta)\
    VALUES ($1, $2, $3)',
    rut,rut_usuario2,n_cuenta)
    res.send('Contacto añadido');
};

module.exports = {
    conexion,
    getUsuario,
    getCuentas,
    getAbonos,
    getCargos,
    getContactos,
    postContacto
}
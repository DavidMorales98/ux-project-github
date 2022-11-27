const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: '170.79.232.136',
    database: 'ux',
    password: '1234',
    port: 5432
});

const conexion = (req, res) => {
    res.send('Conexión a la base de datos exitosa!');
};

const getUsuario = async (req, res) => {
    const response = await pool.query('SELECT * from t_usuario\
        WHERE correo = $1', [req.params.correo]);
    res.json(response.rows[0]);
};

const getCuentas = async (req, res) => {
    const response = await pool.query('SELECT n_cuenta, tipo_cuenta, saldo  FROM t_cuenta\
    WHERE id_usuario = $1', [req.params.id]);
    res.json(response.rows);
};

const getCuenta = async (req, res) =>{
    const response = await pool.query('SELECT * from t_cuenta where n_cuenta = $1', [req.params.ncta]);
    res.json(response.rows[0]);
}

const getAbonos = async (req, res) => {
    const response = await pool.query('SELECT DISTINCT tr.n_operacion, bn.nombre, tr.id_cuenta_origen, ct.tipo_cuenta, us.nombre, tr.monto \
    FROM t_cuenta as ct, t_transferencia as tr, t_usuario as us, t_banco as bn\
    WHERE tr.id_cuenta_destino = $1 and ct.id = tr.id_cuenta_origen and us.id = ct.id_usuario and bn.id = ct.id_banco', [req.params.ncta]);
    res.json(response.rows);
};

const getCargos = async (req, res) => {
    const response = await pool.query('SELECT DISTINCT tr.n_operacion, bn.nombre, tr.id_cuenta_destino, ct.tipo_cuenta, us.nombre, tr.monto\
        FROM t_cuenta as ct, t_transferencia as tr, t_usuario as us, t_banco as bn\
        WHERE tr.id_cuenta_origen = $1\
        and ct.id = tr.id_cuenta_destino\
        and us.id = ct.id_usuario \
        and bn.id = ct.id_banco', [req.params.ncta]);
    res.json(response.rows);
};

const getContactos = async (req, res) => {
    const response = await pool.query('select U.rut, U.nombre, C.n_cuenta, CC.tipo_cuenta, CC.saldo, B.nombre\
        from t_contacto C, t_usuario U, t_cuenta CC, t_banco B\
        where C.rut_usuario1 = $1\
        and C.rut_usuario2 = U.rut\
        and C.n_cuenta = CC.n_cuenta\
        and CC.id_banco = B.id', [req.params.rut]);
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
    const rut = req.params.rut;
    const { rut_usuario2, n_cuenta } = req.body.params;
    const response = await pool.query('delete\
    from t_contacto\
    where rut_usuario1 = $1\
    and rut_usuario2 = $2\
    and n_cuenta = $3',
        rut, rut_usuario2, n_cuenta);
    res.send('Contacto eliminado correctamente!')
};

const postTransferencia = async (req, res) => {
    const cuenta = req.params.cta;
    const { monto, comentario, n_cuenta_destino } = req.body.params;
    var hoy = new Date();
    var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    const response = await pool.query('insert into t_transferencia\
    values ($1,$2,$3,$4,$5,$6)',
        monto, comentario, fecha, hora, cuenta, n_cuenta_destino);
    res.send('Transferencia realizada con exito!')
};
module.exports = {
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
}



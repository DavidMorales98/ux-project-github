<template>
    <div class="body-account">
        <div class="nav-account">
            <input type="checkbox" id="check">
            <label for="check" class="checkbtn">
                <i class="fi fi-rr-menu-burger"></i>
            </label>
            <img src="../assets/image-removebg-preview_2.png" alt="">
            <h1 class="title-nav">{{ nombre_usuario }}</h1>
            <ul>
                <li class="list btn-navbar">
                    <a href="/account">
                        <i class="fi fi-rr-users"></i>
                        Cambiar cuenta</a>
                </li>
                <li class="list active btn-navbar">
                    <a href="#">
                        <i class="fi fi-rr-clipboard-list"></i>
                        Historial</a>
                </li>
                <li class="list btn-navbar">
                    <a href="/transfer">
                        <i class="fi fi-rr-usd-circle"></i>
                        Transferencias</a>
                </li>
                <li id="msg-mantenimiento" class="btn-navbar" @click.prevent="mantencion()">
                    <a href="#">
                        <i class="fi fi-rr-credit-card"></i>
                        Facturas</a>
                </li>
                <li id="msg-mantenimiento1" class="btn-navbar" @click.prevent="mantencion()">
                    <a href="#">
                        <i class="fi fi-rr-file-invoice-dollar"></i>
                        Servicios</a>
                </li>
                <li class="btn-navbar">
                    <a href="/login" @click.prevent="logout()">
                        <i class="fi fi-rr-exit"></i>
                        Cerrar sesión</a>
                </li>
            </ul>
        </div>
        <div class="section-table">
            <div class="section-text">
                <h2>Tipo cuenta: {{ cuenta.tipo_cuenta }} </h2>
                <hr>
                <h2 id="js-ncuenta1">N° cuenta: {{ cuenta.n_cuenta }}</h2>
                <hr>
                <h2 id="js-saldo1">Saldo: $ {{ cuenta.saldo }}</h2>
            </div>
            <h2 class="title-table">Historial de cargos</h2>
            <div class="table-wrapper">
                <div class="container-table table-scroll">
                    <table>
                        <thead>
                            <tr>
                                <th>N° Operacion</th>
                                <th>Nombre</th>
                                <th>Tipo cuenta</th>
                                <th>Numero cuenta</th>
                                <th>Tipo</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Monto</th>
                            </tr>
                        </thead>
                        <tbody v-for="(cargo, id) in cargos" :key="id">
                            <td>{{cargo.id}}</td>
                            <td>{{cargo.nombre}}</td>
                            <td>{{cargo.tipo_cuenta}}</td>
                            <td>{{cargo.n_cuenta}}</td>
                            <td>CARGO</td>
                            <td>{{cargo.fecha}}</td>
                            <td>{{cargo.hora}}</td>
                            <td><span>+$ </span>{{cargo.monto}}</td>
                        </tbody>
                    </table>
                </div>
            </div>
            <h2 class="title-table">Historial de abonos</h2>
            <div class="table-wrapper"></div>
            <div class="container-table table-scroll">
                <table>
                    <thead>
                        <tr>
                            <th>N° Operacion</th>
                            <th>Nombre</th>
                            <th>Tipo cuenta</th>
                            <th>Numero cuenta</th>
                            <th>Tipo</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Monto</th>
                        </tr>
                    </thead>
                    <tbody v-for="(abono, id) in abonos" :key="id">
                        <td>{{abono.id}}</td>
                        <td>{{abono.nombre}}</td>
                        <td>{{abono.tipo_cuenta}}</td>
                        <td>{{abono.n_cuenta}}</td>
                        <td>ABONO</td>
                        <td>{{abono.fecha}}</td>
                        <td>{{abono.hora}}</td>
                        <td><span>+$ </span>{{abono.monto}}</td>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>


<script>
import Swal from 'sweetalert2/dist/sweetalert2.js';
import axios from 'axios';
export default {
    data: () => ({
        n_cuenta: null,
        cuenta: {},
        nombre_usuario: "",
        abonos: {},
        cargos: {}

    }),
    methods: {
        obtenerLocalStorage() {
            this.n_cuenta = localStorage.getItem("n_cuenta_st")
            this.nombre_usuario = localStorage.getItem("nombre_st_usuario")
            this.id_usuario = localStorage.getItem("id_st_usuario")
            this.id_cuenta = localStorage.getItem("id_cuenta_st")
        },
        mantencion() {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Lo sentimos, sitio en mantención',
            })
        },
        async limpiarLS() {
            await localStorage.clear();
        },
        async logout() {
            Swal.fire({
                title: '¿Desea cerrar sesión?',
                text: "Para volver a entrar deberá iniciar sesión nuevamente",
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, cerrar sesión!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Cerrando sesión',
                        'Vuelve pronto!',
                        'success'
                    )
                    this.limpiarLS();
                    window.location.href = "/"
                }
            })
        }
    },
    async mounted() {
        await this.obtenerLocalStorage();
        await axios
            .get("http://localhost:3000/cuenta/" + this.n_cuenta)
            .then((result) => {
                this.cuenta = result.data;
                this.tipo_cuenta = this.cuenta.tipo_cuenta;
            }).catch(e => {
                console.log(e);
            });
        await axios
            .get("http://localhost:3000/abono/" + this.id_cuenta)
            .then((result) => {
                this.abono = result.data;
            }).catch(e => {
                console.log(e);
            });
        await axios
            .get("http://localhost:3000/cargo/" + this.cuenta)
            .then((result) => {
                this.cargos = result.data;
            }).catch(e => {
                console.log(e);
            });
    }

}
</script>

<style>
.section-table {
    color: #fff
}

.table-wrapper {
    position: relative;
}

.table-scroll {
    height: 250px;
    overflow: auto;
    margin-top: 20px;
}

.container-table {
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    margin-left: 15%;
}

table {
    margin-top: 10px;
    border: 1px solid var(--color2);
    color: #333;
    font-size: 14px;
    table-layout: fixed;
    border-collapse: collapse;
    border-radius: 5px 5px 0 0;
    overflow-x: auto;
    box-shadow: 0 0 20px rgb(0, 0, 0, 0.3);
    background-color: #fff;
    margin-left: 80px;
    height: 250px;

}

.title-table {
    text-decoration: underline #6d9886;
    margin-bottom: -40px;
    margin-left: 300px;
    margin-top: 50px;
}

.compPago h1 {
    color: var(--color-text2);
    text-align: center;
}

thead {
    background: var(--color2);
}

th {
    padding: 20px 15px;
    font-weight: 700;
    text-transform: uppercase;
    color: #fff;
}

td {
    padding: 15px;
    border-bottom: 1px solid var(--color2);
    text-align: center;
}

tbody tr:hover {
    background-color: var(--color3);
}
</style>
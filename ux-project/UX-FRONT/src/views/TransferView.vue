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
                <li class="list btn-navbar">
                    <a href="/record">
                        <i class="fi fi-rr-clipboard-list"></i>
                        Historial</a>
                </li>
                <li class="list active btn-navbar">
                    <a href="#">
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
                <h2 id="js-ncuenta1"> N° cuenta: {{ cuenta.n_cuenta }}</h2>
                <hr>
                <h2 id="js-saldo1">Saldo: $ {{ cuenta.saldo }}</h2>
            </div>
        </div>
        <div class="section-transfer">
            <div class="section-contact">
                <h1 class="ts">Mis contactos<span class="espacio">________</span><i class="fi fi-rr-user-add"
                        @click.prevent="modal1()"></i></h1>
                <div class="container-section-contact">
                    <a href="#" v-for="(contacto, id) in contactos" :key="id"
                        @click.prevent="eliminarContacto(contacto.id)">
                        <div class="account-content">
                            <div class="account-info1">
                                <h2>{{ contacto.nombre }}</h2>
                                <hr>
                                <h2> {{ contacto.rutcontacto }}</h2>
                            </div>
                            <div class="account-info2">
                                <h2>{{ contacto.tipocuenta }}</h2>
                                <hr>
                                <h2> {{ contacto.ncuenta }}</h2>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <div class="section-transfer-option">
                <h1 class="ts">Realizar transferencia</h1>
                <div class="container-section-trans">
                    <div class="container1">
                        <div class="input-box1">
                            <input class="input-1" id="my-account" value="Mis cuentas DS Bank"
                                @click.prevent="modal2()" />
                        </div>
                    </div>
                    <div class="container2">
                        <div class="input-box2">
                            <input class="input-2" type="button" id="my-contact" value="Mis contactos"
                                @click.prevent="modal3()" />
                        </div>
                    </div>
                    <div class="container3">
                        <div class="input-box3">
                            <input class="input-3" type="button" id="new-contact" value="Nuevo contacto"
                                @click.prevent="modal4()" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="modal1" class="modal-container1">
            <div class="modal-content1">
                <div id="formularioNC">
                    <div class="sub">
                        <h2>Nuevo contacto</h2>
                    </div>
                    <label>Nombre y apellido</label>
                    <input type="text" id="nombre" name="nombre" required=""
                        placeholder="Indique el nombre y apellido" />
                    <label>RUT</label>
                    <input type="text" id="rut" name="nombre" required=""
                        placeholder="Indique RUT sin puntos ni digito verificador" minlength="11111111"
                        max="999999999" />
                    <label>Correo</label>
                    <input type="email" id="name" name="nombre" required="" placeholder="Indique correo electrónico" />
                    <label>Banco</label>
                    <select>
                        <option selected disabled>Indique el banco</option>
                        <option name="" id="banco" v-for="banco in bancos" :key="banco.id">{{ banco.nombre }}</option>
                    </select>
                    <label>Tipo de cuenta</label>
                    <select>
                        <option selected disabled>Indique el tipo de cuenta</option>
                        <option>Cuenta de ahorro</option>
                        <option>Cuenta corriente</option>
                        <option>Cuenta vista</option>
                    </select>
                    <label>Numero de cuenta</label>
                    <input type="number" id="ncuenta" name="nombre" required=""
                        placeholder="Indique el numero de cuenta" />
                    <div class="input-box1">
                        <input class="input-1" type="button" id="msg-info-mail" value="Añadir contacto"
                            @click.prevent="contactoAdd()" />
                        <input class="input-1 cancel" type="button" id="msg-info-mail" value="Cancelar"
                            @click.prevent="cancelarAdd()" />
                    </div>
                </div>
            </div>
        </div>
        <div id="modal2" class="modal-container1">
            <div class="modal-content1">
                <div id="formularioNC">
                    <div class="sub">
                        <h2>Transferir a mis cuentas</h2>
                    </div>
                    <label>Cuenta</label>
                    <select v-model="selected2" placeholder="Indique la cuenta">
                        <option disabled value="">Indique la cuenta</option>
                        <option v-for="cuenta in miscuentas" :value="cuenta.id" :key="cuenta.id">
                            {{ cuenta.n_cuenta }} - {{ cuenta.tipo_cuenta }}
                        </option>
                    </select>
                    <label>Monto ($)</label>
                    <input type="number" id="monto2" name="monto" required="" placeholder="Ingrese el monto" />
                    <div class="input-box1">

                        <input class="input-1" type="button" id="msg-info-mail" value="Transferir"
                            @click.prevent="transferenciaMC(selected2)" />
                        <input class="input-1 cancel" type="button" id="msg-info-mail" value="Cancelar"
                            @click.prevent="cancelarTransf()" />
                    </div>
                </div>
            </div>
        </div>
        <div id="modal3" class="modal-container1">
            <div class="modal-content1">
                <div id="formularioNC">
                    <div class="sub">
                        <h2>Transferir a mis contactos</h2>
                    </div>
                    <label>Contacto</label>
                    <select v-model="selected3" placeholder="Indique un contacto">
                        <option disabled value="">Indique un contacto</option>
                        <option v-for="contacto in contactos" :key="contacto.id" :value="contacto.id_cuenta">
                            {{ contacto.ncuenta }} - {{ contacto.nombre }}</option>
                    </select>
                    <label>Monto ($)</label>
                    <input type="number" id="monto3" name="monto" required="" placeholder="Ingrese el monto" />
                    <div class="input-box1">
                        <input class="input-1" type="button" id="msg-info-mail" value="Transferir"
                            @click.prevent="transferenciaMCont(selected3)">
                        <input class="input-1 cancel" type="button" id="msg-info-mail" value="Cancelar"
                            @click.prevent="cancelarTransf2()">
                    </div>
                </div>
            </div>
        </div>
        <div id="modal4" class="modal-container1">
            <div class="modal-content1">
                <div id="formularioNC">
                    <div class="sub">
                        <h2>Nuevo contacto</h2>
                    </div>
                    <label>Nombre y apellido</label>
                    <input type="text" id="nombre4" name="nombre" required=""
                        placeholder="Indique el nombre y apellido" />
                    <label>RUT</label>
                    <input type="number" id="rut4" name="nombre" required=""
                        placeholder="Indique RUT sin puntos ni digito verificador" minlength="11111111"
                        max="999999999" />
                    <label>Correo</label>
                    <input type="email" id="email4" name="nombre" required=""
                        placeholder="Indique correo electrónico" />
                    <label>Banco</label>
                    <select v-model="selectedBank2" placeholder="Indique un banco">
                        <option value="" disabled>Indique el banco</option>
                        <option v-for="banco in bancos" :key="banco.id" :value="banco.id">{{ banco.nombre }}</option>
                    </select>

                    <label>Tipo de cuenta</label>
                    <select>
                        <option selected disabled>Indique el tipo de cuenta</option>
                        <option>Cuenta de ahorro</option>
                        <option>Cuenta corriente</option>
                        <option>Cuenta vista</option>
                    </select>
                    <label>Numero de cuenta</label>
                    <input type="number" id="ncuenta4" name="nombre" required=""
                        placeholder="Indique el numero de cuenta" />
                    <label>Monto ($)</label>
                    <input type="number" id="monto4" name="monto" required="" placeholder="Ingrese el monto" />
                    <div class="input-box1">
                        <input class="input-1" type="button" id="msg-info-mail" value="Transferir"
                            @click.prevent="transferenciaNCont(selectedBank2)">
                        <input class="input-1 cancel" type="button" id="msg-info-mail" value="Cancelar"
                            @click.prevent="cancelarTransf3()">
                    </div>
                </div>
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
        bancos: {},
        nombre_usuario: "",
        id_usuario: null,
        contactos: null,
        miscuentas: null,
        selected2: '',
        selected3: '',
        todook: '',
        dialog: false,
        saldo: 0,
        selectedBank2: '',
        ctasSistema: []


    }),
    methods: {
        modal1() {
            let modal = document.getElementById('modal1');
            if (modal.style.visibility == "visible") {
                modal.style.visibility = "hidden";
            }
            else {
                modal.style.visibility = "visible";
            }
        },
        modal2() {
            let modal = document.getElementById('modal2');
            if (modal.style.visibility == "visible") {
                modal.style.visibility = "hidden";
            }
            else {
                modal.style.visibility = "visible";
            }
        },
        modal3() {
            let modal = document.getElementById('modal3');
            if (modal.style.visibility == "visible") {
                modal.style.visibility = "hidden";
            }
            else {
                modal.style.visibility = "visible";
            }
        },
        modal4() {
            let modal = document.getElementById('modal4');
            if (modal.style.visibility == "visible") {
                modal.style.visibility = "hidden";
            }
            else {
                modal.style.visibility = "visible";
            }
        },
        obtenerLocalStorage() {
            this.n_cuenta = localStorage.getItem("n_cuenta_st")
            this.nombre_usuario = localStorage.getItem("nombre_st_usuario")
            this.id_usuario = localStorage.getItem("id_st_usuario")
            this.id_cuenta = localStorage.getItem("id_cuenta_st")
        },
        guardarLocalStorage() {
            localStorage.setItem("saldo_cuenta_st", this.saldo);
        },
        async guardar() {
            await this.guardarLocalStorage();
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
        },

        async deleteContacto(id) {
            await axios
                .delete("http://localhost:3000/contacto/" + id)
                .then((result) => {
                    console.log(result.data);
                }).catch(e => {
                    console.log(e);
                });
        },
        async eliminarContacto(id) {
            Swal.fire({
                title: '¿Desea eliminar este contacto?',
                text: "Se eliminará esta persona de sus contactos",
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Eliminar contacto',
                        text: 'Contacto eliminado!',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.deleteContacto(id);
                            location.reload()
                        }
                    })
                }
            })
        },
        cancelarAdd() {
            Swal.fire({
                title: '¿Desea cancelar añadir al contacto?',
                text: "Si cancela perderá el avance del proceso",
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, no añadir!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Añadir contacto',
                        'Cancelado!',
                        'success'
                    )
                    this.modal1();
                }
            })
        },
        contactoAdd() {
            var rut = document.getElementById('rut').value;
            var banco = document.getElementById('banco').selected;
            var tcuenta = document.getElementById('tcuenta').value;
            var ncuenta = document.getElementById('ncuenta').selected;
            if (rut == "" || banco == "" || tcuenta == "" || ncuenta == "") {
                Swal.fire({
                    title: 'Confirmación',
                    text: "¿Confirma que los datos son correctos?",
                    icon: 'warning',
                    showCancelButton: true,
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, añadir contacto!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire(
                            'Añadir contacto',
                            'Nuevo contacto añadido!',
                            'success'
                        )
                        console.log(banco + rut + tcuenta + ncuenta)
                        this.modal1();
                    }
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Todos los campos RUT, BANCO, TIPO DE CUENTA Y NUMERO DE CUENTA son obligatorios!',
                })
            }
        },

        cancelarTransf() {
            Swal.fire({
                title: '¿Desea cancelar la transferencia?',
                text: "Si cancela perderá el avance del proceso",
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, cancelar transferencia!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Cancelando',
                        'Transferencia cancelada!',
                        'success'
                    )
                    this.modal2();
                }
            })
        },
        async transferenciaMC(id_cuenta) {
            await this.obtenerLocalStorage();
            var monto = document.getElementById('monto2').value
            if (id_cuenta == "" || monto == "") {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Todos los campos son obligatorios!',
                })
            }
            else {
                if (monto > this.saldo) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No cuenta con saldo suficiente para la transferencia!',
                    })
                }
                else {
                    await Swal.fire({
                        icon: 'success',
                        title: '¡Transferencia realizada!',
                        showConfirmButton: false,
                        timer: 1700,
                    })
                    var nuevoMonto = this.saldo - monto
                    let payload = {
                        monto: monto,
                        comentario: "",
                        id_cuenta_origen: this.id_cuenta,
                        id_cuenta_destino: id_cuenta,
                        saldo: nuevoMonto
                    }
                    await axios
                        .post("http://localhost:3000/transferir/", payload)
                        .then((result) => {
                            this.took = result.data;
                            console.log(this.took)
                            this.dialog = false;

                        }).catch(e => {
                            console.log(e);
                        });
                    location.reload();
                    localStorage.setItem("saldo_cuenta_st", nuevoMonto);
                    window.location.href = "/transfer";

                }
            }

        },

        cancelarTransf2() {
            Swal.fire({
                title: '¿Desea cancelar la transferencia',
                text: "Si cancela perderá el avance del proceso",
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, cancelar transferencia!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Cancelando',
                        'Transferencia cancelada!',
                        'success'
                    )
                    this.modal3();
                }
            })
        },
        async transferenciaMCont(id_cuenta) {
            await this.obtenerLocalStorage();
            var monto = document.getElementById('monto3').value
            if (id_cuenta == "" || monto == "") {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Todos los campos son obligatorios!',
                })
            }
            else {
                if (monto > this.saldo) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No cuenta con saldo suficiente para la transferencia!',
                    })
                }
                else {
                    await Swal.fire({
                        icon: 'success',
                        title: '¡Transferencia realizada!',
                        showConfirmButton: false,
                        timer: 1700,
                    })
                    var nuevoMonto = this.saldo - monto
                    let payload = {
                        monto: monto,
                        comentario: "",
                        id_cuenta_origen: this.id_cuenta,
                        id_cuenta_destino: id_cuenta,
                        saldo: nuevoMonto
                    }
                    await axios
                        .post("http://localhost:3000/transferir/", payload)
                        .then((result) => {
                            this.took = result.data;
                            console.log(this.took)
                            this.dialog = false;

                        }).catch(e => {
                            console.log(e);
                        });
                    location.reload();
                    localStorage.setItem("saldo_cuenta_st", nuevoMonto);
                    window.location.href = "/transfer";

                }
            }
        },

        cancelarTransf3() {
            Swal.fire({
                title: '¿Desea cancelar la transferencia',
                text: "Si cancela perderá el avance del proceso",
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, cancelar transferencia!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Cancelando',
                        'Transferencia cancelada!',
                        'success'
                    )
                    this.modal4();
                }
            })
        },
        async transferenciaNCont(id_bank) {
            var monto = document.getElementById('monto4').value
            var n_cuenta = document.getElementById('ncuenta4').value
            if (monto == "") {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Todos los campos son obligatorios!',
                })
            }
            else {
                if (monto > this.cuenta.saldo) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No cuenta con saldo suficiente para la transferencia!',
                    })
                }
                else {
                    var nuevoMonto = this.saldo - monto
                    if (id_bank == 1) {

                        if (this.ctasSistema.find(cta => cta.n_cuenta == n_cuenta)) {
                            await Swal.fire({
                                icon: 'success',
                                title: '¡Transferencia realizada!',
                                showConfirmButton: false,
                                timer: 1700,
                            })

                            let payload = {
                                monto: monto,
                                comentario: "",
                                id_cuenta_origen: this.id_cuenta,
                                id_cuenta_destino: 0,
                                saldo: nuevoMonto,
                                n_cuenta: n_cuenta
                            }
                            await axios
                                .post("http://localhost:3000/transferir/", payload)
                                .then((result) => {
                                    this.took = result.data;
                                    console.log(this.took)
                                    this.dialog = false;

                                }).catch(e => {
                                    console.log(e);
                                });
                            location.reload();
                            localStorage.setItem("saldo_cuenta_st", nuevoMonto);
                            window.location.href = "/transfer";
                        }
                        else {
                            await Swal.fire({
                                icon: 'success',
                                title: '¡Transferencia realizada!',
                                showConfirmButton: false,
                                timer: 1700,
                            })
                            let payload = {
                                monto: monto,
                                comentario: "",
                                id_cuenta_origen: this.id_cuenta,
                                id_cuenta_destino: 9,
                                saldo: nuevoMonto,
                            }
                            await axios
                                .post("http://localhost:3000/transferir/", payload)
                                .then((result) => {
                                    this.took = result.data;
                                    console.log(this.took)
                                    this.dialog = false;

                                }).catch(e => {
                                    console.log(e);
                                });
                            location.reload();
                            localStorage.setItem("saldo_cuenta_st", nuevoMonto);
                            window.location.href = "/transfer";
                        }
                    }
                    else {
                        await Swal.fire({
                            icon: 'success',
                            title: '¡Transferencia realizada!',
                            showConfirmButton: false,
                            timer: 1700,
                        })
                        let payload = {
                            monto: monto,
                            comentario: "",
                            id_cuenta_origen: this.id_cuenta,
                            id_cuenta_destino: 9,
                            saldo: nuevoMonto,
                        }
                        await axios
                            .post("http://localhost:3000/transferir/", payload)
                            .then((result) => {
                                this.took = result.data;
                                console.log(this.took)
                                this.dialog = false;

                            }).catch(e => {
                                console.log(e);
                            });
                        location.reload();
                        localStorage.setItem("saldo_cuenta_st", nuevoMonto);
                        window.location.href = "/transfer";
                    }
                }
            }
        }
    },
    async mounted() {
        await this.obtenerLocalStorage();
        await axios
            .get("http://localhost:3000/cuenta/" + this.n_cuenta)
            .then((result) => {
                this.cuenta = result.data;
                this.tipo_cuenta = this.cuenta.tipo_cuenta;
                this.saldo = this.cuenta.saldo;

            }).catch(e => {
                console.log(e);
            });
        await axios
            .get("http://localhost:3000/contactos/" + this.id_usuario)
            .then((result) => {
                this.contactos = result.data;
            }).catch(e => {
                console.log(e);
            });
        await axios
            .get("http://localhost:3000/cuentas/" + this.id_usuario)
            .then((result) => {
                this.miscuentas = result.data;
                this.miscuentas = this.miscuentas.filter(cuenta => cuenta.n_cuenta != this.n_cuenta);

            }).catch(e => {
                console.log(e);
            });
        await axios
            .get("http://localhost:3000/cuentas")
            .then((result) => {
                this.ctasSistema = result.data;

            }).catch(e => {
                console.log(e);
            });
        await axios
            .get("http://localhost:3000/bancos")
            .then((result) => {
                this.bancos = result.data;
            }).catch(e => {
                console.log(e);
            });
    }

}
</script>

<style>
.section-transfer {
    display: flex;
    flex-direction: row;
    height: 700px;

}

.section-transfer .section-contact {
    background-color: #393e46;
    color: white;
    text-align: justify;
    height: 100%;
    width: 40%;
    padding: 10px;
    margin-right: 5%;
    margin-left: 2%;
    border-radius: 25px;
}

.section-transfer .section-transfer-option {
    background-color: #393e46;
    color: white;
    text-align: justify;
    height: 100%;
    width: 60%;
    padding: 10px;
    margin-bottom: 10px;
    margin-right: 5%;
    border-radius: 25px;
    justify-content: center;
    align-items: center;

}

.container-section-trans {
    height: 80%;
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 2px solid #6d9886;
    margin-right: 25%;
    border-radius: 25px;
    background: #f2e7d5;
    margin-top: 5%;

}

.container-section-contact {
    height: 80%;
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 2px solid #6d9886;
    border-radius: 25px;
    margin-top: 5%;
    background: #f2e7d5;

}

.ts {
    text-decoration: underline #6d9886;
}

.input-box {
    height: 70px;
    width: 100%;
    align-items: center;
    margin: 10px 0;
    position: relative;
    font-size: 24px;
}

.input-box input {
    height: 100%;
    width: 100%;
    outline: none;
    border: none;
    padding: 0 30px;
    font-size: 14px;
    font-weight: 500;
    border-bottom: 2px solid var(--color1);
    transition: all 0.3s ease;

}

.input-box input:focus,
.input-box input:valid {
    border-color: var(--color1);
}

.input-box i {
    position: absolute;
    color: var(--color1);
    font-size: 24px;
    top: 15px;
}

a {
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text1);
    text-decoration: none;
    text-align: center;

}



a:hover {
    text-decoration: underline;
}

.button {
    color: var(--color-text2);
    margin-top: 20px;
    margin-bottom: 20px;
}

.button input {
    color: var(--color-text2);
    background: var(--color1);
    border-radius: 6px;
    padding: 0;
    cursor: pointer;
    transition: all 0.4s ease;
}

.button input:hover {
    background: var(--color4);
    color: var(--color-text1)
}

#close {
    height: 100%;
    width: 100%;
    border-radius: 25px;
    background-color: var(--color1);
    color: var(--color-text2);
    cursor: pointer;
}

#close:hover {
    background: var(--color4);
    color: var(--color-text1)
}

.espacio {
    color: transparent;

}

.fi-rr-user-add {
    cursor: pointer;
    border: solid 2px #fff;
    padding: 5px;
    border-radius: 25%;
    text-decoration: none;
}

.input-box2 {
    height: 60px;
    width: 100%;
    align-items: center;
    margin: 10px 0;
}

.input-2 {
    color: var(--color-text2);
    background: var(--color1);
    border-radius: 6px;
    padding: 0;
    cursor: pointer;
    transition: all 0.4s ease;
    height: 100%;
    width: 100%;
    outline: none;
    border: none;
    padding: 0 30px;
    font-size: 14px;
    font-weight: 500;
    border-bottom: 2px solid var(--color1);
    transition: all 0.3s ease;
    text-align: center;
}

.input-2:hover {
    background: var(--color4);
    color: var(--color-text1)
}

.input-box1 {
    height: 60px;
    width: 100%;
    align-items: center;
    margin: 10px 0;
}

.input-1 {
    color: var(--color-text2);
    background: var(--color1);
    border-radius: 6px;
    padding: 0;
    cursor: pointer;
    transition: all 0.4s ease;
    height: 100%;
    width: 100%;
    outline: none;
    border: none;
    padding: 0 30px;
    font-size: 14px;
    font-weight: 500;
    border-bottom: 2px solid var(--color1);
    transition: all 0.3s ease;
    text-align: center;
}

.input-1:hover {
    background: var(--color4);
    color: var(--color-text1)
}

.input-box3 {
    height: 60px;
    width: 100%;
    align-items: center;
    margin: 10px 0;
}

.input-3 {
    color: var(--color-text2);
    background: var(--color1);
    border-radius: 6px;
    padding: 0;
    cursor: pointer;
    transition: all 0.4s ease;
    height: 100%;
    width: 100%;
    outline: none;
    border: none;
    padding: 0 30px;
    font-size: 14px;
    font-weight: 500;
    border-bottom: 2px solid var(--color1);
    transition: all 0.3s ease;
    text-align: center;
}

.input-3:hover {
    background: var(--color4);
    color: var(--color-text1)
}




.modal-container1 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1;
    visibility: hidden;
}

.modal-content1 {
    width: 500px;
    height: auto;
    padding: 10px;
    border-radius: 25px;
    text-align: center;
    background-color: var(--color-text2);
}

.cancel {
    background-color: transparent;
    border: transparent;
    color: #333;
}

.input-1:hover {
    background: var(--color4);
    color: var(--color-text1)
}

#formularioNC {
    margin-top: 40px;
    border-radius: 15px;
    margin: 0 auto;
    width: 400px;

    padding: 14px;
    background: var(--color-text2);
}

#formularioNC input,
#formularioNC select,
#formularioNC option {
    float: left;
    font-size: 12px;
    padding: 2px 2px;
    border: slid 0px #708090;
    width: 200px;
    height: 40px;
    margin: 2px 10px 8px;
    border: 4px solid var(--color-text1);
    width: 100%;
    height: 60px;
}

#formularioNC label {
    display: block;
    font-weight: bold;
    text-align: right;
    width: 130px;
    float: left;
    padding: 3px;
    text-align: center;
}
</style>
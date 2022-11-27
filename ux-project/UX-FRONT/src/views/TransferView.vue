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
                <h1 class="ts">Mis contactos</h1>
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
                    <div class="button input-box">
                        <div class="button input-box">
                            <i class="fi fi-sr-envelope"></i>
                            <a>
                                <input type="button" id="my-account" value="Mis cuentas DS Bank" @click="modal()" />
                            </a>
                        </div>
                    </div>
                    <div class="button input-box">
                        <div class="button input-box">
                            <i class="fi fi-sr-envelope"></i>
                            <a>
                                <input type="button" id="my-contact" value="Mis contactos" @click="modal2()" />
                            </a>
                        </div>
                    </div>
                    <div class="button input-box">
                        <div class="button input-box">
                            <i class="fi fi-sr-envelope"></i>
                            <a>
                                <input type="button" id="new-contact" value="Nuevo contacto"
                                    @click.prevent="modal3()" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="modal" class="modal-container">
            <h2>Mis cuentas DS Bank</h2>
            <div class="modal-content">
                <div class="sub1">
                    <h2>Mis cuentas DS Bank</h2>
                </div>
                <select class="select-transf">
                    <option class="option" selected disabled>Seleccione su cuenta DS Bank</option>
                    <option class="option" id="MiCta" v-for="(cuenta, id) in miscuentas" :key="id">{{ cuenta.n_cuenta }} -
                        {{ cuenta.tipo_cuenta }}</option>
                </select>
                <h2>Monto</h2>
                <input class="monto-trans" type="text" id="monto1" name="monto" required=""
                    placeholder="Indique el monto a transferir" />

                <div class="button input-box1 modal-acept1">
                    <input class=".form-input" type="button" value="Aceptar" id="transfMC"
                        @click.prevent="transferenciaMC()" />
                    <input class=".form-input" type="button" value="Cancelar" id="transfMC"
                        @click.prevent="cancelarTransf()" />
                </div>
            </div>
        </div>
        <div id="modal2" class="modal-container2">
            <div class="modal-content">
                <div class="sub">
                    <h2>Mis contactos</h2>
                </div>
                <select class="select-transf">
                    <option class="option-transf" selected disabled>Seleccione un contacto</option>
                    <option class="option-transf" v-for="(contacto, id) in contactos" :key="id">{{ contacto.ncuenta }} -
                        {{ contacto.nombre }}</option>
                </select>
                <h2>Monto</h2>
                <input class="monto-trans" type="text" id="monto2" name="monto" required=""
                    placeholder="Indique el monto de transferencia" />

                <div class="button input-box1 modal-acept2">
                    <input class=".form-input" type="button" value="Aceptar" id="transfMC"
                        @click.prevent="transferenciaMCont()" />
                    <input class=".form-input" type="button" value="Cancelar" id="transfMC"
                        @click.prevent="cancelarTransf2()" />
                </div>
            </div>
        </div>
        <div id="modal3" class="modal-container3">
            <div class="modal-content3">
                <div class="" id="formulario3">
                    <div class="sub">
                        <h2>Nuevo contacto</h2>
                    </div>
                    <label>Nombre y apellido</label>
                    <input class="form-input" type="text" id="nombre3" name="nombre" required=""
                        placeholder="Indique el nombre y apellido" />
                    <label>RUT</label>
                    <input class="form-input" type="text" id="rut3" name="nombre" required=""
                        placeholder="Indique RUT sin puntos ni digito verificador" />

                    <label>Correo</label>
                    <input class="form-input" type="email" id="correo3" name="nombre" required=""
                        placeholder="Indique correo electrónico" />
                    <label>Banco</label>
                    <select class="select-nc">
                        <option class="option-nc" selected disabled>Indique el banco</option>
                        <option class="option-nc" v-for="(banco, id) in bancos" :key="id">{{ banco.nombre }}</option>
                    </select>
                    <label>Tipo de cuenta</label>
                    <select class="select-nc">
                        <option class="option-nc" selected disabled>Indique el tipo de cuenta</option>
                        <option class="option-nc">Cuenta de ahorro</option>
                        <option class="option-nc">Cuenta corriente</option>
                        <option class="option-nc">Cuenta vista</option>
                    </select>
                    <label>Numero de cuenta</label>
                    <input class="form-input" type="number" id="ncuenta3" name="nombre" required=""
                        placeholder="Indique el numero de cuenta" />
                    <label>Monto</label>
                    <input class=".form-input" type="number" id="monto3" name="nombre" required=""
                        placeholder="Indique el monto de transferencia" />
                    <input class=".form-input" type="button" value="Aceptar" id="close"
                        @click.prevent="transferenciaNCont()" />
                    <input class=".form-input" type="button" value="Cancelar" id="close"
                        @click.prevent="cancelarTransf3()" />
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
        miscuentas: null

    }),
    methods: {
        modal() {
            let modal = document.getElementById('modal');
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
        obtenerLocalStorage() {
            this.n_cuenta = localStorage.getItem("n_cuenta_st")
            this.nombre_usuario = localStorage.getItem("nombre_st_usuario")
            this.id_usuario = localStorage.getItem("id_st_usuario")
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
        cancelarTransf() {
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
                    this.modal();
                }
            })
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
                    this.modal2();
                }
            })
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
                    this.modal3();
                }
            })
        },
        transferenciaMC() {
            var monto = document.getElementById('monto1').value
            if (monto > this.cuenta.saldo) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No cuenta con saldo suficiente para la transferencia!',
                })
            }
            else{
                console.log("se pue" )
            }
        },
        transferenciaMCont(){
            var monto = document.getElementById('monto2').value
            if (monto > this.cuenta.saldo) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No cuenta con saldo suficiente para la transferencia!',
                })
            }
            else{
                console.log("se pue" )
            }
        },
        transferenciaNCont(){
            var monto = document.getElementById('monto3').value
            if (monto > this.cuenta.saldo) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No cuenta con saldo suficiente para la transferencia!',
                })
            }
            else{
                console.log("se pue")
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

.input-box1 {
    height: 70px;
    width: 100%;
    align-items: center;
    margin: 10px;
    position: relative;
    font-size: 24px;
    align-items: center;
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

.modal-container2 {
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

.modal-container3 {
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

label {
    display: block;
    font-weight: bold;
    text-align: right;
    width: 130px;
    float: left;
    padding: 3px;
    text-align: center;

}

.modal-content {
    width: 1000px;
    height: auto;
    padding: 10px;
    border-radius: 25px;
    text-align: center;
    background-color: var(--color-text2);
    display: flex;
    align-items: center;
    justify-content: center;

}

.modal-content3 {
    width: 700px;
    height: auto;
    padding: 10px;
    border-radius: 25px;
    text-align: center;
    background-color: var(--color-text2);
}


.modal-content h2 {
    font-size: 25px;
    font-weight: 400px;
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

.modal-container {
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

.select-transf,
.monto-trans {
    border: 4px solid var(--color-text1);
    padding: 5px;
    width: 100%;
    height: 60px;
}

.select-transf,
.option-transf,
.monto-trans {
    font-size: 16px;
}

#formulario3 {
    margin-top: 40px;
    border-radius: 15px;
    margin: 0 auto;
    width: 400px;

    padding: 14px;
    background: var(--color-text2);

}


#formulario3 h2,
.modal-container3 h2 {
    text-decoration: underline var(--color-text1);
}

#formulario3 input,
.select-nc,
.option-nc {
    float: left;
    font-size: 12px;
    padding: 2px 2px;
    border: slid 0px #708090;
    width: 200px;
    height: 40px;
    margin: 2px 10px 8px;

}
</style>
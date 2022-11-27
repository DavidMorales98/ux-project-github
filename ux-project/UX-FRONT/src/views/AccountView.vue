<template >
    <div class="body-account">
        <div class="nav-account">
            <input type="checkbox" id="check">
            <label for="check" class="checkbtn">
                <i class="fi fi-rr-menu-burger"></i>
            </label>
            <img src="../assets/image-removebg-preview_2.png" alt="">
            <ul>
                <li class="list">
                    <a href="/" @click.prevent="logout()">
                        <i class="fi fi-rr-exit"></i>
                        Cerrar sesión</a>
                </li>
            </ul>
        </div>
        <section>
            <div class="section-text">
                <h1>¡Bienvenido!</h1>
                <h1> David Morales</h1>
                <h2>Para continuar seleccione una cuenta.</h2>
            </div>
            <div class="container">
                <a href="/" v-for="(cuenta, id) in cuentas" :key="id" @click.prevent="selectAccount(cuenta.tipo_cuenta,cuenta.n_cuenta,cuenta.saldo)">
                    <div class="account-content">
                        <div class="account-info1">
                            <h2>{{ cuenta.tipo_cuenta }}</h2>
                            <hr>
                            <h2> {{ cuenta.n_cuenta }}</h2>
                        </div>
                        <div class="account-info2">
                            <h2>Saldo disponible </h2>
                            <hr>
                            <h2> {{ cuenta.saldo }}</h2>
                        </div>
                    </div>
                </a>
            </div>
        </section>
    </div>
</template>
<script>
import Swal from 'sweetalert2/dist/sweetalert2.js';
import axios from 'axios';
export default {
    data: () => ({
        cuentas: null,
        id_usuario: null,
        nombre_usuario: "",
    }),
    methods: {
        sleep(milliseconds) {
            var start = new Date().getTime();
            for (var i = 0; i < 1e7; i++) {
                if ((new Date().getTime() - start) > milliseconds) {
                    break;
                }
            }
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
                    this.sleep(3)
                    window.location.href = "/"
                }
            })
        },
        obtenerLocalStorage() {
            //obteniendo rut usuario
            this.id_usuario = localStorage.getItem("id_st_usuario")
            this.nombre_profesor = localStorage.getItem("nombre_st_usuario")
        },

        selectAccount(n_cuenta,tipo_cuenta,saldo) {
            localStorage.setItem("n_cuenta_st", tipo_cuenta);
            localStorage.setItem("tipo_cuenta_st", n_cuenta);
            localStorage.setItem("saldo_cuenta_st", saldo);
            window.location.href = "/record"
        }
    },

    async mounted() {
        this.obtenerLocalStorage();
        await axios
            .get("http://localhost:3000/cuentas/" + this.id_usuario)
            .then((result) => {
                this.cuentas = result.data;
            }).catch(e => {
                console.log(e);
            });
    }
}
</script>
<style>
.body-account {
    background-color: #393e46;
    min-height: 100vh;
}

.nav-account {
    text-decoration: none;
    list-style: none;
    background-color: #F7f7f7;
    height: 100px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.nav-account img {
    height: 100px;
    width: auto;
}

.nav-account ul {
    float: left;
    margin-right: 20px;
}

.nav-account ul li {
    display: inline-block;
    line-height: 30px;
    margin: 0 5px;
    border: 2px solid red;

    color: #333;
    font-size: 17px;
    text-decoration: none;
    padding: 10px 10px;
    border-radius: 50px;
    background-color: #f2e7d5;
    border: 1px solid var(--color-text1);

}

.nav-account ul li a {
    color: var(--color-text1);
    font-size: 17px;
    text-decoration: none;
    padding: 10px 10px;
    border-radius: 50px;
}

.nav-account ul li.active,
.nav-account ul li:hover {
    background-color: #6d9886;
    color: #f7f7f7;
    transition: .5s;

}

.nav-account ul li.active a {
    color: #F7f7f7;
}
.nav-account ul li:hover a{
    color: #F7f7f7;
}
.checkbtn {
    font-size: 30px;
    color: #393e46;
    float: right;
    line-height: 80px;
    margin-right: 40px;
    cursor: pointer;
    display: none;
}

#check {
    display: none;
}


@media (max-width: 1228px) {
    .checkbtn {
        display: block;
        margin-left: 40px;
    }

    ul {
        position: fixed;
        margin-top: 20px;
        width: 100%;
        height: 100vh;
        background-color: hsl(217, 10%, 20%);
        top: 80px;
        left: -100%;
        text-align: center;
        transition: all .5s;
        display: block;
        padding-top: 5%;
    }

    .nav-account ul li {
        display: block;
        border-radius: 0;
        margin: 10px 0px 10px;

    }

    .nav-account ul li {
        align-items: center;
        align-content: center;

    }

    #check:checked~ul {
        left: 0;
    }

}


.section-text {
    text-align: center;
    margin: 5px;
    padding: 10px;
    border: 2px solid #F7f7f7;
    border-radius: 5px;
    background-color: #6d9886;
    color: #fff;

}

.section-text h1 {
    font-size: 50px;
}

.section-text h2 {
    font-size: 28px;
}

section {
    display: block;

}

section .container {
    height: 600px;
    margin-left: 35%;
    width: 700px;

}

.account-content {
    background-color: var(--color-text2);
    border-radius: 25px;
    border: 2px solid var(--color-text1);
    width: 100%;
    height: 120px;
    margin-top: 10px;

    display: flex;
    text-align: center;
    justify-content: space-around;
}

.account-info1 {
    text-align: center;
    align-items: center;
    margin-top: 30px;
    font-size: 13px;
}

.account-info2 {
    text-align: center;
    align-items: center;
    margin-top: 30px;
    font-size: 13px;
}

.container a {
    cursor: pointer;
    text-decoration: none;
    color: var(--color-text1);
}


.account-content:hover {
    background-color: var(--color3);
    color: var(--color-text1);
}

</style>
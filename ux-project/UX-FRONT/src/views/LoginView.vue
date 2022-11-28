<template>
    <div class="body-login">
        <div class="container">
            <div class="img-logo">
                <img src="../assets/image-removebg-preview_2.png" alt="" class="logo-ds">
            </div>
            <hr>
            <br>
            <div class="container-form">
                <h1 class="welcome-text">Bienvenido a nuestra terminal en linea</h1>
                <form action="/account">
                    <div class="login-form">
                        <div class="title">Iniciar sesión</div>
                        <div class="input-boxes">
                            <div class="input-box">
                                <i class="fi fi-rr-envelope"></i>
                                <input class="placeholder form" id="email-user" type="email"
                                    placeholder="Ingrese su email" required>
                            </div>
                            <div class="input-box">
                                <i class="fi fi-rr-lock"></i>
                                <input class="placeholder" id="pswrd" type="password"
                                    placeholder="Ingrese su contraseña" required maxlength="20" minlength="8">
                                <i class="fi fi-rr-eye " id="toggle" @click="show()"></i>
                            </div>
                            <div class="button input-box">
                                <i class="fi fi-sr-envelope"></i>
                                <a>
                                    <input class="form-submit" type="submit" value="Ingresar"
                                        @click.prevent="validacion()">
                                </a>
                            </div>
                            <div class="text"><a href="" @click.prevent="mantencion()">¿Haz olvidado tu contraseña?
                                    <span>Haz click
                                        aquí</span></a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';

export default {
    data: () => ({
        id_usuario: null,
        nombre_usuario: "",

        datos_usuario: null,//json recibido por api rest
        activador: false,
        activador_pass: false
    }),

    methods: {
        show() {
            var pswrd = document.getElementById('pswrd');
            var icon = document.getElementById('toggle');
            if (pswrd.type === "password") {
                pswrd.type = "text";
                icon.classList.add("fi-rr-eye-crossed");
                icon.classList.remove("fi-rr-eye");
            }
            else {
                pswrd.type = "password";
                icon.classList.remove("fi-rr-eye-crossed");
                icon.classList.add("fi-rr-eye");
            }
        },
        validarContrasena() {
            var passField = document.getElementById('pswrd');
            // Expresion regular para validar el correo electronico institucional
            var validPass = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,20}$/g;

            // Using test we can check if the text match the pattern
            if (validPass.test(passField.value)) {
                return true;
            }
            else {
                return false;
            }
        },
        validarCorreo() {
            var emailField = document.getElementById('email-user');
            // Expresion regular para validar el correo electronico institucional
            var validEmail = /(^[a-zA-Z]+)([.])([a-zA-Z]+)([.][a-zA-Z])?@usach([.])cl/g;

            // Using test we can check if the text match the pattern
            if (validEmail.test(emailField.value)) {
                return true;
            }
            else {
                return false;
            }
        },
        guardarLocalStorage() {
            localStorage.setItem("id_st_usuario", this.id_usuario);
            localStorage.setItem("nombre_st_usuario", this.nombre_usuario);
            if (this.id_usuario !== undefined) {
                this.activador = true;
            }
        },
        async guardar() {
            await this.guardarLocalStorage();
        },
        analizarContrasena() {
            let contrasena_ingresada = document.getElementById('pswrd').value
            if (contrasena_ingresada == this.datos_usuario.contrasena) {
                this.activador_pass = true;
            }
        },
        async contrasena() {
            await this.analizarContrasena();
        },
        async existeUsuario() {
            let correo = document.getElementById("email-user").value;
            await axios
                .get("http://localhost:3000/usuario/" + correo)
                .then((result) => {
                    this.result = result.data;
                    this.datos_usuario = this.result;
                    this.id_usuario = this.datos_usuario.id;
                    this.nombre_usuario = this.datos_usuario.nombre;

                })
                .catch(e => {
                    console.log(e);
                });

        },
        async validacion() {
            var correo = document.getElementById('email-user').value;
            var contrasena = document.getElementById('pswrd').value;
            if (correo != "" && contrasena != "") {
                if (this.$options.methods.validarCorreo.bind(this)() == true && this.$options.methods.validarContrasena.bind(this)() == false) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Los campos correo o contraseña son incorrectos!',
                    })
                }
                else if (this.$options.methods.validarCorreo.bind(this)() == false && this.$options.methods.validarContrasena.bind(this)() == true) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Los campos correo o contraseña son incorrectos!',
                    })
                }
                else {
                    if (this.$options.methods.validarCorreo.bind(this)() && this.$options.methods.validarContrasena.bind(this)()) {
                        //revisar si el usuario existe en la base de datos
                        await this.existeUsuario();
                        //se guarda el rut del usuario en el local storage (asi se puede mantener su sesión)
                        await this.guardar();
                        //verificar contraseña
                        await this.contrasena();


                        //verificación variable: activador
                        //si activador es true -> el usuario pertenece a la base de datos,
                        //caso contrario, es una persona no registrada en la plataforma.
                        //CASO credenciales correctas
                        if (this.activador && this.activador_pass) {
                            await Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: '¡Bienvenido(a) nuevamente!',
                                text: this.datos_usuario.nombre,
                                showConfirmButton: false,
                                timer: 1500
                            })
                            window.location.href = "/account";
                            return true;
                        }
                    }
                }
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Los campos correo y contraseña son obligatorios!',
                })
                return false;
            }
        },
        mantencion() {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Lo sentimos, sitio en mantención',
            })
        }
    }
}
</script>

<style>
.body-login{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px;
    background-color: var(--color1);
    min-height: 100vh;
    background-image: url("../assets//5235.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}

.container {
    max-width: 500px;
    width: 100%;
    height: 700px;
    border: 9px solid var(--color2);
    background-color: var(--color-text2);
    padding: 0px 30px 50px;
    box-shadow: 15px 15px 30px rgba(8, 8, 8, 0.502);
    z-index: 1;
}

.container.img-logo {
    padding: 10px 5px;
}

.container .img-logo img {
    width: 100%;
    height: 100%;
}

.container .container-form {
    height: 300px;
    background-color: var(--color-text2);
}

.welcome-text {
    text-align: center;
    color: var(--color-text1);
    text-decoration: underline var(--color-text1);
}

form {
    padding-top: 10px;
}

form .login-form {
    border-top: 0px;
}

.info {
    border-top: 2px;
    height: 30px;
    width: 100%;
    border: 2px solid var(--color5);
    border-radius: 20px;

    display: flex;
    justify-content: center;
    align-items: center;

}

.info .text-info {
    text-align: center;
    font-weight: 700;
    color: var(--color5);
}

form .login-form .title {
    font-size: 28px;
    font-weight: 500;
    color: var(--color-text1);
    text-decoration: underline var(--color1);
}

form .login-form .title:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    width: 40px;
    background-color: var(--color1);
}

form .login-form .title:before {
    margin-top: 30px;
}

form .login-form.input-boxes {
    margin-top: 30px;
}

form .login-form .input-box {
    height: 50px;
    width: 100%;
    align-items: center;
    margin: 10px 0;
    position: relative;
}

form .login-form .input-box input {
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

form .login-form .input-box input:focus,
form .login-form .input-box input:valid {
    border-color: var(--color1);
}

form .login-form .input-box i {
    position: absolute;
    color: #6d9886;
    font-size: 24px;
    top: 15px;
}

#toggle {
    cursor: pointer;
    margin-left: -28px;
}

h4 {
    font-size: 12px;
    font-weight: 500;
    color: var(--color-text1);
    text-decoration: none;
    font-style: italic;
}

form .login-form .text {
    text-align: center;
}

form .login-form .text a {
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text1);
    text-decoration: none;
    text-align: center;

}

form .login-form .text a:hover {
    text-decoration: underline;
}


form .login-form .button {
    color: var(--color-text2);
    margin-top: 20px;
    margin-bottom: 20px;
}

form .login-form .button input {
    color: var(--color-text2);
    background: var(--color1);
    border-radius: 6px;
    padding: 0;
    cursor: pointer;
    transition: all 0.4s ease;
}

form .login-form .button input:hover {
    background: #6d9886;
}

.btn-float {
    background-color: var(--color-text2);
    border: 1px solid var(--color2);
    position: fixed;
    z-index: 999;
    border-radius: 50%;
    bottom: 20px;
    right: 25px;
    padding: 25px;
    transition: ease 0.3s;
}

.btn-float:hover {
    transform: scale(1.5);
    transition: 0.3s;
}

.text span {
    text-decoration: underline var(--color-text1);
}
</style>
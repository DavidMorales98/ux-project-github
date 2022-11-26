<template>
    <div class="container">
      <div class="img-logo">
        <img src="../assets/logo/image-removebg-preview_2.png" alt="" class="logo-ds">
      </div>
      <hr>
      <br>
      <div class="container-form">
        <h1 class="welcome-text">Bienvenido a nuestra terminal en linea</h1>
        <form action="#">
          <div class="login-form">
            <div class="title">Iniciar sesión</div>
            <div class="input-boxes">
              <div class="input-box">
                <i class="fi fi-rr-user"></i>
                <input class="placeholder form" type="text" placeholder="Ingrese su RUT" required>
              </div>
              <h4>Sin puntos ni guión, ej: 11111111-1</h4>
              <div class="input-box">
                <i class="fi fi-rr-lock"></i>
                <input class="placeholder" id="pswrd" type="password" placeholder="Ingrese su contraseña" required>
                <i class="fi fi-rr-eye " id="toggle" v-on:click=show></i>
              </div>
              <div class="button input-box">
                <i class="fi fi-sr-envelope"></i>
                <a><router-link to="/account">
                  <input type="button" value="Ingresar"></router-link>
                </a>
              </div>
              <div class="text"><a href=""><router-link to="/recover">¿Haz olvidado tu contraseña? <span>Haz click
                    aquí</span></router-link></a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
</template>

<script>

export default {
  name: 'LoginView',
  components: {
  },
  method: {
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap');

:root {
  --color1: #AC7D88;
  --color2: #85586F;
  --color3: #DEB6AB;
  --color4: #FBECD1;
  --color5: #B73E3E;
  --color-text1: #333;
  --color-text2: #fff;
}

* {
  margin: 0;
  padding: 0;
  font-family: 'Montserrat', sans-serif;
  box-sizing: border-box;
}

body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  background-image: url("../assets/fondos/5235.jpg");
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
  color: var(--color1);
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
  background: var(--color4);
  color: var(--color-text1)
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
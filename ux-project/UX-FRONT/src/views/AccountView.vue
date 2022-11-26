<template>
    <section>
        <div class="section-text">
            <h1>¡Bienvenido! Nombre Apellido</h1>
            <h2>Para continuar seleccione una cuenta.</h2>
        </div>
        <div class="container">
            <a href="../Home2/index.html">
            <div class="account-content">
                <div class="account-info1">
                    <h2>TIPO DE CUENTA <hr> NUMERO DE CUENTA</h2>
                </div>
                <div class="account-info2">
                    <h2>Saldo disponible <hr> SALDO</h2>
                </div>
            </div></a>
            <a href="../Home2/index.html">
            <div class="account-content">
                <div class="account-info1">
                    <h2>TIPO DE CUENTA <hr> NUMERO DE CUENTA</h2>
                </div>
                <div class="account-info2">
                    <h2>Saldo disponible <hr> SALDO</h2>
                </div>
            </div></a>
            <a href="../Home2/index.html">
            <div class="account-content">
                <div class="account-info1">
                    <h2>TIPO DE CUENTA <hr> NUMERO DE CUENTA</h2>
                </div>
                <div class="account-info2">
                    <h2>Saldo disponible <hr> SALDO</h2>
                </div>
            </div></a>
        </div>
    </section>
</template>

<script>
export default {

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
body{
    background-color: #C6C6C6;
    min-height: 100vh;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}

section{
    height: calc(100vh - 100px);
    align-items: center;
}

.section-text{
    text-align: center;

}
.section-text h1{
    font-size: 50px;
}
.section-text h2{
    font-size: 28px;
}

section .container {
	display: block;
	align-items: center;
	justify-content: center;
    margin: 70px 10%;
    height: 600px;    
}

.account-content{
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

.account-info1{
    text-align: center;
    align-items: center;
    margin-top: 30px;
}
.account-info2{
    text-align: center;
    align-items: center;
    margin-top: 30px;
}

.container a{
    cursor: pointer;
    text-decoration: none;
    color: var(--color-text1);
}


.account-content:hover{
    background-color: var(--color3);
    color: var(--color-text1);
}

</style>
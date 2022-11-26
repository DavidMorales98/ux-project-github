<template>
    <section>
        <div class="section-text">
            <h2>TIPO DE CUENTA - NUMERO DE CUENTA</h2>
            <h2>Saldo disponible: SALDO</h2>
        </div>
        <div class="section-form">
            <div id="formulario">
                <form id="form">
                    <h1>Formulario de transferencia</h1>
                    <div class="sub">
                        <h2>Contacto existente</h2>
                    </div>
                    <select class="select-transf">
                        <option class="option-transf" selected disabled>Seleccione el contacto</option>
                        <option class="option-transf">Pancho Saavedra</option>
                        <option class="option-transf">Kike Acuña</option>
                    </select>
                    <hr>
                    <div class="sub">
                        <h2>Nuevo contacto</h2>
                    </div>
                    <label>Nombre y apellido</label>
                    <input type="text" id="name" name="nombre" required="" placeholder="Indique el nombre y apellido" />
                    <label>RUT</label>
                    <input type="number" id="name" name="nombre" required=""
                        placeholder="Indique RUT sin puntos ni digito verificador" />
                    <h4>Sin puntos ni guión, ej: 11111111-1</h4>
                    <label>Correo</label>
                    <input type="email" id="name" name="nombre" required="" placeholder="Indique correo electrónico" />
                    <label>Banco</label>
                    <input type="text" id="name" name="nombre" required="" placeholder="Indique el banco" />
                    <label>Tipo de cuenta</label>
                    <select class="select-nc">
                        <option class="option-nc" selected disabled>Indique el tipo de cuenta</option>
                        <option class="option-nc">Cuenta de ahorro</option>
                        <option class="option-nc">Cuenta corriente</option>
                        <option class="option-nc">Cuenta vista</option>
                    </select>
                    <label>Numero de cuenta</label>
                    <input type="number" id="name" name="nombre" required=""
                        placeholder="Indique el numero de cuenta" />
                    <label>Monto</label>
                    <input type="number" id="name" name="nombre" required=""
                        placeholder="Indique el monto de transferencia" />
                    <div class="btn-transf">
                        <button class="btn-form-cancel cancel" type="submit" name="enviar">Cancelar</button>
                        <button class="btn-form-transf transf" type="submit" name="enviar">Transferir</button>
                    </div>
                </form>
            </div>
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

body {
    background-color: #C6C6C6;
    min-height: 100vh;
}


section {
    height: calc(100vh - 100px);
    align-items: center;
}


.section-text {
    padding: 5px;
    text-align: center;
    margin: 0 30% 30px;
    border-radius: 25px;
    background-color: rgba(0, 0, 0, 0.2);
    align-items: center;
}

.section-text h1,
h2 {
    padding: 10px
}

section .container {
    display: flex;
    align-items: center;
    justify-content: center;
}

table {
    margin-top: 50px;
    border: 1px solid var(--color2);
    color: var(--color-text2);
    font-size: 14px;
    table-layout: fixed;
    border-collapse: collapse;
    border-radius: 5px 5px 0 0;
    overflow-x: auto;
    box-shadow: 0 0 20px rgb(0, 0, 0, 0.3);
    background-color: var(--color1);
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
}

td {
    padding: 15px;
    border-bottom: 1px solid var(--color2);
    text-align: center;
}

tbody tr:hover {
    background-color: var(--color3);
}



#formulario{
    margin-top: 40px;
    border:solid 2px #708090;
    border-radius: 15px;
    box-shadow: 12px 12px 15px #3d2d2d;
    margin:0 auto;
    width :400px;
    padding:14px;
    background: var(--color-text2);
}
#formulario h1{
    font-size:28px;
    font-weight: bold;
    margin:10px;
    text-align: center;
    border: 2px solid var(--color4);
    color: var(--color-text2);
    background-color: var(--color1);
}

#formulario h2{
    text-decoration: underline var(--color-text1);
}

#formulario .select-transf{
    border: 4px solid var(--color-text1);
    padding: 5px;
    width: 100%;
    height: 60px;
}
.select-transf, .option-transf{
    font-size: 16px;
}

#formulario label{
    display:block;
    font-weight: bold;
    text-align: right;
    width:130px;
    float:left;
    padding: 3px;
    text-align: center;

}


#formulario input, .select-nc, .option-nc{
    float:left;
    font-size:12px;
    padding:2px 2px;
    border:salid 0px #708090;
    width:200px;
    height: 40px;
    margin:2px 10px 8px;

}

#formulario button{
    clear:both;
    margin:0 auto;
    width:100px;
    height:31px;
    background:#696969;
    text-align:center;
    line-height:31px;
    color : #fff;
    font-size:11px;
    font-weight:bold;
    cursor: pointer;
}
h4 {
    font-size: 12px;
    font-weight: 500;
    color: var(--color-text1);
    text-decoration: none;
    font-style: italic;
    margin-left: 150px;
    line-height: 10px;
}

.btn-transf{
    margin-left: 75px;
}
.img-caution{
    height: 24px;
}

.img-caution img{
    height: 100%;
}
</style>
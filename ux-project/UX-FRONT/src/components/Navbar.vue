<template>
      <nav>
        <input type="checkbox" id="check">
        <label for="check" class="checkbtn">
            <i class="fi fi-rr-menu-burger"></i>
        </label>
        <img src="image-removebg-preview_2.png" alt="">
        <ul>
            <li class="list">
                <a href="../Login/index.html">
                    <i class="fi fi-rr-exit"></i>
                    Cerrar sesión</a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: Navbar

}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
    box-sizing: border-box;
}
body{
    background-color: #C6C6C6;
    min-height: 100vh;
    background-image: url("./fondo-geometrico-plano_23-2148967370.webp");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}

nav{
    text-decoration: none;
    list-style: none;
    background-color: var(--color2);
    height: 100px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

nav img{
    height: 100px;
    width: auto;
}
nav ul{
    float: left;
    margin-right: 20px;
}
nav ul li{
    display: inline-block;
    line-height: 30px;
    margin: 0 5px;
    border: 2px solid red;

    color:var(--color-text1);
    font-size: 17px;
    text-decoration: none;
    padding: 10px 10px;
    border-radius: 50px;
    background-color: var(--color-text2);
    border: 1px solid var(--color-text1);

}

nav ul li a{
    color:var(--color-text1);
    font-size: 17px;
    text-decoration: none;
    padding: 10px 10px;
    border-radius: 50px;
}

nav ul li.active, li:hover{
    background-color: var(--color1);
    color: var(--color-text2);
    transition: .5s;

} 
nav ul li.active a, li:hover a{
    color: var(--color-text2);
}

.checkbtn{
    font-size: 30px;
    color: white;
    float: right;
    line-height: 80px;
    margin-right: 40px;
    cursor: pointer;
    display: none;
}

#check{
    display: none;
}


@media (max-width: 1228px){
    .checkbtn{
        display: block;
        margin-left: 40px;
    }
    ul{
        position: fixed;
        margin-top: 20px;
        width: 100%;
        height: 100vh;
        background-color: var(--color-text1);
        top: 80px;
        left: -100%;
        text-align: center;
        transition: all .5s;
        display: block;
        padding-top: 5%;
    }
    nav ul li{
        display: block;
        border-radius: 0;
        margin: 10px 0px 10px;

    }
    nav ul li{
        align-items: center;
        align-content: center;

    }
    li:hover a, li.active a{

    }
    #check:checked ~ ul{
        left: 0;
    }

}
</style>
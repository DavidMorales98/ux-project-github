var nombre = "David Morales";
var tCuenta = "Cuenta corriente";
var nCuenta = "1998-0603";
var saldo = 1200000;

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

document.getElementById('js-tcuenta').innerHTML = tCuenta;
document.getElementById('js-ncuenta').innerHTML = nCuenta;
document.getElementById('js-saldo').innerHTML = saldo;
///NAVBAR 
const list = document.querySelectorAll('.list');
function activeLink() {
    list.forEach((item) =>
        item.classList.remove('active'));
    this.classList.add('active');
}
list.forEach((item) =>
    item.addEventListener('click', activeLink));


//MODAL
function modal() {
    let modal = document.getElementById('modal');
    if (modal.style.visibility == "visible") {
        modal.style.visibility = "hidden";
    }
    else {
        modal.style.visibility = "visible";
    }
}

function modal2() {
    let modal = document.getElementById('modal2');
    if (modal.style.visibility == "visible") {
        modal.style.visibility = "hidden";
    }
    else {
        modal.style.visibility = "visible";
    }
}

///NOTIFICACION
document.getElementById('msg-mantenimiento2').onclick = function () {
    swal("Oops..!", "Sitio en mantención", "error");
};
document.getElementById('msg-mantenimiento3').onclick = function () {
    swal("Oops..!", "Sitio en mantención", "error");
};

document.getElementById('close').onclick = function () {
    swal({
        title: "¿Desea realizar la transferencia?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Si, transferir!',
        closeOnConfirm: false,
        //closeOnCancel: false
    },
        function () {
            swal("Transferido!", "Transferencia realizada!", "success");
            location.reload()
        });
};

document.getElementById('b4').onclick = function () {
    swal({
        title: "¿Desea realizar la transferencia?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Si, transferir!',
        closeOnConfirm: false,
        //closeOnCancel: false
    },
        function () {
            swal("Transferido!", "Transferencia realizada!", "success");
            location.reload()
        });
};

////TRANSFERENCIA



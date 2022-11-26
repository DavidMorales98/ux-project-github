
///NAVBAR 
const list = document.querySelectorAll('.list');
function activeLink(){
list.forEach((item) => 
item.classList.remove('active'));
this.classList.add('active');
}
list.forEach((item)=>
item.addEventListener('click',activeLink));


///NOTIFICACION
document.getElementById('msg-mantenimiento').onclick = function(){
	swal("Oops..!", "Sitio en mantención", "error");
};
document.getElementById('msg-mantenimiento1').onclick = function(){
	swal("Oops..!", "Sitio en mantención", "error");
};

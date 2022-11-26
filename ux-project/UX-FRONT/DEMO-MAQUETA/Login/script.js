//VER CONTRASEÑA
function show() {
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
}
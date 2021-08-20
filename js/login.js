//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const buttonLogin = () => {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const user = username.value;
    const pass = password.value;
    if (user && pass) {
        localStorage.setItem("usuario", user.trim());
        localStorage.setItem("passw", pass.trim())
        window.location="index.html";
    }

    else {
        alert("Credenciales no válidas");
    }
};

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loginbtn").addEventListener("click", buttonLogin)
});
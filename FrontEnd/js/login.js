"use strict";

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const buttonLogin = () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (username && password) {
        localStorage.setItem("usuario", username.trim());
        
        window.location="index.html";
    }
};

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loginbtn").addEventListener("click", buttonLogin)
});
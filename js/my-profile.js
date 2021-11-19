"use strict";
let getName = document.getElementById("name");
let getSurname =  document.getElementById("surname");
let getAge = document.getElementById("age");
let getPhone = document.getElementById("phone");
let getMail = document.getElementById("email");



const saveData = () => {

    let user = {
        name: getName.value,
        surname: getSurname.value,
        age: getAge.value,
        phone: getPhone.value,
        email: getMail.value,
    }
    
    
    const userDataString = JSON.stringify(user);
    localStorage.setItem('userInfo', userDataString)
};

const showData = () => {

    const getUserData = JSON.parse(localStorage.getItem('userInfo')) 
    if (localStorage.getItem('userInfo') != null || undefined) {
        getName.value = `${getUserData.name}`
        getSurname.value = `${getUserData.surname}`
        getAge.value = `${getUserData.age}`
        getPhone.value = `${getUserData.phone}`
        getMail.value = `${getUserData.email}`
    }
    
}
  
  //Función que se ejecuta una vez que se haya lanzado el evento de
  //que el documento se encuentra cargado, es decir, se encuentran todos los
  //elementos HTML presentes.
  document.addEventListener("DOMContentLoaded", function (e) {
      showData();
      document.getElementById("saveChanges").addEventListener("click", showData);
    });
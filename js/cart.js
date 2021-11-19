"use strict";

let cartProds = []

const showCartProds =(array)=>{
    const cells = document.getElementById("cartProd");
    for (let item of array) {
        cells.innerHTML+=`
                    <table class="table table-responsive-sm">
                        <thead class="table thead-dark">
                            <tr>
                                <th scope="col"> Previsualización </th>
                                <th scope="col"> Nombre </th>
                                <th scope="col"> Costo </th>
                                <th scope="col"> Cantidad </th>
                                <th scope="col"> Subtotal </th>
                            </tr>
                        </thead> 
                        <tbody class="table table-hover">
                            <tr>
                                <td><img class="img-thumbnail" src="${item.src}"></td>
                                <td>${item.name}</td>
                                <td><span id="itemCost"> ${(item.unitCost).toFixed(2)}</span> <span id="itemCurrency"> ${item.currency} </span></td>
                                <td><input  type="number" id="productQuantity" min="1" value="${item.count}" class="form-control" required></td>
                                <td> <span id="subtotalprice"> ${item.unitCost*item.count}(${item.currency})</span></td>
                            </tr>
      
                </tbody>`
    }
}
const bringCartProducts= async (array) => {
    const data = await fetch(array);
    const data_1 = await data.json();
    return (data_1);
    }

const calculateSubtotalandTotal = ()  => {
    const unitCost = document.getElementById("itemCost").innerHTML;
    const currency = document.getElementById("itemCurrency").innerHTML;
    const productQuantity = document.getElementById("productQuantity").value;
    const subtotalCalc = document.getElementById("subtotalprice");
    const totalCalc =  document.getElementById("totalPrice");
    const shipping = document.querySelector('input[name="options"]:checked').value;
    const expenses  = document.getElementById("expenses");

    subtotalCalc.innerHTML = `${(productQuantity*unitCost).toFixed(2)} (${currency})`
    totalCalc.innerHTML =  `<h2> Importe total: ${((productQuantity*unitCost*shipping)+(productQuantity*unitCost)).toFixed(2)} (${currency})<h2>
    `
    expenses.innerHTML = `<div class="container"> <h5 class="d-flex justify-content-end"> Subtotal: ${(productQuantity*unitCost).toFixed(2)} (${currency})</h5> 
    <h5 class="d-flex justify-content-end">Envío: ${(productQuantity*unitCost*shipping).toFixed(2)} (${currency}) </h5> 
    <hr>
    </div>
    ` 
};


 const showPaymentMethods = () => {
     if (document.querySelector('input[name="payMethod"]:checked') !== null || undefined){
          if (document.querySelector('input[name="payMethod"]:checked').value === "creditCard") {
              document.getElementById("paymentInput").innerHTML = `
              <label>Número de la tarjeta<input type="text" maxlength="19" class="form-control" placeholder="xxxx-xxxx-xxxx-xxxx" required></label>
              <label>Fecha de Vencimiento<input type="text" maxlength="5" class="form-control" placeholder="MM/AA" required></label>
              <label>CVC<input type="text" maxlength="3" class="form-control" placeholder="xxx" required></label>
              <label>Propietario <small>(Nombre y apellido)</small><input type="text" class="form-control" placeholder="John Doe" required></label>`
              
              /// TODO - Work in the invalid parameters for credit card number, cvc and expiry date. 
          }
         if (document.querySelector('input[name="payMethod"]:checked').value === "bank") {
            document.getElementById("paymentInput").innerHTML = `
            <label>Numero de cuenta<input type="text" class="form-control" maxlength="15" placeholder="xxxxxxxxx-xxxxx" required></label>
            <label>Nombre <input type="text" class="form-control" required></label>`
         }
     }
     else {
        document.getElementById("paymentInput").innerHTML = `
        <p>Por favor, seleccione una opción</p>`
     }
 }

 
    //Función que se ejecuta una vez que se haya lanzado el evento de
    //que el documento se encuentra cargado, es decir, se encuentran todos los
    //elementos HTML presentes.          
    document.addEventListener("DOMContentLoaded", function(e){
        bringCartProducts(CART_INFO_URL)
        .then((data)=>{cartProds = (data.articles);})
        .then(()=>{
            showCartProds(cartProds);
            calculateSubtotalandTotal();
            document.getElementById("productQuantity").addEventListener("change", calculateSubtotalandTotal);
            document.getElementById("shipping").addEventListener("click", calculateSubtotalandTotal);
            showPaymentMethods();
            document.querySelector("#paymentForm").addEventListener("change", showPaymentMethods);}


    )})
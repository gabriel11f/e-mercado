let cartProds = []

const showCartProds =(array)=>{
    const cells = document.getElementById("cartProd");
    for (let item of array) {
        cells.innerHTML+=`
        <table class="table">
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
                    <td><span id="itemCost"> ${item.unitCost} </span> <span id="itemCurrency"> ${item.currency} </span></td>
                    <td><input  type="number" id="productQuantity" min="1" value="${item.count}"></td>
                    <td> <span id="subtotalprice"> ${item.unitCost*item.count}(${item.currency})</span></td>
                </tr>
            </tbody>`
    }
}
const showCartProducts= async (array) => {
    const data = await fetch(array);
    const data_1 = await data.json();
    return (data_1);
    }

const calculateSubtotal = () => {
    const unitCost = document.getElementById("itemCost").innerHTML;
    const currency = document.getElementById("itemCurrency").innerHTML;
    const productQuantity = document.getElementById("productQuantity").value;
    const subtotalCalc = document.getElementById("subtotalprice");

    subtotalCalc.innerHTML = `${productQuantity*unitCost} (${currency})
    `
}
 
    //Función que se ejecuta una vez que se haya lanzado el evento de
    //que el documento se encuentra cargado, es decir, se encuentran todos los
    //elementos HTML presentes.          
    document.addEventListener("DOMContentLoaded", function(e){
        showCartProducts(CART_INFO_URL)
        .then((data)=>{cartProds = (data.articles);})
        .then(()=>{ 
            showCartProds(cartProds);
            calculateSubtotal();
            document.getElementById("productQuantity").addEventListener("change", calculateSubtotal);}
    )})
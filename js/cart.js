let cartProds = [];

const showCartProd = (array) => {
    for (let value of array.articles) {
    
        document.getElementById("cartProd").innerHTML += `
        
        
        <div class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col-3">
                <img src="` + value.src + `" alt="img" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">`+ value.name + `</h4>
                </div>
            </div>
            <div class="container">
            <small class="precio">` + " Precio: " + value.unitCost + " " + value.currency + `</small>
            <input type="number"> </div>
        </div>
    </div>
    `
                
                    // <div class="list-group-item list-group-item-action"> 
                    //     <div class="row">
                    //         <div class="col-3">
                    //         <img src="` + value.src +`" class="card-img-top" alt="imgProduct" class="img-thumbnail"> 
                    //         <h2>`+ value.name + `</h2>
                    //         </div>
                    //     </div>
                    // </div>
    }
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {cartProds = resultObj.data;   

        }}).then(()=> showCartProd(cartProds))
            
        
    });
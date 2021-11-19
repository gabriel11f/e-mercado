"use strict";

let productsArray = [];
let ordenarObjetos = (array, criterio) => {
    const campo = document.getElementById("ordenar").value;
    if (campo === "Precio") {
        if (criterio === "ascen") {
            array.sort((a, b) => {
                if (b.cost > a.cost) { return -1 };
                if (b.cost < a.cost) { return 1 };
                return 0;
            })
            showProductsList(array)
        }
        if (criterio === "desc") {
            array.sort((a, b) => {
                if (a.cost > b.cost) { return -1 };
                if (a.cost < b.cost) { return 1 };
                return 0;
            })
            showProductsList(array)
        }
    }
    if (campo === "Relevancia") {
        if (criterio === "ascen") {
            array.sort((a, b) => {
                if (b.soldCount > a.soldCount) { return -1 };
                if (b.soldCount > a.soldCount) { return 1 };
                return 0;
            })
            showProductsList(array)
        }
        if (criterio === "desc") {
            array.sort((a, b) => {
                if (a.soldCount > b.soldCount) { return -1 };
                if (a.soldCount > b.soldCount) { return 1 };
                return 0;
            })
            showProductsList(array)
        }
    }

}

function showProductsList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];

        htmlContentToAppend += `
        
    
        
                    <div class="col-md-6">
                    <div class="card mb-4 shadow-sm">
                    <img class="card-img-top img-thumbnail-2"  src=${product.imgSrc}>
                             <div class="card-body">
                                 <h3 class="card-title">${product.name} (122)</h3>
                                    <p class="card-text">${product.description} </p>
                                        <small class="precio"> Precio: ${product.cost} dólares </small>
                            </div>
                        </div>
                    </div>
                
    `

        document.getElementById("catProds").innerHTML = htmlContentToAppend;
    }
}

let filtrarPorPrecio = (array) => {
    let min = document.getElementById("min").value;
    let max = document.getElementById("max").value;

    productsArray = (array.filter(a => a.cost >= min && a.cost <= max));
};
const traerLista = () => {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            ordenarObjetos(productsArray, "ascen")
        }
    })
};
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    traerLista();
    document.getElementById("asc").addEventListener("change", () => {
        ordenarObjetos(productsArray, "ascen");
    });
    document.getElementById("desc").addEventListener("change", () => {
        ordenarObjetos(productsArray, "desc");
    });
    document.getElementById("ordenar").addEventListener("change", () => {
        ordenarObjetos(productsArray, "ascen");
    });

    document.getElementById("FiltrarPrecio").addEventListener("click", () => {
        filtrarPorPrecio(productsArray);
        ordenarObjetos(productsArray, "ascen")
    });
    document.getElementById("LimpiarFiltro").addEventListener("click", traerLista);

    document.getElementById("catProds").addEventListener("click", () => {
        window.location = 'product-info.html'
    });
});
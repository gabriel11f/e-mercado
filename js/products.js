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
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.desc + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name + `</h4>
                    </div>
                    <small class="text-muted">` + product.description + ` </small>
                </div>
                <small class="precio">` + " Precio: " + product.cost + " " + ` dólares </small>
            </div>
        </div>
        `

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
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
    
    document.getElementById("cat-list-container").addEventListener("click", ()=> {
        window.location =  'product-info.html'
    });
});
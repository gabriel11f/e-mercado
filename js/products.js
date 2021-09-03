let categoriesArray = [];
let ordenarObjetos = (array, criterio) => {
    const campo = document.getElementById("ordenar").value;
    if (campo === "Precio") {
        if (criterio === "ascen") {
            array.sort((a, b) => {
                if (b.cost > a.cost) { return -1 };
                if (b.cost < a.cost) { return 1 };
                return 0;
            })
            showCategoriesList(array)
        }
        if (criterio === "desc") {
            array.sort((a, b) => {
                if (a.cost > b.cost) { return -1 };
                if (a.cost < b.cost) { return 1 };
                return 0;
            })
            showCategoriesList(array)
        }
    }
    if (campo === "Relevancia") {
        if (criterio === "ascen") {
            array.sort((a, b) => {
                if (b.soldCount > a.soldCount) { return -1 };
                if (b.soldCount > a.soldCount) { return 1 };
                return 0;
            })
            showCategoriesList(array)
        }
        if (criterio === "desc") {
            array.sort((a, b) => {
                if (a.soldCount > b.soldCount) { return -1 };
                if (a.soldCount > b.soldCount) { return 1 };
                return 0;
            })
            showCategoriesList(array)
        }
    }
}

function showCategoriesList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let category = array[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.imgSrc + `" alt="` + category.desc + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ category.name + `</h4>
                    </div>
                    <small class="text-muted">` + category.description + ` </small>
                </div>
                <small class="precio">` + " Precio: " + category.cost + " " + ` dólares </small>
            </div>
        </div>
        `

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            categoriesArray = resultObj.data;
            ordenarObjetos(categoriesArray, "ascen")
        }
    });

    document.getElementById("asc").addEventListener("change", () => {
        ordenarObjetos(categoriesArray, "ascen");
    });
    document.getElementById("desc").addEventListener("change", () => {
        ordenarObjetos(categoriesArray, "desc");
    });
    document.getElementById("ordenar").addEventListener("change", () => {
        ordenarObjetos (categoriesArray, "ascen");
    }) 
}); 
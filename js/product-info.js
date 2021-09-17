//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var prodInfo = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            prodInfo = resultObj.data;

            let prodInfoNameHTML  = document.getElementById("productName");
            let prodInfoDescriptionHTML = document.getElementById("productDescription");
            let productsoldCountHTML = document.getElementById("productsoldCount");
            let productCostHTML = document.getElementById("productCost");
        
            prodInfoNameHTML.innerHTML = prodInfo.name;
            prodInfoDescriptionHTML.innerHTML = prodInfo.description;
            productsoldCountHTML.innerHTML = prodInfo.soldCount;
            productCostHTML.innerHTML = prodInfo.currency + " " + prodInfo.cost;
            

            //Muestro las imagenes en forma de galería
            showImagesGallery(prodInfo.images);
        }
    });
});
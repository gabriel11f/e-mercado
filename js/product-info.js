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

        document.getElementById("ImagesGallery").innerHTML = htmlContentToAppend;
    }
}

const showFullData = (array) => {
     for (let valor of array) {
         document.getElementById("comments").innerHTML += 
         '<h4>' +  valor.user + '</h4> <br><p>Valoración: ' + valor.score + '  </p>' + '<br> <p>' + valor.description +'</p> <hr><hr>'

    }
}

const showRatingNComments = () => {
    fetch(PRODUCT_INFO_COMMENTS_URL)
    .then(data => data.json())
    .then(data => {
        showFullData(data)})
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            prodInfo = resultObj.data;
        

            let productCategoryHTML = document.getElementById("productCategory");
            let prodInfoNameHTML  = document.getElementById("productName");
            let prodInfoDescriptionHTML = document.getElementById("productDescription");
            let productsoldCountHTML = document.getElementById("productsoldCount");
            let productCostHTML = document.getElementById("productCost");

        
            productCategoryHTML.innerHTML = prodInfo.category;
            prodInfoNameHTML.innerHTML = prodInfo.name;
            prodInfoDescriptionHTML.innerHTML = prodInfo.description;
            productsoldCountHTML.innerHTML = prodInfo.soldCount;
            productCostHTML.innerHTML = prodInfo.currency + " " + prodInfo.cost;

            

            //Muestro las imagenes en forma de galería
            showImagesGallery(prodInfo.images);
            showRatingNComments()

        }
    })})

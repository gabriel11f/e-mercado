"use strict";

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

let prodInfo = {};

let myProducts = {};


function showImagesGallery(array) {
    
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
        document.getElementById("comments").innerHTML += `
        <div class="card-deck">
        <div class="shadow card" style="width: 18rem;">
        <div class="card-body">
        
        <h5 class="card-title p-3 mb-2 bg-secondary text-white">` + valor.user + `</h5> 
        <div class="container"> <p class="card-text">` + valor.description + `</p> </div>
        <div class="container bg-secondary rounded-pill text-white text-center" style="width: 5rem;">`+ valor.score +  ` ☆ </div>
        <br>
        </div>
        </div>
        </div>
        <br>`
    }
}

const showRatingNComments = () => {
    fetch(PRODUCT_INFO_COMMENTS_URL)
    .then(data => data.json())
    .then(data => {
        showFullData(data)
    })
}


const showRelProd = (array) => {
    
    
    const newArray = array.relatedProducts;
    for (let value of newArray) {
        const relatedProd = myProducts[value];
        
        
        
        document.getElementById("related").innerHTML += `
        
        
            
                <div class="col-3 mb-4">
                    <div class="card" style="height: 100%;"> 
                        <div class="card-body">
                            <img src="` + relatedProd.imgSrc +`" class="card-img-top" alt="imgProduct"> 
                            <h2 class="card-title large p-3">`+ relatedProd.name + `</h2>
                            <a href="product-info.html" class="btn btn-primary">Ver Producto</a>
                        </div>
                    </div>
                </div>
                          
        `
    }
}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            myProducts = resultObj.data;
        }
    })
    
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            prodInfo = resultObj.data;
            
            
            
            let productCategoryHTML = document.getElementById("productCategory");
            let prodInfoNameHTML = document.getElementById("productName");
            let prodInfoDescriptionHTML = document.getElementById("productDescription");
            let productsoldCountHTML = document.getElementById("productsoldCount");
            let productCostHTML = document.getElementById("productCost");
            
            productCategoryHTML.innerHTML = prodInfo.category;
            prodInfoNameHTML.innerHTML = prodInfo.name;
            prodInfoDescriptionHTML.innerHTML = prodInfo.description;
            productsoldCountHTML.innerHTML = prodInfo.soldCount;
            productCostHTML.innerHTML = prodInfo.currency + " " + prodInfo.cost;


            

            showImagesGallery(prodInfo.images);
            showRatingNComments()
            showRelProd(prodInfo)
        }
    })
})

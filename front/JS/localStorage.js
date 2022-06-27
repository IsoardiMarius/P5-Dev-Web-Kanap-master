////////////////////////////////////////////////////////////////
// Fonction lié au local storage : ////////////////////
////////////////////////////////////////////////////////////////


const storageAccess = localStorage

//////  Récupérer le tableau des produits présent dans le localstorage //////
function getProductsFromLocalStorage() {
    const products = storageAccess.getItem("productCart")
    if (!products) {
        return {}
    }
    return JSON.parse(products)
}

///////  Mettre à jour les produis présent dans le localstorage ///////
function updateLocalStorage(products) {
    storageAccess.setItem("productCart", JSON.stringify(products))
}

/////// Ajouter les produits au localStorage ////////
function addToCart(product) {
    // On récupère les produits du ls
    let products = getProductsFromLocalStorage()
    const quantity = document.querySelector("#quantity")


    if (products[product.id]){
        if (products[product.id][product.color]){
            products[product.id][product.color] = parseInt(products[product.id][product.color]) + parseInt(quantity.value)
        }else {
            products[product.id][product.color] = parseInt(quantity.value)

        }
    }

    if (!products[product.id]){
        products[product.id] = {
            [product.color]: parseInt(quantity.value)
        }
    }
    updateLocalStorage(products)

}

function removeProductFromLs(id,color)
{
    let products = getProductsFromLocalStorage()
    if (products[id][color]){
        if (Object.keys(products[id]).length > 1){
            delete products[id][color]

        }else {
            delete products[id]
        }
    }
    updateLocalStorage(products)
    location.reload()
}

function changeProductQuantity(id,color,quantity){
    let products = getProductsFromLocalStorage()
    if (products[id][color]){
        products[id][color] = quantity
    }

    updateLocalStorage(products)
    location.reload()
}


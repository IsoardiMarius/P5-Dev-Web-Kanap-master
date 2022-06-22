// Storage Initialisation
const storageAccess = localStorage

function getProductsFromLocalStorage() {
    const products = storageAccess.getItem("productCart")
    if (!products) {
        return {}
    }
    return JSON.parse(products)
};


function updateLocalStorage(products) {
    storageAccess.setItem("productCart", JSON.stringify(products))
}

function addToCart(id, color, quantity) {
    //mettre cette fonction getProductsFromLocalStorage() dans une variable products pour travailler dessus
    let products = getProductsFromLocalStorage()
    //structure pour enregistrer un produit (ne récupérer que l'essentiel : id, color, quantity
    // const productCart = {
    //     id : productId,
    //     color : color,
    //     quantity : quantity,
    //
    // }
    if (products[id]) {
        if (products[id][color]) {
            products[id][color] = parseInt(products[id][color]) + parseInt(quantity)
        } else {
            products[id][color] = parseInt(quantity)
        }
    }

    if (!products[id]) {
        products[id] = {
            [color]: parseInt(quantity) // (id, couleur, quantité)
        }
    }

    //avec juste l'identifiant, tu pourras récupérer tout les éléments d'un produit


    //mettre cette fonction updateLocalStorage(products) pour mettre à jour les produits
    updateLocalStorage(products)
};



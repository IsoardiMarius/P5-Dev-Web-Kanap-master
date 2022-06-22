const fetchPrice = async (id) => {
    const response = await fetch(`http://localhost:3000/api/products/${id}`)
    const product = await response.json()
    return product.price
}
//AFFICHAGE DES PRODUITS DU PANIER

let productInLocalStorage = JSON.parse(localStorage.getItem("productCart"));


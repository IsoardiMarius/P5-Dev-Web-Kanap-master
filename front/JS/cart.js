//AFFICHAGE DES PRODUITS DU PANIER

let productInLocalStorage = JSON.parse(localStorage.getItem("productCart"));
let productId = productInLocalStorage.id
console.log(productId)

//fetch("http://localhost:3000/api/products/" + productId)


























// const fetchPrice = async (id) => {
//     const response = await fetch(`http://localhost:3000/api/products/${id}`)
//     const product = await response.json()
//     return product.price
// }

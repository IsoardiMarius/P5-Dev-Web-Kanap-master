// Récuperer tout les produits sur la page d'accueil

const items = document.getElementById("items");

fetch
("http://localhost:3000/api/products/")
    .then((response) => {
        if (response.ok) {

            /*return*/
            response.json()
                .then((products) => {
                    for (let product of products) {
                        items.innerHTML += `<a href="./product.html?id=${product._id}">
                        <article>
                          <img src="${product.imageUrl}" alt="${product.altTxt}">
                          <h3 class="productName">${product.name}</h3>
                          <p class="productDescription">${product.description}</p>
                        </article>
                      </a>`

                    }

                })
                .catch((error) => {
                    alert("Le produit n'est pas disponible")
                })
        }

    }).catch((error) => {
    alert("Le serveur ne répond pas")
})





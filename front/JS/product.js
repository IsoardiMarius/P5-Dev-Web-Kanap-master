let urlParam = (new URL(location)).searchParams
let productId = urlParam.get("id")

const titleId = document.getElementById("title")
const colorId = document.getElementById("colors")
const imgId = document.querySelector(".item__img")
const descriptionId = document.getElementById("description")
const priceId = document.getElementById("price")


fetch("http://localhost:3000/api/products/" + productId)
    .then((response) => {
        if (response.ok) {
            response.json()
                .then((product) => {
                    titleId.innerHTML = `${product.name}`
                    descriptionId.innerHTML = `${product.description}`
                    priceId.innerHTML = `${product.price}`
                    imgId.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`
                    const colorArray = product.colors
                    for (let color of colorArray) {
                        colorId.innerHTML += `<option value="${color}"> ${color}</option>`
                    }


                })

        }
    })

const btnAdd = document.querySelector("#addToCart")
const color = document.querySelector("#colors")
const quantity = document.querySelector("#quantity")
const price = document.querySelector("#price")


btnAdd.addEventListener('click', e => {
    if (quantity.value > 0 && quantity.value < 100) {
        addToCart(productId, color.value, quantity.value)
    }
    // const productOptions = {
    //     id : productId,
    //     color : color,
    //     quantity : quantity,
    //     price : price
    //
    // }
    //pour les données regarde bien la structure que j'ai mis dans le fichier localStorage
    //si tu mets en place le script localStorage avant celui-ci sur la page product.html
    //tu pourras accéder aux fonctions du script
    //et appeler par exemple la fonction addToCart()


    // localStorage.setItem(productId, JSON.stringify(data))
})



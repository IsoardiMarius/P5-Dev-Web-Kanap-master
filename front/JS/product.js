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
const color = document.querySelector("#colors").value
const quantity = document.querySelector("#quantity").value
const price = document.querySelector("#price")
console.log(color)
btnAdd.addEventListener('click', e => {
    const data = {
        id : productId,
        color : color,
        quantity : quantity,
        price : price

    }
    localStorage.setItem(productId, JSON.stringify(data))
})

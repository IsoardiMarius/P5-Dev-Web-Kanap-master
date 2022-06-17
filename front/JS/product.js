let urlParam = (new URL(location)).searchParams
let productId = urlParam.get("id")


const titleId = document.getElementById("title")
const colorId = document.getElementById("colors")
const imgId = document.getElementById("item__img")
const descriptionId = document.getElementById("description")
const priceId = document.getElementById("price")





fetch("http://localhost:3000/api/products/" + productId)
    .then((response) => {
        if(response.ok){
            response.json()
                .then((product) => {
                    titleId.innerHTML = `${product.name}`
                    descriptionId.innerHTML = `${product.description}`
                    priceId.innerHTML = `${product.price}`
                    const color = product.colors
                    console.log(color)
                    for (let i of color) {
                        colorId.innerHTML += `<option value=""> ${product.colors}</option>`
                    }


                })

        }
    })
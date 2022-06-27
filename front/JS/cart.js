

////////////////////////////////////////////////////////////////
// On affiche tout les produits dans le localstorage ////////////////////
////////////////////////////////////////////////////////////////


// récupérer le panier (l’array) via localStorage.
let productInLocalStorage = JSON.parse(localStorage.getItem("productCart"));


function innerHTML() {
    for (let [id,colors] of Object.entries(productInLocalStorage)) {
        for (let [color,quantity]of Object.entries(colors)){
            fetch("http://localhost:3000/api/products/" + id)
                .then((response) => {
                    if (response.ok) {
                        response.json()
                            .then((productData) => {

                                let item = document.querySelector("#cart__items")
                                // Insertion des éléments
                                item.innerHTML += `<article class="cart__item" data-id="${productData._id}" data-color="${color}">
                <div class="cart__item__img">
                  <img src="${productData.imageUrl}" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${productData.name}</h2>
                    <p>${color}</p>
                    <p>${productData.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté :   </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>`

                let deleteBtns =  document.getElementsByClassName("deleteItem")
                                let b = Object.values(deleteBtns)

                                console.log(b)

                                Object.values(deleteBtns).forEach(deleteBtn => {
                                    deleteBtn.addEventListener('click', function () {
                                        let article = deleteBtn.closest("article")
                                        let deleteBtnId = article.getAttribute("data-id")
                                        let deleteBtncolor = article.getAttribute("data-color")

                                        removeProductFromLs(deleteBtnId, deleteBtncolor)
                                    })
                                } )
                            })


                    }
                })
        }
        // Pour chaque produit, on récupère l'id pour faire un appel API

    }
}

innerHTML()


////////////////////////////////////////////////////////////////
// Form Control & POST request ////////////////////
////////////////////////////////////////////////////////////////


////////////// Form control ////////////
let email = document.querySelector("#email")

// Verification email value

email.addEventListener("input", function () {

    validEmail(this)

});

const validEmail = function (inputEmail) {

    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g')

    let testEmail = emailRegExp.test(inputEmail.value)
    let small = inputEmail.nextElementSibling

    if (inputEmail.value === "") {
        small.innerHTML = ""

    } else if (testEmail === false) {
        small.style.color = "FF8686E5"
        small.innerHTML = "❌ Adresse mail invalide"

    } else if (testEmail === true) {
        small.innerHTML = ""

    }

}

// Verification inputInfo

let lastName = document.querySelector("#lastName")
let firstName = document.querySelector("#firstName")
let city = document.querySelector("#city")
let address = document.querySelector('#address')

lastName.addEventListener("input", function () {

    validInfo(this)

});

firstName.addEventListener("input", function () {

    validInfo(this)

});

city.addEventListener("input", function () {

    validInfo(this)     /* DEMANDER SI IDENTIQUE A CITY */

});


const validInfo = function (inputInfo) {
    let infoRegExp = new RegExp('^[a-zA-Z-_./]{0,100}$', 'g')
    let testInfo = infoRegExp.test(inputInfo.value)
    let small = inputInfo.nextElementSibling


    if (inputInfo.value === "") {
        small.innerHTML = ""

    } else if (testInfo === false) {
        small.style.color = "FF8686E5"
        small.innerHTML = "❌ Nombre ou symbole non autorisé"

    } else if (testInfo === true) {
        small.innerHTML = ""

    }


}


/////////// POST request ////////////

function makeJsonData() {
    let contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
    };
    let items = productInLocalStorage;
    let products = [];

    for (i = 0; i < items.length; i++) {
        if (products.find((e) => e === items[i][0])) {
            console.log("not found");
        } else {
            products.push(items[i].id);
        }
    }
    let dataJson = JSON.stringify({contact, products});

    return dataJson;
}




const orderButton = document.getElementById("order");
const posUrl = "http://localhost:3000/api/products/order";
orderButton.addEventListener("click", (e) => {
    e.preventDefault(); //prevent default form button action

    let jsonData = makeJsonData();
    console.log(makeJsonData())

    fetch(posUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: jsonData,
    })
        .then((res) => res.json())
        // to check res.ok status in the network
        .then((data) => {
            localStorage.clear();
            let confirmationUrl = "./confirmation.html?id=" + data.orderId;
            console.log(data.orderId)
            window.location.href = confirmationUrl;
        })
        .catch(() => {
            alert("Une erreur est survenue, merci de revenir plus tard.");
        }); // catching errors
});






















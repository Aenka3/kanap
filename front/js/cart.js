// Récupération du local storage
let panier = JSON.parse(localStorage.getItem("produit"));

// Affichage du panier
function afficherPanier () {
    // Si panier vide
    if (!panier || panier.length == "") {
        document.querySelector("h1").textContent += " est vide";
    }
    // Si panier non vide
    else {
        //Pour chaque articles dans le panier, on le rajoute sur la page
        for (i = 0; i < panier.length; i++) {
            document.getElementById("cart__items").innerHTML += `
            <article class="cart__item" data-id="${panier[i].productID}">
                <div class="cart__item__img">
                    <img src="${panier[i].image}" alt="${panier[i].imageAlt}" />
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${panier[i].name}</h2>
                        <p>${panier[i].choixOpt}</p>
                        <p>${panier[i].price}</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté :</p>
                            <input index="${[i]}" onchange="getNewQty(this)" id="cartQty" type="number" class="itemQuantity" name="itemQuantity" min="0" max="100" value="${panier[i].qty}" />
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p index="${[i]}" onclick="supprimerArticle(this)" class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>
            `;
        }
    }
}
afficherPanier();

// Supression de la ligne  par le bouton supprimer
function supprimerArticle(e) {
    let index = e.getAttribute("index");
    panier.splice(index, 1);
    localStorage.setItem("produit", JSON.stringify(panier));
    location.reload();
}

// Mise à jour des quantités et total prix si modification des valeurs dans l'input
function getNewQty(e) {
    let index = e.getAttribute("index");
    let newQty = e.value;
    panier[index].qty = parseInt(newQty);

    if (newQty == 0) {
        panier.splice(index, 1);
        localStorage.setItem("produit", JSON.stringify(panier));
        location.reload();
    } else {//On met à jour l'affichage
        document.getElementById("totalQuantity").innerHTML = totalQty();
        document.getElementById("totalPrice").innerHTML = totalPrice();
        localStorage.setItem("produit", JSON.stringify(panier));
    }
}

// Calcul du prix total
function totalPrice() {
    let totalprix = 0;
    for (let i = 0; i < panier.length; i++) {
        let quantity = parseInt(panier[i].qty);
        let prix = parseInt(panier[i].price);
        totalprix += prix * quantity;
    }
    return totalprix;
}

// affichage du prix total
document.getElementById("totalPrice").innerHTML = totalPrice();

// Calcul de quantité(s) totale
function totalQty() {
    let totalqty = 0;
    for (let i = 0; i < panier.length; i++) {
        let quantity = parseInt(panier[i].qty);
        totalqty += quantity;
    }
    return totalqty;
}

// affichage de quantité(s) totale
document.getElementById("totalQuantity").innerHTML = totalQty();

// Selection de la div contenant tout le formulaire
let form = document.querySelector(".cart__order__form");

//Selection des éléments du formulaire
let firstName = form.firstName;
let lastName = form.lastName;
let address = form.address;
let city = form.city;
let email = form.email;
let boutonCommander = form.submit;

//Declaration des expressions régulières
let nameRegExp = /^[a-zA-Z -]+$/;
let addressRegExp = /^[a-zA-Z0-9\s,.'-]{3,}$/;
let emailRegExp = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/;

//Verification Prenom
firstName.addEventListener("input", function () {
    verificationFirstName(firstName);
});

function verificationFirstName() {
    let testFirstName = nameRegExp.test(firstName.value);
    if (testFirstName == false) {
        firstName.nextElementSibling.innerHTML = `Veuillez remplir ce champs.<br>Ne peut contenir de chiffres ou caractères spéciaux.`;
        return false;
    } else {
        firstName.nextElementSibling.innerHTML = "";
        return true;
    }
}

//Verification Nom de famille
lastName.addEventListener("input", function () {
    verificationLastName(lastName);
});

function verificationLastName() {
    let testlastName = nameRegExp.test(lastName.value);
    if (testlastName == false) {
        lastName.nextElementSibling.innerHTML = `Veuillez remplir ce champs.<br>Ne peut contenir de chiffres ou caractères spéciaux.`;
        return false;
    } else {
        lastName.nextElementSibling.innerHTML = "";
        return true;
    }
}

//Verification adresse
address.addEventListener("change", function () {
    verificationAddress(address);
});

function verificationAddress() {
    let testAddress = addressRegExp.test(address.value);
    if (testAddress == false) {
        address.nextElementSibling.innerHTML = `Veuillez saisir une adresse valide.<br>Exemple: <i>1 rue des Trois Frères</i>`;
        return false;
    } else {
        address.nextElementSibling.innerHTML = "";
        return true;
    }
}

//Verification Ville
city.addEventListener("input", function () {
    verificationCity(city);
});

function verificationCity() {
    let testCity = nameRegExp.test(city.value);
    if (testCity == false) {
        city.nextElementSibling.innerHTML = `Veuillez saisir une nom de ville valide.<br>Ne doit pas contenir de chiffre.`;
        return false;
    } else {
        city.nextElementSibling.innerHTML = "";
        return true;
    }
}

//Verification Email
email.addEventListener("change", function () {
    verificationEmail(email);
});

function verificationEmail() {
    let testEmail = emailRegExp.test(email.value);
    if (testEmail == false && email.value != "") {
        email.nextElementSibling.innerHTML = "Veuillez saisir une adresse email valide.";
        return false;
    } else {
        email.nextElementSibling.innerHTML = "";
        return true;
    }
}

// Envoie du formulaire
document.getElementById("order").addEventListener("click", function (event) {
    event.preventDefault();
    //Si tous les éléments du formulaire sont corrects
    if (verificationFirstName(firstName) && verificationLastName(lastName) && verificationAddress(address) && verificationCity(city) && verificationEmail(email)) {
        //Recupération des ID des produits du panier (le seul élément a devoir être envoyé vers serveur)
        function recupIdProduct() {
            let idProduct = [];
            for (let i = 0; i < panier.length; i++) {
                id = panier[i].productID;
                idProduct.push(id);
            }
            return idProduct;
        }
        //déclaration d'une variable contenant les ID
        let productID = recupIdProduct();

        //création de l'objet commande (contenant les infos du client + id des produits commandé)
        let commande = {
            contact: {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value,
            },
            products: productID,
        };

        // Création de l'entête de la requête
        let options = {
            method: "POST",
            body: JSON.stringify(commande),
            headers: { "Content-Type": "application/json" },
        };
        fetch("http://localhost:3000/api/products/order", options)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                localStorage.clear();
                let orderId = data.orderId;
                window.location.assign(`confirmation.html?orderId=${orderId}`);
            });
    }
});
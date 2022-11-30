// 

import {fetchAPI} from "./fetch.js";

//

let params = new URL(document.location).searchParams;
let idProduit = params.get("id");

// Fonction d'affichage du produit

const afficherProduit = async function () {
    const produit = await fetchAPI(`http://localhost:3000/api/products/${idProduit}`);
    let choixCouleur = document.getElementById("colors");
    document.querySelector(".item__img").innerHTML = `<img src="${produit.imageUrl}" alt="${produit.altTxt}">`;
    document.getElementById("title").textContent = produit.name;
    document.getElementById("price").textContent = produit.price;
    document.getElementById("description").textContent = produit.description;
    produit.colors.forEach((option) => {
        choixCouleur.innerHTML += `<option value="${option}">${option}</option>`;
    });
};

//Affichage du produit

afficherProduit();

//Selection du bouton ajouter au panier

let cartButton = document.getElementById("addToCart");

//Ajouter produit au panier lors du click

cartButton.addEventListener("click", function (eventClick) {
    if (document.getElementById("colors").value == "") {
        alert("Veuillez sélectionnez une couleur");
        eventClick.preventDefault();
    } else {
        // Select des elements à mettre dans le panier
        let image = document.querySelector("body > main > div > section > article > div.item__img > img").src;
        let imageAlt = document.querySelector("body > main > div > section > article > div.item__img > img").alt;
        let name = document.getElementById("title").textContent;
        let price = document.getElementById("price").textContent + "€";
        let choixOpt = document.getElementById("colors").value;
        let productID = idProduit;
        //transformation du type of qty
        let qty_chiffre = document.getElementById("quantity").value;
        let qty = Number(qty_chiffre);

        //pour tester la boucle et l'arreter
        let boucle = 0;

        // ajout des elt du panier dans un tableau
        let eltPanier = { image, imageAlt, name, price, choixOpt, qty, productID };

        //Déclaration au format js de la clé produit stocké dans le local storage
        let panier = JSON.parse(localStorage.getItem("produit"));

        //Si le localstorage est vide, on créer tableau, on push le panier dedans et on stock dans localStorage
        if (!panier) {
            panier= [];
            panier.push(eltPanier);
            localStorage.setItem("produit", JSON.stringify(panier));
        }
        //Avant de stock dans local storage, on verifie si nom et option sont =, si = alors on incremente qty
        else {
            panier.forEach((article) => {
                if (article.name === name && article.choixOpt === choixOpt) {
                    article.qty += qty;
                    boucle = 1;
                }
            });
        
            //Si pas égale, on stop la boucle et on push le panier dans local storage
            if (boucle == 0) {
                panier.push(eltPanier);
            }

            localStorage.setItem("produit", JSON.stringify(panier));
        }

        if (qty > 1) {
            alert(`Vous avez ajouté ${qty} articles au panier`);
        } else if (qty == 1) {
            alert(`Vous avez ajouté ${qty} article au panier`);
        }
    }
});
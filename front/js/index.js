// Récupérer l'API
import {fetchAPI} from "./fetch.js";

// Fonction d'affichage des produits
async function afficherProduits() {
  const produits = await fetchAPI("http://localhost:3000/api/products");
  const locationProduits = document.getElementById("items");
  produits.forEach((produit) => {
    locationProduits.innerHTML += `
            <a href="./product.html?id=${produit._id}">
                <article>
                    <img src="${produit.imageUrl}" alt="${produit.altTxt}">
                    <h3 class="productName">${produit.name}</h3>
                    <p class="productDescription">${produit.description}</p>
                </article>
            </a>`;
  });
}

// Affichage des produits

afficherProduits();
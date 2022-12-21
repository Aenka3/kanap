// Import de la fonction fetch.
import {fetchAPI} from "./fetch.js";

// Fonction d'affichage des produits
async function afficherProduits() {
  // On fait usage de la fonction fetch pour récupérer la data de tous les produits.
  const produits = await fetchAPI("http://localhost:3000/api/products");
  // On cible l'élément HTML qui va contenir les cartes des produits
  const locationProduits = document.getElementById("items");
  // faire une boucle sur les produits
  produits.forEach((produit) => {
    // créer des éléments HTML pour chaque produit
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
// Faire un appel vers l'API et extraire les données qui se trouve dans la partie json.
export const fetchAPI = async function (url) {
    const result = await fetch(url);
    const data = await result.json();
    return data;
  };
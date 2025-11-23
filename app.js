// 1. searchPokemon() (Buscar Pokémon):


let currentPokemon = null;

// DOM
const input = document.getElementById("pokemonInput")
const btnSearch = document.getElementById("btnSearch")
const resultado = document.getElementById("resultado")
const favorito = document.getElementById("favorito")
const favoritosdiv = document.getElementById("favoritos")

btnSearch.addEventListener("click", searchPokemon);
favorito.addEventListener("click", saveFavorite);

async function searchPokemon() {
    const pokemonName = input.value.toLowerCase().trim();

    if (pokemonName === "") {
        alert("Por favor ingresa un nombre de Pokémon.");
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        
        if (!response.ok) {
            alert("Pokémon no encontrado.");
            return;
        }

        const data = await response.json();
        currentPokemon = data;

        resultado.innerHTML = `
            <h2>${data.name.toUpperCase()}</h2>
            <img src="${data.sprites.front_default}" alt="${data.name}">
        `;

        favorito.style.display = "inline-block";

    } catch (error) {
        alert("Ocurrió un error al buscar el Pokémon.");
        console.error(error);
    }
}

// 2. saveFavorite() (Guardar favorito):


function saveFavorite() {

    if (!currentPokemon) {
        alert("Primero debes buscar un Pokémon.");
        return;
    }

    let favoritos = JSON.parse(localStorage.getItem("pokeFavorites")) || [];

    if (favoritos.some(p => p.name === currentPokemon.name)) {
        alert("Ese Pokémon ya está en favoritos.");
        return;
    }

    favoritos.push({
        name: currentPokemon.name,
        image: currentPokemon.sprites.front_default
    });

    localStorage.setItem("pokeFavorites", JSON.stringify(favoritos));

    updateFavoritesList();

    alert("Pokémon agregado a favoritos.");
}



// 3. updateFavoritesList() (Actualizar lista de favoritos):
// •Lee los favoritos de localStorage (con JSON.parse()).
// •Borra el contenido anterior del <div id="favoritos">.
// •Por cada Pokémon en la lista:
// •Crea un elemento (ej: <div> con su imagen y nombre).
// •Lo añade al <div id="favoritos">.
// •Al cargar la página:
// •Llama a updateFavoritesList() para mostrar los favoritos guardados.
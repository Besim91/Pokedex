let currentPokemon = [];
let totalLoadedPokemon = 0;

async function loadPokemon() {
  let startIndex = totalLoadedPokemon;
  let endIndex = Math.min(totalLoadedPokemon + 30, 151);

  for (let i = startIndex; i < endIndex; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${kanto_pokemon[i]}`;
    let response = await fetch(url);
    let pokemon = await response.json();
    currentPokemon.push(pokemon);
    renderPokemon(pokemon);
  }

  totalLoadedPokemon = endIndex;
}

async function loadMorePokemon() {
  let remainingPokemon = Math.min(151 - totalLoadedPokemon, 30);
  let endIndex = totalLoadedPokemon + remainingPokemon;

  for (let i = totalLoadedPokemon; i < endIndex; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${kanto_pokemon[i]}`;
    try {
      let response = await fetch(url);
      let pokemon = await response.json();
      currentPokemon.push(pokemon);
      renderPokemon(pokemon);
    } catch (error) {
      console.error("Error loading Pokemon:", error);
    }
  }
  totalLoadedPokemon = endIndex;
}

function renderPokemon(pokemon) {
  let imgPokemonFront = pokemon.sprites.other["official-artwork"].front_default;

  let pokeContainer = document.getElementById("pokeContainer");
  pokeContainer.innerHTML += `<div onclick="showPokemon(${
    pokemon.id - 1
  })" class="pokemonIntroCard" style="filter: drop-shadow(0 0 10px ${findeBackgroundColor(
    pokemon
  )}); border: solid 3px ${findeBackgroundColor(pokemon)};">
  <img src="${imgPokemonFront}" class="imagePokemonIntro" alt="">
  </div>`;
}

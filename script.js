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
    await renderPokemon(pokemon, i);
    renderPokemonTypes(pokemon, i);
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

function renderPokemon(pokemon, i) {
  let imgPokemonFront = pokemon.sprites.other["official-artwork"].front_default;

  let pokeContainer = document.getElementById("pokeContainer");
  pokeContainer.innerHTML += `<div onclick="showPokemon(${
    pokemon.id - 1
  })" class="pokemonIntroCard" style="filter: drop-shadow(0 0 10px ${findeBackgroundColor(
    pokemon
  )}); border: solid 3px ${findeBackgroundColor(
    pokemon
  )}" id="pokemonIntroCard${i}">
  <img src="${imgPokemonFront}" class="imagePokemonIntro" alt="">

    <svg class="svg" width="260px" height="150px">
    <path id="curve" d="M 0 120 C 0 120, 130 0, 260 120"></path>
    <text class="textCurve" text-anchor="middle">
      <textPath class="textPathCurve" href="#curve" startOffset="50%">${
        pokemon.name
      }</textPath>
    </text>
    </svg>
  </div>`;
}

{
  /* <div class="PokemonNameIntro"> */
}
function renderPokemonTypes(pokemon, i) {
  document.getElementById(
    `pokemonIntroCard${i}`
  ).innerHTML += `<div class="typeContainerIntroCard" id="typeContainerIntroCard${i}"></div>`;

  for (let j = 0; j < pokemon["types"].length; j++) {
    let pokemonIntroCard = document.getElementById(
      `typeContainerIntroCard${i}`
    );
    let type = pokemon["types"][j]["type"]["name"];

    if (pokemonTypes.includes(type)) {
      let indexType = pokemonTypes.indexOf(type);
      pokemonIntroCard.innerHTML += `<div class="typeIcon"><img src="${typeIcons[indexType]}" alt=""></div>`;
    }
  }
}

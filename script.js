let pokemonTypes = [
  "water",
  "electric",
  "fire",
  "grass",
  "poison",
  "bug",
  "flying",
  "normal",
  "ground",
  "fairy",
  "fighting",
  "psychic",
  "rock",
  "ice",
  "ghost",
  "dragon",
];

let backgroundColors = [
  "rgb(104,144,240,0.7)",
  "rgb(248,208,48,0.7)",
  "rgb(240,128,48,0.7)",
  "rgb(120,200,80,0.7)",
  "rgb(160,64,160,0.7)",
  "rgb(168,184,32,0.7)",
  "rgb(168,144,240,0.7)",
  "rgb(168,168,120,0.7)",
  "rgb(224,192,104,0.7)",
  "rgb(238,153,172,0.7)",
  "rgb(192,48,40,0.7)",
  "rgb(248,88,136,0.7)",
  "rgb(184,160,56,0.7)",
  "rgb(152,216,216,0.7)",
  "rgb(112,88,152,0.7)",
  "rgb(112,56,248,0.7)",
];

let currentPokemon;

async function loadPokemon() {
  let url = "https://pokeapi.co/api/v2/pokemon/pikachu";
  let response = await fetch(url);
  currentPokemon = await response.json();
  console.log(currentPokemon);
  loadCard();
  loadPokemonName();
  loadPokemonImage();
  loadPokemonId();
  loadPokemonType();
  loadPokemonDimensions();
}

function loadCard() {
  findeBackgroundColor();
  let pokeCard = document.getElementById("card");
  pokeCard.innerHTML += `
  <div style="background-color: ${findeBackgroundColor()}" id="container"> <img id="imagePokemon" alt=""></div>
  <div id="informationPokemon"></div>`;
}

function findeBackgroundColor() {
  let pokeType = currentPokemon["types"]["0"]["type"]["name"];
  let backgroundColor;
  if (pokemonTypes.includes(pokeType)) {
    let indexType = pokemonTypes.indexOf(pokeType);
    backgroundColor = backgroundColors[indexType];
  }
  return backgroundColor;
}

function loadPokemonName() {
  document.getElementById(
    "container"
  ).innerHTML += `<div class="name">${currentPokemon["name"]}</div>`;
}
function loadPokemonId() {
  document.getElementById(
    "container"
  ).innerHTML += `<div class="id"># ${currentPokemon["id"]}</div>`;
}
function loadPokemonImage() {
  let imgPokemonFront =
    currentPokemon["sprites"]["other"]["official-artwork"]["front_default"];
  document.getElementById("imagePokemon").src = imgPokemonFront;
}

function loadPokemonType() {
  let pokeTypes = currentPokemon["types"];

  document.getElementById(
    "container"
  ).innerHTML += `<div id="typesContainer"></div>`;

  for (let i = 0; i < pokeTypes.length; i++) {
    document.getElementById(
      "typesContainer"
    ).innerHTML += `<div class="type">${pokeTypes[i]["type"]["name"]}</div>`;
  }
}

function loadPokemonDimensions() {
  let height = Number(currentPokemon["height"]) / 10;
  let weight = Number(currentPokemon["weight"]) / 10;

  document.getElementById(
    "informationPokemon"
  ).innerHTML += `<div  class="diemensionsContainer"><div> Height: ${height} m </div>
  <div> Weight: ${weight} kg </div></div>`;
}

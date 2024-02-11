let currentPokemon;

async function loadPokemon() {
  let url = "https://pokeapi.co/api/v2/pokemon/pikachu";
  let response = await fetch(url);
  currentPokemon = await response.json();
  console.log(currentPokemon);
}

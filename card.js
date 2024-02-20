async function showPokemon(i) {
  let pokemon = kanto_pokemon[i];

  url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  let response = await fetch(url);
  pokemonX = await response.json();

  document.getElementById("blurContainer").classList.remove("d-none");
  loadCard(pokemonX);
  loadPokemonName(pokemonX);
  loadPokemonImage(pokemonX);
  loadPokemonId(pokemonX);
  loadPokemonType(pokemonX, "container");
  loadNavBar(pokemonX);
  loadStats(pokemonX);
  document.getElementById("card").classList.remove("d-none");
  loadSwitchArrows(pokemon);
}

function loadCard(pokemonX) {
  document.getElementById("card").innerHTML = "";
  let pokeCard = document.getElementById("card");
  pokeCard.innerHTML += `
    <div style="background-color: ${findeBackgroundColor(
      pokemonX
    )}" id="container"> <img id="imagePokemon" alt=""></div>
    <div id="informationPokemon"><div id="contentInformation"></div></div>`;
}

function findeBackgroundColor(pokemonX) {
  let pokeType = pokemonX["types"]["0"]["type"]["name"];
  let backgroundColor;
  if (pokemonTypes.includes(pokeType)) {
    let indexType = pokemonTypes.indexOf(pokeType);
    backgroundColor = backgroundColors[indexType];
  }
  return backgroundColor;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function loadPokemonName(pokemonX) {
  const capitalizedFirstLetterName = capitalizeFirstLetter(pokemonX["name"]);
  document.getElementById(
    "container"
  ).innerHTML += `<div class="name">${capitalizedFirstLetterName}</div>`;
}

function loadPokemonId(pokemonX) {
  document.getElementById(
    "container"
  ).innerHTML += `<div class="id"># ${pokemonX["id"]}</div>`;
}
function loadPokemonImage(pokemonX) {
  let imgPokemonFront =
    pokemonX["sprites"]["other"]["official-artwork"]["front_default"];
  document.getElementById("imagePokemon").src = imgPokemonFront;
}

function loadPokemonType(pokemonX, container) {
  document.getElementById(
    container
  ).innerHTML += `<div id="typesContainer" class="typesContainer"></div>`;

  for (let i = 0; i < pokemonX["types"].length; i++) {
    document.getElementById(
      "typesContainer"
    ).innerHTML += `<div class="type">${pokemonX["types"][i]["type"]["name"]}</div>`;
  }
}

function loadNavBar(pokemonX) {
  document.getElementById("informationPokemon").innerHTML += `
  <div class="navContainer">
    <button class="infos" style="background-color: ${findeBackgroundColor(pokemonX)}">Infos</button>
    <button class="moves" style="background-color: ${findeBackgroundColor(
      pokemonX
    )}">Moves</button>
    <button onclick="loadStatsChart(event)" class="stats" style="background-color: ${findeBackgroundColor(
      pokemonX
    )}">Stats</button>
  </div>`;
}
// function loadPokemonDimensions(pokemonX) {
//   let height = Number(pokemonX["height"]) / 10;
//   let weight = Number(pokemonX["weight"]) / 10;

//   document.getElementById(
//     "contentInformation"
//   ).innerHTML += `<div  class="diemensionsContainer"><div> Height: ${height} m </div>
//     <div> Weight: ${weight} kg </div></div>`;
// }

function loadStats(pokemonX) {
  statsDescription = [];
  statsValues = [];
  let pokemonStats = pokemonX["stats"];
  for (let i = 0; i < pokemonStats.length; i++) {
    let stat = pokemonStats[i]["stat"]["name"];
    let statValue = pokemonStats[i]["base_stat"];
    statsDescription.push(stat);
    statsValues.push(statValue);
  }
}

function loadStatsChart(event) {
  event.stopPropagation();
  document.getElementById("contentInformation").innerHTML += `<div">
    <canvas id="myChart"></canvas>
  </div>`;

  const ctx = document.getElementById("myChart");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: statsDescription,
      datasets: [
        {
          data: statsValues,
          borderWidth: 1,
        },
      ],
    },
    options: {
      indexAxis: "y",
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            display: false,
          },
          barThickness: 2,
        },
        y: {
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
      layout: {
        padding: {
          top: 10,
        },
      },
    },
  });
}

function loadSwitchArrows(pokemon) {
  let card = document.getElementById("card");
  card.innerHTML += `
  <div class="arrowContainer">
    <img onclick="switchPokemon('left', '${pokemon}')" class="leftArrow" src="./img/pfeilRechts.png" alt="">
    <img onclick="switchPokemon('right','${pokemon}')" class="rightArrow" src="./img/pfeilRechts.png" alt="">
  </div>`;
}

function switchPokemon(direction, pokemon) {
  switchForward(direction, pokemon);
  switchBackward(direction, pokemon);
}

function switchForward(direction, pokemon) {
  if (direction == "right") {
    let indexCurrentPokemon = kanto_pokemon.indexOf(pokemon);
    if (indexCurrentPokemon < 150) {
      let indexNextPokemonRight = indexCurrentPokemon + 1;
      showPokemon(indexNextPokemonRight);
    } else {
      let firstPokemon = (indexCurrentPokemon = 0);
      showPokemon(firstPokemon);
    }
  }
}

function switchBackward(direction, pokemon) {
  if (direction == "left") {
    let indexCurrentPokemon = kanto_pokemon.indexOf(pokemon);
    if (indexCurrentPokemon > 0) {
      let indexNextPokemonLeft = indexCurrentPokemon - 1;
      showPokemon(indexNextPokemonLeft);
    } else {
      let lastPokemon = (indexCurrentPokemon = 150);
      showPokemon(lastPokemon);
    }
  }
}

function closeCard() {
  document.getElementById("card").classList.add("d-none");
  document.getElementById("blurContainer").classList.add("d-none");
}

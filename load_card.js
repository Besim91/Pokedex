async function showPokemon(i) {
  let pokemon = kanto_pokemon[i];

  url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  let response = await fetch(url);
  pokemonX = await response.json();

  loadCard(pokemonX);
  loadPokemonName(pokemonX);
  loadPokemonImage(pokemonX);
  loadPokemonId(pokemonX);
  loadPokemonType(pokemonX);
  loadPokemonDimensions(pokemonX);
  loadStats(pokemonX);
  loadStatsChart();
  document.getElementById("card").classList.remove("d-none");
}

function loadCard(pokemonX) {
  document.getElementById("card").innerHTML = "";
  let pokeCard = document.getElementById("card");
  pokeCard.innerHTML += `
    <div style="background-color: ${findeBackgroundColor(
      pokemonX
    )}" id="container"> <img id="imagePokemon" alt=""></div>
    <div id="informationPokemon"></div>`;
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

function loadPokemonName(pokemonX) {
  document.getElementById(
    "container"
  ).innerHTML += `<div class="name">${pokemonX["name"]}</div>`;
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

function loadPokemonType(pokemonX) {
  let pokeTypes = pokemonX["types"];

  document.getElementById(
    "container"
  ).innerHTML += `<div id="typesContainer"></div>`;

  for (let i = 0; i < pokeTypes.length; i++) {
    document.getElementById(
      "typesContainer"
    ).innerHTML += `<div class="type">${pokeTypes[i]["type"]["name"]}</div>`;
  }
}

function loadPokemonDimensions(pokemonX) {
  let height = Number(pokemonX["height"]) / 10;
  let weight = Number(pokemonX["weight"]) / 10;

  document.getElementById(
    "informationPokemon"
  ).innerHTML += `<div  class="diemensionsContainer"><div> Height: ${height} m </div>
    <div> Weight: ${weight} kg </div></div>`;
}

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

function loadStatsChart() {
  document.getElementById("informationPokemon").innerHTML += `<div">
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

function closeCard() {
  document.getElementById("card").classList.add("d-none");
}

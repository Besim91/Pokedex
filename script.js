let currentPokemon;

async function loadPokemon() {
  let url;
  for (let i = 0; i < 10; i++) {
    url = `https://pokeapi.co/api/v2/pokemon/${kanto_pokemon[i]}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    renderAllPokemon();
  }

  // loadCard();
  // loadPokemonName();
  // loadPokemonImage();
  // loadPokemonId();
  // loadPokemonType();
  // loadPokemonDimensions();
  // loadStats();
}

function renderAllPokemon() {
  let imgPokemonFront =
    currentPokemon["sprites"]["other"]["official-artwork"]["front_default"];

  let pokeContainer = document.getElementById("pokeContainer");
  pokeContainer.innerHTML += `<div  class="pokemonIntroCard"><img src="${imgPokemonFront}" class="imagePokemonIntro" alt=""></div>`;
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

function loadStats() {
  let pokemonStats = currentPokemon["stats"];

  for (let i = 0; i < pokemonStats.length; i++) {
    let stat = pokemonStats[i]["stat"]["name"];
    let statValue = pokemonStats[i]["base_stat"];
    statsDescription.push(stat);
    statsValues.push(statValue);
  }
  loadStatsChart();
}

function loadStatsChart() {
  document.getElementById("informationPokemon").innerHTML += `<div>
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

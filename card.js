async function showPokemon(i) {
  let pokemon = kanto_pokemon[i];
  url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  let response = await fetch(url);
  pokemonX = await response.json();
  console.log(pokemonX);
  document.getElementById("blurContainer").classList.remove("d-none");
  loadCard(pokemonX);
  loadPokemonName();
  loadPokemonImage();
  loadPokemonId();
  loadPokemonType("container");
  loadNavBar();
  loadStats();
  document.getElementById("card").classList.remove("d-none");
  loadSwitchArrows(pokemon);
}

function loadCard(pokemonX) {
  document.getElementById("card").innerHTML = "";
  let pokeCard = document.getElementById("card");
  pokeCard.insertAdjacentHTML(
    "beforeend",
    `
    <div style="background-color: ${findeBackgroundColor(
      pokemonX
    )}" id="container"> <img id="imagePokemon" alt=""></div>
    <div id="informationPokemon"><div id="contentInformation">Click on the buttons</div></div>`
  );
}

function loadPokemonName() {
  const capitalizedFirstLetterName = capitalizeFirstLetter(pokemonX["name"]);
  document.getElementById(
    "container"
  ).innerHTML += `<div class="name">${capitalizedFirstLetterName}</div>`;
}

function loadPokemonId() {
  document.getElementById(
    "container"
  ).innerHTML += `<div class="id"># ${pokemonX["id"]}</div>`;
}

function loadPokemonImage() {
  let imgPokemonFront =
    pokemonX["sprites"]["other"]["official-artwork"]["front_default"];
  document.getElementById("imagePokemon").src = imgPokemonFront;
}

function loadPokemonType(container) {
  document.getElementById(
    container
  ).innerHTML += `<div id="typesContainer" class="typesContainer"></div>`;
  for (let i = 0; i < pokemonX["types"].length; i++) {
    document.getElementById(
      "typesContainer"
    ).innerHTML += `<div class="type">${capitalizeFirstLetter(
      pokemonX["types"][i]["type"]["name"]
    )}</div>`;
  }
}

function loadNavBar() {
  document.getElementById("informationPokemon").innerHTML += `
  <div class="navContainer">
    <button onclick="loadPokemonInfos(event)" id="infos" style="background-color: ${findeBackgroundColor(
      pokemonX
    )}">Infos</button>
    <button onclick="loadPokemonMoves(event)" id="moves" style="background-color: ${findeBackgroundColor(
      pokemonX
    )}">Moves</button>
    <button onclick="loadStatsChart(event)" id="stats" style="background-color: ${findeBackgroundColor(
      pokemonX
    )}">Stats</button>
  </div>`;
}

function loadPokemonMoves(event) {
  event.stopPropagation();
  let attacks = document.getElementById("contentInformation");
  attacks.innerHTML = `
  <table id="attacksTable">
  </table>`;
  for (let i = 0; i < 4; i++) {
    document.getElementById("attacksTable").innerHTML += `
  <tr>${capitalizeFirstLetter(pokemonX.moves[i].move.name)}</tr>`;
  }
}

function loadPokemonInfos(event) {
  event.stopPropagation();
  let height = ((39 * Number(pokemonX["height"])) / 10).toFixed(2);
  let weight = ((2.2 * Number(pokemonX["weight"])) / 10).toFixed(2);
  document.getElementById("contentInformation").innerHTML = `
  ${loadPokemonInfoTable(height, weight)}`;
  for (let i = 0; i < pokemonX.abilities.length; i++) {
    let ability = document.getElementById("abilities");
    ability.innerHTML += `<td class ="ability">${capitalizeFirstLetter(
      pokemonX.abilities[i].ability.name
    )}</td>`;
  }
}

function loadPokemonInfoTable(height, weight) {
  return `<div  class="diemensionsContainer">
  <table><tr> <td><b>Height:</b></td> <td>${height} inches</td></tr>
  <tr> <td><b>Weight:</b></td> <td>${weight} lbs</td> </tr>
  <tr> <td><b>Base experience:</b></td> <td>${pokemonX.base_experience}</td> </tr>
  <tr id="abilities"> <td><b>Abilities:</b></td> </tr>
  </table></div>`;
}

function loadStats() {
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
  document.getElementById("contentInformation").innerHTML = `<div">
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

// BACKSIDE
const backside = document.querySelector(".backside-container");
const frontside = document.querySelector(".pokemon-container");
//container
const Container = document.querySelector(".card-container");
// NAME
let displayName = document.querySelector(".pokemon-name");
// HP
const displayHp = document.getElementById("hp");
// IMG
const displayImg = document.getElementById("pokemon-img");
// TYPE
const displayType = document.getElementById("type");
// ABILITY
// First ability
const displayFirstAttack = document.querySelector(".attack-one");
// Second ability
const displaySecondAttack = document.querySelector(".attack-two");

// click to change card event
let counter = 0;
Container.addEventListener("click", () => {
    counter++;
    getPokemonData().then((pokemonData) => {
        const getPokemonInformation = async () => {
            if (counter > pokemonData.results.length - 1) counter = 0;
            const infoFetch = await fetch(
                `${pokemonData.results[counter].url}`
            );
            const pokemonInformation = await infoFetch.json();
            return pokemonInformation;
        };
        getPokemonInformation().then((pokemonInformation) => {
            displayName.innerHTML = pokemonInformation.name;
            displayHp.innerHTML = pokemonInformation.stats[0].base_stat;
            displayImg.src =
                pokemonInformation.sprites.other[
                    "official-artwork"
                ].front_default;
            displayType.innerHTML = pokemonInformation.types[0].type.name;
            displayFirstAttack.innerHTML =
                pokemonInformation.abilities[0].ability.name;
            if (pokemonInformation.abilities.length > 1) {
                displaySecondAttack.innerHTML =
                    pokemonInformation.abilities[1].ability.name;
            } else {
                displaySecondAttack.innerHTML = "";
            }
        });
    });
});

// turn card event
backside.addEventListener("click", () => {
    backside.classList.add("turn-backside");
    frontside.classList.add("turn-frontside");
});
// fetch data
const getPokemonData = async () => {
    const pokemonFetch = await fetch("https://pokeapi.co/api/v2/pokemon");
    const pokemonData = await pokemonFetch.json();
    return pokemonData;
};

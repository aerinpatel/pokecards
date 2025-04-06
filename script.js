document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('pokemon-form');
    form.addEventListener('submit', callpokemon);
});


async function callpokemon(event) {
    event.preventDefault();

    const numCards = document.getElementById('number-of-cards').value;
    const pokemonType = document.getElementById('category').value;
    const pokemonContainer = document.getElementById('pokemon-cards');
    pokemonContainer.innerHTML = '';

    console.log(`Fetching ${numCards} Pokémon of type ${pokemonType}`);

    try {
        // Fetch Pokémon by type
        const typeResponse = await fetch(`https://pokeapi.co/api/v2/type/${pokemonType}`);
        if (!typeResponse.ok) {
            throw new Error(`Failed to fetch Pokémon type: ${typeResponse.statusText}`);
        }
        const typeData = await typeResponse.json();

        // Get a list of Pokémon for the specified type
        const pokemonList = typeData.pokemon.slice(0, numCards);

        // Fetch details for each Pokémon and render the cards
        for (const pokemon of pokemonList) {
            const pokemonResponse = await fetch(pokemon.pokemon.url);
            if (!pokemonResponse.ok) {
                throw new Error(`Failed to fetch Pokémon data: ${pokemonResponse.statusText}`);
            }
            const pokemonData = await pokemonResponse.json();

            const pokemonCard = document.createElement('div');
            pokemonCard.classList.add('card');
            pokemonCard.innerHTML = `
                <div class="card-image">
                    <img height="180rem" src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                </div>
                <div class="card-content">
                    <h2 class="card-title">${pokemonData.name}</h2>
                    <p>Height: ${pokemonData.height}</p>
                    <p>Weight: ${pokemonData.weight}</p>
                </div>
            `;
            pokemonContainer.appendChild(pokemonCard);
        }
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
    }
}


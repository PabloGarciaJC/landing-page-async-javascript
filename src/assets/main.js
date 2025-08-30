const API = 'https://pokeapi.co/api/v2/pokemon?limit=100';
const container = document.getElementById('pokemon-container');

async function fetchData(url) {
  const res = await fetch(url);
  return await res.json();
}

(async () => {
  try {
    const data = await fetchData(API);

    const pokemons = await Promise.all(
      data.results.map(async (p) => {
        const details = await fetchData(p.url);
        return {
          name: details.name,
          image: details.sprites.other['official-artwork'].front_default,
          height: details.height,
          weight: details.weight,
          types: details.types.map(t => t.type.name)
        };
      })
    );

    // Tipos que queremos mostrar
    const selectedTypes = ['electric', 'water', 'bug', 'fire', 'poison', 'flying', 'ground', 'psychic', 'rock'];

    // Agrupar Pokémon por tipo
    selectedTypes.forEach(type => {
      const list = pokemons.filter(p => p.types.includes(type)).slice(0, 4);
      if (list.length === 0) return;

      // Título de la sección
      const title = document.createElement("h2");
      title.className = "text-2xl font-extrabold tracking-tight text-gray-900 mt-8 mb-4 capitalize";
      title.textContent = `${type} Pokémon`;
      container.appendChild(title);

      // Contenedor grid
      const grid = document.createElement("div");
      grid.className = "grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8";
      container.appendChild(grid);

      // Añadir tarjetas usando el componente <poke-card>
      list.forEach(p => {
        const card = document.createElement("poke-card");
        card.data = {
          name: p.name,
          image: p.image,
          height: p.height,
          weight: p.weight,
          types: p.types
        };
        grid.appendChild(card);
      });
    });

  } catch (error) {
    console.error(error);
    container.innerHTML = `<p class="text-red-500">Error al cargar los Pokémon</p>`;
  }
})();

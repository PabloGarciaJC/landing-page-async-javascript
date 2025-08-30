const API = 'https://pokeapi.co/api/v2/pokemon?limit=100'; // Más Pokémon para asegurar que haya suficientes
const container = document.getElementById('pokemon-container');

async function fetchData(url) {
  const res = await fetch(url);
  return await res.json();
}

(async () => {
  try {
    const data = await fetchData(API);

    const pokemons = await Promise.all(data.results.map(async (p) => {
      const details = await fetchData(p.url);
      return {
        name: details.name,
        image: details.sprites.front_default,
        height: details.height,
        weight: details.weight,
        types: details.types.map(t => t.type.name)
      };
    }));

    // Tipos que queremos mostrar
    const selectedTypes = ['electric', 'water', 'bug', 'fire', 'poison', 'flying', 'ground', 'psychic', 'rock'];

    // Agrupar Pokémon por tipo seleccionado
    const grouped = {};
    selectedTypes.forEach(type => {
      grouped[type] = pokemons.filter(p => p.types.includes(type)).slice(0, 4);
    });

    // Generar HTML
    let html = '';
    for (const type of selectedTypes) {
      if (!grouped[type] || grouped[type].length === 0) continue;
      html += `
        <h2 class="text-2xl font-extrabold tracking-tight text-gray-900 mt-8 mb-4 capitalize">${type} Pokémon</h2>
        <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      `;

      grouped[type].forEach(p => {
        html += `
          <article class="group relative border p-4 rounded-md shadow hover:shadow-lg transition">
           <div class="w-full bg-gray-200 aspect-square rounded-md overflow-hidden flex items-center justify-center">
              <img src="${p.image}" alt="${p.name}" class="w-full h-full object-contain">
           </div>
            <div class="mt-2">
              <h3 class="text-sm font-semibold text-gray-800 capitalize">${p.name}</h3>
              <p class="text-gray-600 text-xs mt-1">Altura: ${p.height} | Peso: ${p.weight}</p>
            </div>
          </article>
        `;
      });

      html += `</div>`;
    }

    container.innerHTML = html;

  } catch (error) {
    console.error(error);
    container.innerHTML = `<p class="text-red-500">Error al cargar los Pokémon</p>`;
  }

})();

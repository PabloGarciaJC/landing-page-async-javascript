const API = 'https://pokeapi.co/api/v2/pokemon?limit=40'; // Más Pokémon para asegurar que haya 4 por tipo
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

    // Agrupar por tipo principal y limitar a 4 Pokémon por tipo
    const grouped = {};
    pokemons.forEach(p => {
      const mainType = p.types[0];
      if (!grouped[mainType]) grouped[mainType] = [];
      if (grouped[mainType].length < 4) grouped[mainType].push(p); // Solo 4
    });

    // Generar HTML
    let html = '';
    for (const type in grouped) {
      html += `
        <h2 class="text-2xl font-extrabold tracking-tight text-gray-900 mt-8 mb-4 capitalize">${type} Pokémon</h2>
        <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      `;

      grouped[type].forEach(p => {
        html += `
          <article class="group relative border p-4 rounded-md shadow hover:shadow-lg transition">
            <div class="w-full bg-gray-200 aspect-w-16 aspect-h-9 rounded-md overflow-hidden flex items-center justify-center">
              <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover">
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
    container.innerHTML = `<p class="text-red-500">Error al cargar los Pokémon 😢</p>`;
  }
})();

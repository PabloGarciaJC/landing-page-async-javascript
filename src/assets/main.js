
import '../style.css';       // tus estilos globales
import 'pokemon-card-component'; // tu componente con su propio CSS

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

    const selectedTypes = ['electric', 'water', 'bug', 'fire', 'poison', 'flying', 'ground', 'psychic', 'rock'];

    selectedTypes.forEach(type => {
      const list = pokemons.filter(p => p.types.includes(type)).slice(0, 4);
      if (!list.length) return;

      const sectionHTML = document.createElement('div');
      sectionHTML.innerHTML = `
        <h2 class="text-2xl font-extrabold tracking-tight text-gray-900 mt-8 mb-4 capitalize">
          ${type} Pokémon
        </h2>
        <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8" id="grid-${type}">
        </div>
      `;
      container.appendChild(sectionHTML);

      const grid = sectionHTML.querySelector(`#grid-${type}`);

      list.forEach(p => {
        if (customElements.get('pokemon-card')) {
          // Con Componente
          const card = document.createElement('pokemon-card');
          card.data = p;
          grid.appendChild(card);
        } else {
          // Sin Componente
          grid.innerHTML += `
          <article class="group relative border-2 border-gray-300 p-4 rounded-xl shadow-md hover:shadow-lg transition bg-gray-50">
            <div class="w-full bg-gray-200 aspect-square rounded-lg overflow-hidden flex items-center justify-center">
              <img src="${p.image}" alt="${p.name}" class="w-full h-full object-contain transition-transform duration-200 ease-out group-hover:scale-105">
            </div>
            <div class="mt-3">
              <h3 class="text-base font-bold text-gray-800 capitalize">${p.name}</h3>
              <p class="text-gray-600 text-xs mt-1">Altura: ${p.height} | Peso: ${p.weight}</p>
              <div class="mt-2 flex flex-wrap gap-1">
                ${p.types.map(t => `<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border bg-gray-300 text-gray-800 capitalize">${t}</span>`).join(' ')}
              </div>
            </div>
          </article>
          `;
        }
      });
    });

  } catch (error) {
    console.error(error);
    container.innerHTML = `<p class="text-red-500">Error al cargar los Pokémon</p>`;
  }
})();

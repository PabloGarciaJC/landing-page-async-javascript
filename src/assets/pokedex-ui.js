// /*! PokedexUI v1 - Web Component + API global sin Shadow DOM */
// (function (root, factory) {
//   // Compatibilidad UMD: exporta como módulo (Node) o en el objeto global (navegador)
//   if (typeof module === "object" && module.exports) module.exports = factory();
//   else root.PokedexUI = factory();
// })(this, function () {
//   // Estilos Tailwind para cada tipo de Pokémon
//   const TYPE_STYLES = {
//     electric: "bg-yellow-100 text-yellow-800 border-yellow-300",
//     water: "bg-blue-100 text-blue-800 border-blue-300",
//     bug: "bg-lime-100 text-lime-800 border-lime-300",
//     fire: "bg-orange-100 text-orange-800 border-orange-300",
//     poison: "bg-purple-100 text-purple-800 border-purple-300",
//     flying: "bg-sky-100 text-sky-800 border-sky-300",
//     ground: "bg-amber-100 text-amber-800 border-amber-300",
//     psychic: "bg-pink-100 text-pink-800 border-pink-300",
//     rock: "bg-stone-100 text-stone-800 border-stone-300",
//     grass: "bg-green-100 text-green-800 border-green-300",
//     normal: "bg-gray-100 text-gray-800 border-gray-300",
//     ghost: "bg-violet-100 text-violet-800 border-violet-300",
//     ice: "bg-cyan-100 text-cyan-800 border-cyan-300",
//     dragon: "bg-indigo-100 text-indigo-800 border-indigo-300",
//     steel: "bg-slate-100 text-slate-800 border-slate-300",
//     dark: "bg-neutral-100 text-neutral-800 border-neutral-300",
//     fairy: "bg-rose-100 text-rose-800 border-rose-300",
//     fighting: "bg-red-100 text-red-800 border-red-300",
//     default: "bg-gray-100 text-gray-800 border-gray-300",
//   };

//   // Genera el HTML de una "badge" de tipo (Agua, Fuego, etc.)
//   const badge = (t) => {
//     const cls = TYPE_STYLES[t] || TYPE_STYLES.default;
//     return `<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${cls} capitalize">${t}</span>`;
//   };

//   // Normaliza los datos: asegura nombre, imagen, altura, peso y tipos en array
//   function normalizeData(d) {
//     return {
//       name: d?.name ?? "",
//       image: d?.image ?? d?.img ?? "",
//       height: d?.height ?? "",
//       weight: d?.weight ?? "",
//       types: Array.isArray(d?.types)
//         ? d.types
//         : (d?.types || "")
//             .split(",")
//             .map((s) => s.trim())
//             .filter(Boolean),
//     };
//   }

//   // Crea el HTML de una tarjeta de Pokémon a partir de datos normalizados
//   function createCard(raw) {
//     const d = normalizeData(raw);
//     const el = document.createElement("article");
//     el.className =
//       "group relative border p-4 rounded-xl shadow hover:shadow-lg transition bg-white/90";
//     el.innerHTML = `
//       <div class="w-full bg-gray-100 aspect-square rounded-lg overflow-hidden flex items-center justify-center">
//         <img src="${d.image}" alt="${d.name}" class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200 ease-out">
//       </div>
//       <div class="mt-3">
//         <h3 class="text-base font-bold text-gray-900 capitalize">${d.name}</h3>
//         <p class="text-gray-600 text-xs mt-1">Altura: ${d.height} | Peso: ${d.weight}</p>
//         <div class="mt-2 flex flex-wrap gap-1">
//           ${d.types.map(badge).join("")}
//         </div>
//       </div>
//     `;
//     return el;
//   }

//   // Definición del Web Component <poke-card>
//   class PokeCard extends HTMLElement {
//     // Atributos que el componente "escucha" en el DOM
//     static get observedAttributes() {
//       return ["name", "img", "height", "weight", "types"];
//     }
//     constructor() {
//       super();
//       this._data = null; // almacena los datos del Pokémon
//     }
//     // Setter para asignar datos directamente desde JS
//     set data(val) {
//       this._data = normalizeData(val);
//       this.render();
//     }
//     get data() {
//       return this._data;
//     }
//     // Se ejecuta cuando el elemento entra al DOM
//     connectedCallback() {
//       this.render();
//     }
//     // Se ejecuta cuando cambian atributos (ej: <poke-card name="pikachu">)
//     attributeChangedCallback() {
//       this.render();
//     }
//     // Renderiza la tarjeta o un skeleton si falta info
//     render() {
//       const d =
//         this._data ||
//         normalizeData({
//           name: this.getAttribute("name"),
//           img: this.getAttribute("img"),
//           height: this.getAttribute("height"),
//           weight: this.getAttribute("weight"),
//           types: this.getAttribute("types"),
//         });

//       // Skeleton (caja gris animada) si faltan datos básicos
//       if (!d.name || !d.image) {
//         this.innerHTML = `<div class="animate-pulse h-64 rounded-xl bg-gray-200"></div>`;
//         return;
//       }
//       const card = createCard(d);
//       this.replaceChildren(card);
//     }
//   }

//   // Registra el componente <poke-card> si no está definido ya
//   if (!customElements.get("poke-card")) {
//     customElements.define("poke-card", PokeCard);
//   }

//   // Devuelve API global por si se quiere usar manualmente
//   return { createCard, PokeCard };
// });

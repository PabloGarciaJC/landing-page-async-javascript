let menuBtn = document.getElementById("menu-btn");
let menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
    if (menu.classList.contains("hidden")) {
        menu.classList.remove("hidden");
        // Forzar reflow para que la transición funcione
        menu.offsetHeight;
        menu.classList.remove("opacity-0", "scale-95");
        menu.classList.add("opacity-100", "scale-100");
    } else {
        menu.classList.remove("opacity-100", "scale-100");
        menu.classList.add("opacity-0", "scale-95");
        // Esperar el tiempo de transición para ocultar el menú
        setTimeout(() => {
            menu.classList.add("hidden");
        }, 300); // coincide con duration-300
    }
});

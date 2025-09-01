# Pokédex por Tipo – Tailwind & PokéAPI  

Landing Page desarrollada con **HTML5**, **TailwindCSS** y **JavaScript Vanilla** que consume la **[PokéAPI](https://pokeapi.co/)** para mostrar Pokémon organizados por tipos.  

---

## Demo del Proyecto

[https://landing-page-async-javascript/](https://landing-page-async-javascript.pablogarciajc.com/)

| ![Imagen 1](https://pablogarciajc.com/wp-content/uploads/2025/09/pokedex_1.webp) | ![Imagen 2](https://pablogarciajc.com/wp-content/uploads/2025/09/pokedex_2.webp) |
|-----------|-----------|

---

## Funcionalidades principales  

- Menú de navegación adaptable para dispositivos móviles y escritorio.  
- Sección principal con Pokémon destacados en animación flotante.  
- Listado dinámico de Pokémon **por tipo** (eléctrico, agua, fuego, etc.).  
- Uso de **Web Components** (`<pokemon-card>`) para mostrar información detallada de cada Pokémon (imagen, altura, peso y tipos).  
- Estilo responsivo con **TailwindCSS** y animaciones integradas.  
- Manejo de errores al consumir la API.  
- Consumo de datos con **async/await** para un flujo más claro y eficiente en las llamadas a la API.  

---

## Tecnologías utilizadas  

- **HTML5 semántico**.  
- **TailwindCSS** (con CDN).  
- **JavaScript (ES Modules)**.  
- **Async/Await** → manejo moderno de asincronía para consumir la PokéAPI.  
- **Web Components** → creación de componentes reutilizables (`<pokemon-card>`).  
- **PokéAPI** como fuente de datos oficiales de Pokémon.  

---

## Web Component y paquete npm

He desarrollado un **componente personalizado** para mostrar tarjetas de Pokémon con información detallada (imagen, altura, peso y tipos). Este componente es de **mi autoría** y además está **publicado como paquete npm**, lo que permite reutilizarlo fácilmente en cualquier proyecto web.

- **Nombre del paquete:** `pokemon-card-component`  
- **Página npm:** [https://www.npmjs.com/package/pokemon-card-component](https://www.npmjs.com/package/pokemon-card-component)  

### Ventajas del componente

- **Modularidad:** cada Pokémon se renderiza en su propia tarjeta con datos dinámicos.  
- **Reutilización:** puede insertarse en distintas secciones del mismo proyecto o en otros proyectos web gracias al paquete npm.  
- **Encapsulación:** la lógica de renderizado y los estilos están contenidos dentro del Web Component.  
- **Compatibilidad:** funciona con **Vanilla JS**, **React** u otros frameworks que soporten Web Components.  

---

## Instalación

### Requisitos Previos

- Tener **Docker** y **Docker Compose** instalados.  
- **Make**: Utilizado para automatizar procesos y gestionar contenedores de manera más eficiente.  

### Pasos de Instalación

1. Clona el repositorio desde GitHub.  
2. Dentro del repositorio, encontrarás un archivo **Makefile** que contiene los comandos necesarios para iniciar y gestionar tu aplicación.  
3. Usa los siguientes comandos de **Make** para interactuar con la aplicación:  

   - **`make init-app`**: Inicializa los contenedores y configura la aplicación.  
   - **`make up`**: Levanta la aplicación y sus contenedores asociados.  
   - **`make down`**: Detiene los contenedores y apaga la aplicación.  
   - **`make shell`**: Ingresa al contenedor para interactuar directamente con el sistema en su entorno de ejecución.  
   - **`make compile-sass`**: Compila Sass.  

4. Además de estos comandos, dentro del archivo **Makefile** puedes encontrar otros comandos que te permitirán interactuar de manera más específica con los contenedores y los diferentes servicios que conforman la aplicación.  

5. Accede a los siguientes URL:  
   - **Aplicación Web**: [http://localhost:8081/](http://localhost:8081/)  
   - **PhpMyAdmin**: [http://localhost:8082/](http://localhost:8082/)  

---

## Contáctame / Sígueme en mis redes sociales  

| Red Social   | Descripción                                              | Enlace                   |
|--------------|----------------------------------------------------------|--------------------------|
| **Facebook** | Conéctate y mantente al tanto de mis actualizaciones.    | [Presiona aquí](https://www.facebook.com/PabloGarciaJC) |
| **YouTube**  | Fundamentos de la programación, tutoriales y noticias.   | [Presiona aquí](https://www.youtube.com/@pablogarciajc) |
| **Página Web** | Más información sobre mis proyectos y servicios.        | [Presiona aquí](https://pablogarciajc.com/)              |
| **LinkedIn** | Sigue mi carrera profesional y establece conexiones.     | [Presiona aquí](https://www.linkedin.com/in/pablogarciajc) |
| **Instagram**| Fotos, proyectos y contenido relacionado.                 | [Presiona aquí](https://www.instagram.com/pablogarciajc) |
| **Twitter/X**| Proyectos, pensamientos y actualizaciones.                | [Presiona aquí](https://x.com/PabloGarciaJC)   |

---

> _"El buen manejo de tus finanzas hoy construye la seguridad del mañana."_  

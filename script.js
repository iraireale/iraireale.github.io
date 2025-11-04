/* 
  script.js
  Este script carga automáticamente los posts desde las carpetas "ficcion" y "no-ficcion"
  y los muestra en la página principal.
*/

document.addEventListener("DOMContentLoaded", () => {
  const postsContainer = document.getElementById("posts-container");

  // Configuramos las categorías que queremos mostrar
  const categorias = [
    { nombre: "Ficción", carpeta: "ficcion" },
    { nombre: "No ficción / Ensayística", carpeta: "no-ficcion" }
  ];

  categorias.forEach(cat => {
    // Creamos un contenedor para cada categoría
    const section = document.createElement("section");
    const titulo = document.createElement("h2");
    titulo.textContent = cat.nombre;
    section.appendChild(titulo);

    // Creamos una lista donde se mostrarán los posts
    const lista = document.createElement("ul");
    section.appendChild(lista);

    // Pedimos el contenido del directorio correspondiente
    fetch(cat.carpeta)
      .then(response => response.text())
      .then(data => {
        // Usamos una expresión regular para encontrar los enlaces a los archivos HTML
        const archivos = [...data.matchAll(/href="([^"]+\.html)"/g)].map(m => m[1]);

        // Para cada archivo encontrado, creamos un enlace en la lista
        archivos.forEach(archivo => {
          const li = document.createElement("li");
          const link = document.createElement("a");
          link.href = `${cat.carpeta}/${archivo}`;
          
          // Convertimos el nombre del archivo en un título legible
          const nombreLimpio = archivo
            .replace(/^\d{4}-\d{2}-\d{2}-/, "") // quitamos la fecha
            .replace(/-/g, " ")                // cambiamos guiones por espacios
            .replace(".html", "");             // quitamos la extensión
          
          link.textContent = nombreLimpio.charAt(0).toUpperCase() + nombreLimpio.slice(1);
          li.appendChild(link);
          lista.appendChild(li);
        });
      });

    postsContainer.appendChild(section);
  });
});

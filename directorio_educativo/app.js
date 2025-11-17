const recursos = [
  {
    nombre: "Curso de Programación Básica",
    tipo: "Curso corto",
    area: "Tecnología",
    enlace: "https://www.misiontic2022.gov.co/portal/"
  },
  {
    nombre: "Técnico en Desarrollo de Software",
    tipo: "Técnico",
    area: "Tecnología",
    enlace: "https://www.sena.edu.co/"
  },
  {
    nombre: "Taller de Habilidades Blandas",
    tipo: "Curso corto",
    area: "Desarrollo personal",
    enlace: "https://www.colombiaaprende.edu.co/"
  },
  {
    nombre: "Tecnólogo en Análisis de Datos",
    tipo: "Tecnólogo",
    area: "Tecnología",
    enlace: "https://oferta.senasofiaplus.edu.co/"
  },
  {
    nombre: "Técnico en Atención Infantil",
    tipo: "Técnico",
    area: "Educación",
    enlace: "https://sena.edu.co/"
  }
];

const lista = document.getElementById("lista-recursos");
const buscador = document.getElementById("buscar");
const btn = document.getElementById("buscarBtn");
const filtro = document.getElementById("filtro");

let recursosFiltrados = [];

function mostrarRecursos(texto = "", categoria = "todos") {
  lista.innerHTML = "";

  // Aplicar filtros
  recursosFiltrados = recursos.filter(r => {
    const coincideTexto = r.nombre.toLowerCase().includes(texto.toLowerCase());
    const coincideCategoria = categoria === "todos" || r.tipo.toLowerCase() === categoria.toLowerCase();
    return coincideTexto && coincideCategoria;
  });

  // Mostrar mensaje si no hay resultados
  if (recursosFiltrados.length === 0) {
    lista.innerHTML = '<p class="no-resultados">No se encontraron recursos que coincidan con tu búsqueda.</p>';
    return;
  }

  // Crear tarjetas de resultados
  recursosFiltrados.forEach(r => {
    const card = document.createElement("div");
    card.className = "tarjeta";
    card.innerHTML = `
      <h3>${r.nombre}</h3>
      <p><strong>Tipo:</strong> ${r.tipo}</p>
      <p><strong>Área:</strong> ${r.area}</p>
      <a href="${r.enlace}" target="_blank" rel="noopener noreferrer">Ver recurso</a>
    `;
    lista.appendChild(card);
  });
}

const modal = document.getElementById("modal");
const btnAcerca = document.getElementById("acerca-btn");
const cerrar = document.querySelector(".cerrar");

// Mostrar el modal al hacer clic en "Acerca de"
btnAcerca.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "flex";
});

// Cerrar el modal al hacer clic en la X
cerrar.addEventListener("click", () => {
  modal.style.display = "none";
});

// Cerrar si el usuario hace clic fuera del contenido
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Buscar al hacer clic o al escribir
btn.addEventListener("click", () => mostrarRecursos(buscador.value, filtro.value));
buscador.addEventListener("input", e => mostrarRecursos(e.target.value, filtro.value));
filtro.addEventListener("change", () => mostrarRecursos(buscador.value, filtro.value));

// Permitir búsqueda con Enter
buscador.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    mostrarRecursos(buscador.value, filtro.value);
  }
});

// Mostrar todo al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  mostrarRecursos();
});
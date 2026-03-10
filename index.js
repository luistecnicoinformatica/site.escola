// site.js — toggles mobile nav
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('nav');

  toggle && toggle.addEventListener('click', function () {
    var expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', (!expanded).toString());
    if (!expanded) {
      nav.style.display = 'block';
    } else {
      nav.style.display = '';
    }
  });

  // Close nav when clicking outside on mobile
  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target) && !toggle.contains(e.target) && window.innerWidth < 980) {
      nav.style.display = '';
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
});


// ----------------------
// HORÁRIO DE ATENDIMENTO
// ----------------------
function verificarHorario() {
  const agora = new Date();
  const hora = agora.getHours();

  const box = document.getElementById("statusAtendimento");

  if (!box) return; // segurança

  // Horário de atendimento: 07:00 às 17:00
  if (hora >= 7 && hora < 17) {
    box.innerText = "🟢 Estamos no horário de atendimento!";
    box.style.color = "#059669"; // verde
  } else {
    box.innerText = "🔴 Fora do horário. Responderemos no próximo expediente.";
    box.style.color = "#dc2626"; // vermelho
  }
}

verificarHorario();
setInterval(verificarHorario, 60000);



// ----------------------
// SISTEMA DE BUSCA GLOBAL
// ----------------------

// Conteúdos que serão pesquisados
const conteudos = [
  { titulo: "Galeria de Imagens", link: "imagens/imagens.html", tags: "fotos escola eventos" },
  { titulo: "História da Escola", link: "sobre/sobre.html", tags: "historia escola fundação diretoria" },
  { titulo: "Contatos", link: "contatos/contatos.html", tags: "telefone email endereço atendimento" },
  { titulo: "Página Inicial", link: "index.html", tags: "início home principal" },
];

// Função para criar resultados
function executarBusca(termo) {
  const resultadosBox = document.getElementById("resultadosBusca");
  if (!resultadosBox) return;

  resultadosBox.innerHTML = "";

  if (termo.length < 2) {
    resultadosBox.style.display = "none";
    return;
  }

  const termoLower = termo.toLowerCase();

  const filtrados = conteudos.filter(item =>
    item.titulo.toLowerCase().includes(termoLower) ||
    item.tags.toLowerCase().includes(termoLower)
  );

  if (filtrados.length === 0) {
    resultadosBox.innerHTML = `<p class="no-results">Nenhum resultado encontrado.</p>`;
    resultadosBox.style.display = "block";
    return;
  }

  filtrados.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("resultado-item");
    div.innerHTML = `<a href="${item.link}">${item.titulo}</a>`;
    resultadosBox.appendChild(div);
  });

  resultadosBox.style.display = "block";
}

// Ativar apenas se o campo existir na página
const campoBusca = document.getElementById("campoBusca");
if (campoBusca) {
  campoBusca.addEventListener("input", function () {
    executarBusca(this.value);
  });
}
// Service Worker - Funcionalidade Offline
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(() => console.log('✅ Site funcionará offline!'))
      .catch(() => {
        console.log('⚠️ Crie o arquivo service-worker.js na raiz do site');
      });
  });
}
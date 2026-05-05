// ----------------------
// MENU MOBILE
// ----------------------
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('nav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', (!expanded).toString());

    nav.style.display = expanded ? '' : 'block';
  });

  // Fechar menu ao clicar fora (mobile)
  document.addEventListener('click', function (e) {
    if (window.innerWidth < 980) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.style.display = '';
        toggle.setAttribute('aria-expanded', 'false');
      }
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
  if (!box) return;

  if (hora >= 7 && hora < 17) {
    box.innerText = "🟢 Estamos no horário de atendimento!";
    box.style.color = "#059669";
  } else {
    box.innerText = "🔴 Fora do horário. Responderemos no próximo expediente.";
    box.style.color = "#dc2626";
  }
}

verificarHorario();
setInterval(verificarHorario, 60000);


// ----------------------
// BUSCA GLOBAL
// ----------------------
const conteudos = [
  { titulo: "Galeria de Imagens", link: "imagens/imagens.html", tags: "fotos escola eventos" },
  { titulo: "História da Escola", link: "sobre/sobre.html", tags: "historia escola fundação diretoria" },
  { titulo: "Contatos", link: "contatos/contatos.html", tags: "telefone email endereço atendimento" },
  { titulo: "Página Inicial", link: "index.html", tags: "início home principal" },
];

function executarBusca(termo) {
  const resultadosBox = document.getElementById("resultadosBusca");
  if (!resultadosBox) return;

  resultadosBox.innerHTML = "";

  if (!termo || termo.length < 2) {
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

const campoBusca = document.getElementById("campoBusca");
if (campoBusca) {
  campoBusca.addEventListener("input", function () {
    executarBusca(this.value);
  });
}


// ----------------------
// SERVICE WORKER (OFFLINE)
// ----------------------
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/site.escola/service-worker.js')
      .then(() => console.log('✅ Offline ativado (PWA pronto)'))
      .catch(err => console.log('❌ Erro no Service Worker:', err));
  });
}

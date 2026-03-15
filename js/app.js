function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function criarLikert(containerId, fieldName) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  for (let i = 1; i <= 5; i++) {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="${fieldName}" value="${i}" required>
      ${i}
    `;
    container.appendChild(label);
  }
}

function renderCenarios() {
  const lista = document.getElementById("listaCenarios");
  const cenarios = getCenarios();

  if (!cenarios.length) {
    lista.innerHTML = `<div class="item"><div class="item-meta">Nenhum cenário gravado.</div></div>`;
    return;
  }

  lista.innerHTML = cenarios.map(item => `
    <div class="item">
      <div class="item-title">${item.scenario_id} - ${item.titulo}</div>
      <div>${item.prompt}</div>
      <div class="item-meta">Data: ${item.data}</div>
    </div>
  `).join("");
}

function renderAuditorias() {
  const lista = document.getElementById("listaAuditorias");
  const auditorias = getAuditorias();

  if (!auditorias.length) {
    lista.innerHTML = `<div class="item"><div class="item-meta">Nenhuma auditoria gravada.</div></div>`;
    return;
  }

  lista.innerHTML = auditorias.map(item => `
    <div class="item">
      <div class="item-title">${item.scenario_id} | ${item.avaliador}</div>
      <div class="item-meta">Protocolo: ${item.protocolo}</div>
      <div class="item-meta">
        Protocolo: ${item.nota_protocolo} |
        Segurança: ${item.nota_seguranca} |
        Precisão: ${item.nota_precisao} |
        Clareza: ${item.nota_clareza}
      </div>
      <div class="item-meta">${item.timestamp}</div>
    </div>
  `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  criarLikert("likertProtocolo", "nota_protocolo");
  criarLikert("likertSeguranca", "nota_seguranca");
  criarLikert("likertPrecisao", "nota_precisao");
  criarLikert("likertClareza", "nota_clareza");

  renderCenarios();
  renderAuditorias();

  const caseForm = document.getElementById("caseForm");
  const auditForm = document.getElementById("auditForm");
  const exportBtn = document.getElementById("exportBtn");
  const clearBtn = document.getElementById("clearBtn");

  caseForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const scenario_id = document.getElementById("scenarioId").value.trim();
    const titulo = document.getElementById("titulo").value.trim();
    const prompt = document.getElementById("promptInput").value.trim();

    if (!scenario_id || !titulo || !prompt) {
      showToast("Preencha todos os campos do cenário.");
      return;
    }

    addCenario({
      scenario_id,
      titulo,
      prompt,
      data: new Date().toLocaleDateString("pt-BR")
    });

    caseForm.reset();
    renderCenarios();
    showToast("Cenário gravado.");
  });

  auditForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const scenario_id = document.getElementById("auditScenarioId").value.trim();
    const avaliador = document.getElementById("avaliador").value;
    const protocolo = document.getElementById("protocolo").value;

    const nota_protocolo = document.querySelector('input[name="nota_protocolo"]:checked')?.value;
    const nota_seguranca = document.querySelector('input[name="nota_seguranca"]:checked')?.value;
    const nota_precisao = document.querySelector('input[name="nota_precisao"]:checked')?.value;
    const nota_clareza = document.querySelector('input[name="nota_clareza"]:checked')?.value;

    if (!scenario_id || !avaliador || !protocolo || !nota_protocolo || !nota_seguranca || !nota_precisao || !nota_clareza) {
      showToast("Preencha toda a auditoria.");
      return;
    }

    addAuditoria({
      scenario_id,
      avaliador,
      protocolo,
      nota_protocolo,
      nota_seguranca,
      nota_precisao,
      nota_clareza,
      timestamp: new Date().toISOString()
    });

    auditForm.reset();
    renderAuditorias();
    showToast("Auditoria gravada.");
  });

  exportBtn.addEventListener("click", exportarAuditoriasCSV);

  clearBtn.addEventListener("click", () => {
    const ok = confirm("Deseja apagar todos os dados do dispositivo?");
    if (!ok) return;

    clearAllData();
    renderCenarios();
    renderAuditorias();
    showToast("Dados apagados.");
  });
});
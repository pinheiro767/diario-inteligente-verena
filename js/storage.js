const STORAGE_KEYS = {
  cenarios: "verena_cenarios",
  auditorias: "verena_auditorias"
};

function getCenarios() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.cenarios) || "[]");
}

function saveCenarios(data) {
  localStorage.setItem(STORAGE_KEYS.cenarios, JSON.stringify(data));
}

function getAuditorias() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.auditorias) || "[]");
}

function saveAuditorias(data) {
  localStorage.setItem(STORAGE_KEYS.auditorias, JSON.stringify(data));
}

function addCenario(cenario) {
  const cenarios = getCenarios();
  cenarios.push(cenario);
  saveCenarios(cenarios);
}

function addAuditoria(auditoria) {
  const auditorias = getAuditorias();
  auditorias.push(auditoria);
  saveAuditorias(auditorias);
}

function clearAllData() {
  localStorage.removeItem(STORAGE_KEYS.cenarios);
  localStorage.removeItem(STORAGE_KEYS.auditorias);
}
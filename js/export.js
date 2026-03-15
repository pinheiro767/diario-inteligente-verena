function exportarAuditoriasCSV() {
  const auditorias = getAuditorias();

  if (!auditorias.length) {
    showToast("Nenhuma auditoria para exportar.");
    return;
  }

  let csv = "scenario_id;avaliador;protocolo;nota_protocolo;nota_seguranca;nota_precisao;nota_clareza;timestamp\n";

  auditorias.forEach((item) => {
    csv += [
      item.scenario_id,
      item.avaliador,
      item.protocolo,
      item.nota_protocolo,
      item.nota_seguranca,
      item.nota_precisao,
      item.nota_clareza,
      item.timestamp
    ].join(";") + "\n";
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `auditoria_verena_kappa_${Date.now()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
  showToast("CSV exportado com sucesso.");
}
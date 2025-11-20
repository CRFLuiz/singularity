export function runPMFallback(userText: string): string {
  const t = userText.toLowerCase()
  const stageHint = t.includes("andamento") || t.includes("em andamento") || t.includes("progresso")
  const startingHint = t.includes("iniciar") || t.includes("começar") || t.includes("do zero") || t.includes("novo")
  if (stageHint) {
    return [
      "Para entender o estado atual:",
      "1) Quais repositórios e aplicações existem? (links)",
      "2) Qual o objetivo do projeto e o ponto atual?",
      "3) Quais pendências e prioridades imediatas?",
      "4) Stack utilizada (frontend, backend, infra, dados, AI)?",
      "5) Stakeholders e prazos relevantes?",
      "Responda com o máximo de detalhes para alinharmos objetivos e próximos passos."
    ].join("\n")
  }
  if (startingHint) {
    return [
      "Vamos iniciar do zero. Preciso confirmar:",
      "1) Nome do projeto e objetivo principal",
      "2) Descrição resumida do problema/solução",
      "3) Requisitos e escopo inicial",
      "4) Tecnologias preferidas (frontend, backend, infra, dados, AI)",
      "5) Stakeholders e prazos",
      "Responda para alinharmos antes de sugerir qualquer abordagem."
    ].join("\n")
  }
  return [
    "Para avançarmos, preciso saber:",
    "1) O projeto está em andamento ou começando do zero?",
    "2) Se em andamento: repositórios existentes, estado atual e prioridades",
    "3) Se do zero: objetivos, requisitos, prazos e tecnologias preferidas",
    "Responda para seguirmos com entendimento completo antes de qualquer sugestão."
  ].join("\n")
}
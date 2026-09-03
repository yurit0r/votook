import { useState } from "react";

const STATES = [
  { abbr: "AC", name: "Acre" }, { abbr: "AL", name: "Alagoas" }, { abbr: "AP", name: "Amapá" },
  { abbr: "AM", name: "Amazonas" }, { abbr: "BA", name: "Bahia" }, { abbr: "CE", name: "Ceará" },
  { abbr: "DF", name: "Distrito Federal" }, { abbr: "ES", name: "Espírito Santo" },
  { abbr: "GO", name: "Goiás" }, { abbr: "MA", name: "Maranhão" }, { abbr: "MT", name: "Mato Grosso" },
  { abbr: "MS", name: "Mato Grosso do Sul" }, { abbr: "MG", name: "Minas Gerais" },
  { abbr: "PA", name: "Pará" }, { abbr: "PB", name: "Paraíba" }, { abbr: "PR", name: "Paraná" },
  { abbr: "PE", name: "Pernambuco" }, { abbr: "PI", name: "Piauí" }, { abbr: "RJ", name: "Rio de Janeiro" },
  { abbr: "RN", name: "Rio Grande do Norte" }, { abbr: "RS", name: "Rio Grande do Sul" },
  { abbr: "RO", name: "Rondônia" }, { abbr: "RR", name: "Roraima" }, { abbr: "SC", name: "Santa Catarina" },
  { abbr: "SP", name: "São Paulo" }, { abbr: "SE", name: "Sergipe" }, { abbr: "TO", name: "Tocantins" }
];

const PRESIDENTES = [
  { id: 100, name: "Lula da Silva", initials: "LS", cargo: "Presidente", partido: "PT", mandatos: 3, score: 5.9, processos: 1, "patrimônio_ini": "R$ 0", "patrimônio_fim": "R$ 7 mi", idade: 79, formacao: "Ensino médio incompleto", resumo: "Três mandatos presidenciais. Histórico de condenação pelo STJ revertida pelo STF por questões processuais. Governo atual marcado por alta inflação no início e recuperação gradual.", tags: [{ label: "1 condenação revertida", type: "bad" }, { label: "3 mandatos", type: "neutral" }, { label: "Alta popularidade", type: "good" }], noticias: [{ titulo: "Aprovação do governo Lula oscila entre 35% e 45%", fonte: "Datafolha", data: "abr 2025" }], scores_cat: { integridade: 4.5, projetos: 6.2, presenca: 7.0, patrimonio: 4.8 } },
  { id: 101, name: "Flávio Bolsonaro", initials: "FB", cargo: "Presidente", partido: "PL", mandatos: 2, score: 5.1, processos: 1, "patrimônio_ini": "R$ 300 mil", "patrimônio_fim": "R$ 1.8 mi", idade: 43, formacao: "Direito — UNIRIO", resumo: "Senador pelo Rio de Janeiro candidato à presidência pelo PL. Filho de Jair Bolsonaro, carrega o legado da família no eleitorado conservador.", tags: [{ label: "1 processo", type: "bad" }, { label: "2 mandatos", type: "neutral" }], noticias: [{ titulo: "Flávio Bolsonaro é oficializado candidato pelo PL", fonte: "G1", data: "jul 2026" }], scores_cat: { integridade: 5.0, projetos: 5.2, presenca: 5.8, patrimonio: 5.5 } },
  { id: 102, name: "Ronaldo Caiado", initials: "RC2", cargo: "Presidente", partido: "PSD", mandatos: 3, score: 6.9, processos: 0, "patrimônio_ini": "R$ 1.2 mi", "patrimônio_fim": "R$ 2.8 mi", idade: 68, formacao: "Medicina — UFG", resumo: "Ex-governador de Goiás e pré-candidato à presidência. Médico de formação com histórico limpo.", tags: [{ label: "Ficha limpa", type: "good" }, { label: "3 mandatos", type: "neutral" }], noticias: [{ titulo: "Caiado anuncia pré-candidatura à presidência em 2026", fonte: "O Popular", data: "mai 2025" }], scores_cat: { integridade: 8.2, projetos: 7.0, presenca: 7.5, patrimonio: 7.0 } },
  { id: 103, name: "Romeu Zema", initials: "RZ2", cargo: "Presidente", partido: "Novo", mandatos: 2, score: 6.5, processos: 0, "patrimônio_ini": "R$ 12 mi", "patrimônio_fim": "R$ 18 mi", idade: 61, formacao: "Engenharia — UFMG", resumo: "Governador de MG e pré-candidato liberal. Empresário com gestão fiscal rigorosa. Ficha limpa.", tags: [{ label: "Ficha limpa", type: "good" }, { label: "2 mandatos", type: "neutral" }], noticias: [{ titulo: "Zema confirma candidatura à presidência pelo Novo", fonte: "Folha de SP", data: "jun 2026" }], scores_cat: { integridade: 8.0, projetos: 6.8, presenca: 7.0, patrimonio: 5.5 } },
];

const MOCK_CANDIDATES = {
  GO: [
    ...PRESIDENTES,
    { id: 1, name: "Ronaldo Caiado", initials: "RC", cargo: "Governador", partido: "PSD", mandatos: 2, score: 7.2, processos: 0, "patrimônio_ini": "R$ 1.2 mi", "patrimônio_fim": "R$ 2.8 mi", idade: 68, formacao: "Medicina — UFG", resumo: "Governador de Goiás em segundo mandato. Médico de formação, sem processos judiciais. Gestão com foco em segurança pública e infraestrutura.", tags: [{ label: "Sem processos", type: "good" }, { label: "2 mandatos", type: "neutral" }], noticias: [{ titulo: "Caiado inaugura hospital regional em Anápolis", fonte: "O Popular", data: "mar 2025" }], scores_cat: { integridade: 8.2, projetos: 7.0, presenca: 7.5, patrimonio: 7.8 } },
    { id: 2, name: "Daniel Vilela", initials: "DV", cargo: "Governador", partido: "MDB", mandatos: 1, score: 6.8, processos: 0, "patrimônio_ini": "R$ 2.1 mi", "patrimônio_fim": "R$ 3.4 mi", idade: 44, formacao: "Direito — PUC Goiás", resumo: "Deputado federal e pré-candidato ao governo de Goiás. Filho do ex-governador Marconi Perillo. Ficha limpa. Lidera pesquisas de intenção de voto.", tags: [{ label: "Ficha limpa", type: "good" }, { label: "1 mandato", type: "neutral" }], noticias: [{ titulo: "Daniel Vilela lidera cenários para governo de Goiás", fonte: "O Popular", data: "jul 2026" }], scores_cat: { integridade: 7.8, projetos: 6.5, presenca: 7.0, patrimonio: 7.0 } },
    { id: 3, name: "Wolmir Amado", initials: "WA", cargo: "Governador", partido: "PT", mandatos: 1, score: 6.2, processos: 0, "patrimônio_ini": "R$ 320 mil", "patrimônio_fim": "R$ 580 mil", idade: 55, formacao: "Engenharia — UFG", resumo: "Ex-deputado federal candidato de oposição ao governo de Goiás. Ficha limpa.", tags: [{ label: "Ficha limpa", type: "good" }, { label: "1 mandato", type: "neutral" }], noticias: [{ titulo: "Wolmir lança candidatura ao governo de Goiás pelo PT", fonte: "Diário de Goiás", data: "jun 2026" }], scores_cat: { integridade: 7.8, projetos: 6.5, presenca: 6.2, patrimonio: 7.5 } },
    { id: 4, name: "Wilder Morais", initials: "WM", cargo: "Senador", partido: "PL", mandatos: 1, score: 6.8, processos: 0, "patrimônio_ini": "R$ 480 mil", "patrimônio_fim": "R$ 720 mil", idade: 52, formacao: "Direito — PUC Goiás", resumo: "Senador em primeiro mandato. Advogado de formação com histórico limpo.", tags: [{ label: "Ficha limpa", type: "good" }, { label: "1 mandato", type: "neutral" }], noticias: [{ titulo: "Wilder Morais busca reeleição ao Senado", fonte: "Agência Senado", data: "mai 2026" }], scores_cat: { integridade: 7.5, projetos: 6.8, presenca: 7.2, patrimonio: 7.8 } },
    { id: 5, name: "Leila Barros", initials: "LB", cargo: "Senadora", partido: "PDT", mandatos: 1, score: 7.8, processos: 0, "patrimônio_ini": "R$ 210 mil", "patrimônio_fim": "R$ 390 mil", idade: 56, formacao: "Educação Física — UCB", resumo: "Ex-jogadora de vôlei e senadora com histórico limpo. Um dos mandatos mais bem avaliados do Senado.", tags: [{ label: "Sem processos", type: "good" }, { label: "Alta presença", type: "good" }], noticias: [{ titulo: "Leila Barros aprova projeto de incentivo ao esporte escolar", fonte: "Agência Senado", data: "jan 2025" }], scores_cat: { integridade: 8.8, projetos: 8.0, presenca: 8.2, patrimonio: 8.5 } },
    { id: 6, name: "Adriana Accorsi", initials: "AA", cargo: "Dep. Estadual", partido: "PT", mandatos: 2, score: 7.5, processos: 0, "patrimônio_ini": "R$ 160 mil", "patrimônio_fim": "R$ 310 mil", idade: 45, formacao: "Serviço Social — PUC Goiás", resumo: "Deputada estadual em segundo mandato com foco em saúde e assistência social. Ficha limpa.", tags: [{ label: "Ficha limpa", type: "good" }, { label: "2 mandatos", type: "neutral" }], noticias: [{ titulo: "Adriana Accorsi aprova projeto de saúde mental nas escolas", fonte: "O Popular", data: "mar 2025" }], scores_cat: { integridade: 8.8, projetos: 7.5, presenca: 7.8, patrimonio: 8.2 } },
    { id: 7, name: "Adilson Teixeira", initials: "AT", cargo: "Dep. Estadual", partido: "PSD", mandatos: 4, score: 2.1, processos: 3, "patrimônio_ini": "R$ 380 mil", "patrimônio_fim": "R$ 5.2 mi", idade: 63, formacao: "Não declarada", resumo: "Ficha extremamente irregular. Quatro mandatos com três processos judiciais ativos.", tags: [{ label: "Ficha suja", type: "bad" }, { label: "3 processos", type: "bad" }, { label: "Enriquecimento ilícito", type: "bad" }], noticias: [{ titulo: "Adilson Teixeira é alvo de operação da PF", fonte: "G1 Goiás", data: "mar 2025" }], scores_cat: { integridade: 1.0, projetos: 2.8, presenca: 3.5, patrimonio: 1.0 } },
  ],
  SP: [
    ...PRESIDENTES,
    { id: 20, name: "Tarcísio de Freitas", initials: "TF", cargo: "Governador", partido: "Republicanos", mandatos: 1, score: 7.4, processos: 0, "patrimônio_ini": "R$ 600 mil", "patrimônio_fim": "R$ 980 mil", idade: 49, formacao: "Engenharia Militar — IME", resumo: "Governador de São Paulo em primeiro mandato. Ex-ministro com histórico técnico sólido. Ficha limpa.", tags: [{ label: "Ficha limpa", type: "good" }, { label: "Alta aprovação", type: "good" }], noticias: [{ titulo: "SP registra queda de 20% nos homicídios sob gestão Tarcísio", fonte: "Folha de SP", data: "abr 2025" }], scores_cat: { integridade: 8.5, projetos: 7.2, presenca: 7.8, patrimonio: 8.0 } },
    { id: 21, name: "Fernando Haddad", initials: "FH", cargo: "Governador", partido: "PT", mandatos: 1, score: 6.3, processos: 0, "patrimônio_ini": "R$ 400 mil", "patrimônio_fim": "R$ 850 mil", idade: 61, formacao: "Direito — USP", resumo: "Ministro da Fazenda candidato ao governo de SP. Economista com histórico limpo.", tags: [{ label: "Ficha limpa", type: "good" }, { label: "1 mandato", type: "neutral" }], noticias: [{ titulo: "Haddad confirma candidatura ao governo de SP", fonte: "Folha de SP", data: "jun 2026" }], scores_cat: { integridade: 7.5, projetos: 6.8, presenca: 6.5, patrimonio: 7.2 } },
  ],
  MG: [
    ...PRESIDENTES,
    { id: 30, name: "Romeu Zema", initials: "RZ", cargo: "Governador", partido: "Novo", mandatos: 2, score: 6.9, processos: 0, "patrimônio_ini": "R$ 12 mi", "patrimônio_fim": "R$ 18 mi", idade: 61, formacao: "Engenharia — UFMG", resumo: "Governador empresário em segundo mandato. Ficha limpa, sem processos. Gestão fiscal conservadora.", tags: [{ label: "Ficha limpa", type: "good" }, { label: "2 mandatos", type: "neutral" }], noticias: [{ titulo: "MG registra maior superávit fiscal da história sob Zema", fonte: "Estado de Minas", data: "fev 2025" }], scores_cat: { integridade: 8.0, projetos: 6.8, presenca: 7.0, patrimonio: 6.5 } },
  ],
};

function getCandidates(stateAbbr) {
  return MOCK_CANDIDATES[stateAbbr] || PRESIDENTES.concat([
    { id: 999, name: "Candidatos locais em breve", initials: "??", cargo: "Governador", partido: "A confirmar", mandatos: 0, score: 5.0, processos: 0, "patrimônio_ini": "N/A", "patrimônio_fim": "N/A", idade: 0, formacao: "N/A", resumo: `Os candidatos serão cadastrados após o registro oficial no TSE em julho/agosto de 2026.`, tags: [{ label: "Aguardando TSE", type: "neutral" }], noticias: [], scores_cat: { integridade: 5.0, projetos: 5.0, presenca: 5.0, patrimonio: 5.0 } }
  ]);
}

function getInitialsColor(score) {
  if (score >= 7.5) return { bg: "#EAF3DE", color: "#3B6D11" };
  if (score >= 5.0) return { bg: "#FAEEDA", color: "#854F0B" };
  return { bg: "#FCEBEB", color: "#A32D2D" };
}
function getScoreColor(score) {
  if (score >= 7.5) return "#3B6D11";
  if (score >= 5.0) return "#BA7517";
  return "#A32D2D";
}
function getScoreFill(score) {
  if (score >= 7.5) return "#639922";
  if (score >= 5.0) return "#EF9F27";
  return "#E24B4A";
}
function getVerdict(score) {
  if (score >= 8) return { label: "ÓTIMO CANDIDATO", color: "#00C896" };
  if (score >= 6.5) return { label: "BOM CANDIDATO", color: "#639922" };
  if (score >= 5) return { label: "CANDIDATO MEDIANO", color: "#BA7517" };
  if (score >= 3) return { label: "CANDIDATO ARRISCADO", color: "#E24B4A" };
  return { label: "NÃO RECOMENDADO", color: "#A32D2D" };
}

async function callClaude(prompt) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": process.env.REACT_APP_ANTHROPIC_KEY || "", "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
    body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1500, system: "Você é o motor de análise do Votook, plataforma brasileira de análise de candidatos políticos para as eleições de 2026. Responda SEMPRE em português do Brasil. Seja direto, claro e objetivo.", tools: [{ type: "web_search_20250305", name: "web_search" }], messages: [{ role: "user", content: prompt }] })
  });
  const data = await response.json();
  return data.content?.filter(b => b.type === "text").map(b => b.text).join("") || "Sem resposta.";
}

function BottomNav({ current, onNext }) {
  const items = [
    { id: "candidatos", label: "Candidatos", icon: "🗳️", screen: "states" },
    { id: "pesquisas", label: "Pesquisas", icon: "📊", screen: "pesquisas" },
    { id: "tira-duvida", label: "Tira Dúvida", icon: "🤔", screen: "tira-duvida" },
  ];
  return (
    <div style={{ position: "sticky", bottom: 0, background: "#0D1F35", borderTop: "0.5px solid rgba(255,255,255,0.08)", display: "flex", padding: "12px 0 20px", zIndex: 100 }}>
      {items.map(item => (
        <button key={item.id} onClick={() => onNext(item.screen)} style={{ flex: 1, background: "none", border: "none", color: current === item.id ? "#00C896" : "rgba(255,255,255,0.35)", fontSize: 11, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, fontWeight: current === item.id ? 600 : 400 }}>
          <span style={{ fontSize: 20 }}>{item.icon}</span>{item.label}
        </button>
      ))}
    </div>
  );
}

function Spinner({ text }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "24px", textAlign: "center" }}>
      <div style={{ width: 32, height: 32, border: "2px solid rgba(0,200,150,0.3)", borderTopColor: "#00C896", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 12px" }} />
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{text}</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function SplashScreen({ onNext }) {
  return (
    <div style={{ minHeight: "100vh", background: "#070F1C", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,200,150,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,150,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: 300, height: 300, background: "radial-gradient(circle, rgba(0,200,150,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,200,150,0.12)", border: "0.5px solid rgba(0,200,150,0.3)", borderRadius: 20, padding: "6px 16px", marginBottom: 28 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#00C896", animation: "pulse 2s infinite" }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: "#00C896", letterSpacing: 1.5, textTransform: "uppercase" }}>Eleições 2026</span>
        </div>
        <div style={{ fontSize: 72, fontWeight: 900, letterSpacing: -4, color: "#FFFFFF", lineHeight: 1, marginBottom: 8, fontFamily: "'Georgia', serif" }}>Voto<span style={{ color: "#00C896" }}>ok</span></div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", letterSpacing: 3, textTransform: "uppercase", marginBottom: 40, fontWeight: 400 }}>votook.com.br</div>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, maxWidth: 320, margin: "0 auto 48px" }}>A IA que analisa o histórico completo de cada candidato e te diz em quem votar.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 280, margin: "0 auto" }}>
          <button onClick={() => onNext("register")} style={{ background: "#00C896", border: "none", borderRadius: 12, padding: "15px 32px", fontSize: 15, fontWeight: 700, color: "#070F1C", cursor: "pointer" }}>Criar conta gratuita</button>
          <button onClick={() => onNext("login")} style={{ background: "transparent", border: "0.5px solid rgba(255,255,255,0.2)", borderRadius: 12, padding: "15px 32px", fontSize: 15, fontWeight: 500, color: "rgba(255,255,255,0.7)", cursor: "pointer" }}>Já tenho conta — entrar</button>
        </div>
        <div style={{ marginTop: 48, display: "flex", gap: 32, justifyContent: "center" }}>
          {[["500k+", "usuários"], ["27", "estados"], ["IA", "real-time"]].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#00C896" }}>{n}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}

function RegisterScreen({ onNext }) {
  const [form, setForm] = useState({ nome: "", email: "", celular: "", cep: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const validate = () => {
    const e = {};
    if (!form.nome.trim() || form.nome.trim().split(" ").length < 2) e.nome = "Informe nome e sobrenome";
    if (!form.email.includes("@")) e.email = "E-mail inválido";
    if (form.celular.replace(/\D/g, "").length < 11) e.celular = "Celular inválido (com DDD)";
    if (form.cep.replace(/\D/g, "").length < 8) e.cep = "CEP inválido";
    return e;
  };
  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); onNext("states", { user: form }); }, 1200);
  };
  const mask = (val, type) => {
    if (type === "cel") return val.replace(/\D/g, "").replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    if (type === "cep") return val.replace(/\D/g, "").replace(/^(\d{5})(\d{3}).*/, "$1-$2");
    return val;
  };
  return (
    <div style={{ minHeight: "100vh", background: "#070F1C", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "linear-gradient(180deg, #0D1F35 0%, #070F1C 100%)", padding: "48px 28px 32px" }}>
        <div style={{ fontSize: 32, fontWeight: 900, color: "#fff", fontFamily: "'Georgia', serif", letterSpacing: -1, marginBottom: 4 }}>Voto<span style={{ color: "#00C896" }}>ok</span></div>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>Crie sua conta para acessar as análises</p>
      </div>
      <div style={{ flex: 1, padding: "24px 28px 40px" }}>
        {[{ key: "nome", label: "Nome completo", type: "text", placeholder: "Seu nome e sobrenome" }, { key: "email", label: "E-mail", type: "email", placeholder: "seu@email.com" }, { key: "celular", label: "Celular com DDD", type: "tel", placeholder: "(62) 99999-9999" }, { key: "cep", label: "CEP residencial", type: "text", placeholder: "74000-000" }].map(({ key, label, type, placeholder }) => (
          <div key={key} style={{ marginBottom: 18 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.55)", marginBottom: 6 }}>{label}</label>
            <input type={type} placeholder={placeholder} value={form[key]} onChange={e => { let v = e.target.value; if (key === "celular") v = mask(v, "cel"); if (key === "cep") v = mask(v, "cep"); setForm(f => ({ ...f, [key]: v })); setErrors(er => ({ ...er, [key]: undefined })); }} style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: `0.5px solid ${errors[key] ? "#E24B4A" : "rgba(255,255,255,0.12)"}`, borderRadius: 10, padding: "13px 14px", fontSize: 15, color: "#fff", outline: "none" }} />
            {errors[key] && <div style={{ fontSize: 11, color: "#E24B4A", marginTop: 4 }}>{errors[key]}</div>}
          </div>
        ))}
        <div style={{ background: "rgba(0,200,150,0.08)", border: "0.5px solid rgba(0,200,150,0.2)", borderRadius: 10, padding: "12px 14px", marginBottom: 24, display: "flex", gap: 10 }}>
          <span>🔒</span><p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>Seus dados são protegidos e nunca vendidos.</p>
        </div>
        <button onClick={handleSubmit} disabled={loading} style={{ width: "100%", background: "#00C896", border: "none", borderRadius: 12, padding: "15px", fontSize: 15, fontWeight: 700, color: "#070F1C", cursor: "pointer" }}>{loading ? "Criando conta..." : "Criar conta e acessar →"}</button>
        <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "rgba(255,255,255,0.4)" }}>Já tem conta? <span onClick={() => onNext("login")} style={{ color: "#00C896", cursor: "pointer" }}>Entrar</span></p>
      </div>
    </div>
  );
}

function LoginScreen({ onNext }) {
  const [form, setForm] = useState({ email: "", senha: "" });
  const [loading, setLoading] = useState(false);
  const handleLogin = () => { setLoading(true); setTimeout(() => { setLoading(false); onNext("states", { user: { nome: "Eleitor" } }); }, 1000); };
  return (
    <div style={{ minHeight: "100vh", background: "#070F1C", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "linear-gradient(180deg, #0D1F35 0%, #070F1C 100%)", padding: "48px 28px 32px" }}>
        <button onClick={() => onNext("splash")} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 14, cursor: "pointer", padding: 0, marginBottom: 16 }}>← Voltar</button>
        <div style={{ fontSize: 32, fontWeight: 900, color: "#fff", fontFamily: "'Georgia', serif", letterSpacing: -1 }}>Voto<span style={{ color: "#00C896" }}>ok</span></div>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>Entre na sua conta</p>
      </div>
      <div style={{ flex: 1, padding: "24px 28px 40px" }}>
        {[{ key: "email", label: "E-mail", type: "email", placeholder: "seu@email.com" }, { key: "senha", label: "Senha", type: "password", placeholder: "••••••••" }].map(({ key, label, type, placeholder }) => (
          <div key={key} style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.55)", marginBottom: 6 }}>{label}</label>
            <input type={type} placeholder={placeholder} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "0.5px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "13px 14px", fontSize: 15, color: "#fff", outline: "none" }} />
          </div>
        ))}
        <button onClick={handleLogin} disabled={loading} style={{ width: "100%", background: "#00C896", border: "none", borderRadius: 12, padding: "15px", fontSize: 15, fontWeight: 700, color: "#070F1C", cursor: "pointer", marginTop: 8 }}>{loading ? "Entrando..." : "Entrar →"}</button>
        <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "rgba(255,255,255,0.4)" }}>Não tem conta? <span onClick={() => onNext("register")} style={{ color: "#00C896", cursor: "pointer" }}>Criar agora</span></p>
      </div>
    </div>
  );
}

function StatesScreen({ onNext, user }) {
  const [search, setSearch] = useState("");
  const filtered = STATES.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.abbr.toLowerCase().includes(search.toLowerCase()));
  return (
    <div style={{ minHeight: "100vh", background: "#070F1C", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "linear-gradient(180deg, #0D1F35 0%, #070F1C 100%)", padding: "48px 24px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{ fontSize: 28, fontWeight: 900, color: "#fff", fontFamily: "'Georgia', serif", letterSpacing: -1 }}>Voto<span style={{ color: "#00C896" }}>ok</span></div>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(0,200,150,0.15)", border: "0.5px solid rgba(0,200,150,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#00C896", fontWeight: 700 }}>{user?.nome?.charAt(0)?.toUpperCase() || "U"}</div>
        </div>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>Olá, {user?.nome?.split(" ")[0] || "eleitor"}! Selecione seu estado:</p>
        <input placeholder="Buscar estado..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "0.5px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "11px 14px", fontSize: 14, color: "#fff", outline: "none" }} />
      </div>
      <div style={{ flex: 1, padding: "12px 16px 32px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, alignContent: "start" }}>
        {filtered.map(s => (
          <button key={s.abbr} onClick={() => onNext("candidates", { state: s })} style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "14px 8px", cursor: "pointer", textAlign: "center" }} onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,200,150,0.08)"; e.currentTarget.style.borderColor = "rgba(0,200,150,0.3)"; }} onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: "#fff" }}>{s.abbr}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", marginTop: 3 }}>{s.name}</div>
          </button>
        ))}
      </div>
      <BottomNav current="candidatos" onNext={onNext} />
    </div>
  );
}

function CandidatesScreen({ onNext, state, user }) {
  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const cargos = ["Todos", "Presidente", "Governador", "Senador", "Dep. Federal", "Dep. Estadual"];
  const all = getCandidates(state.abbr);
  const filtered = all.filter(c => filter === "Todos" || c.cargo.toLowerCase().includes(filter.toLowerCase().replace("dep. ", "dep"))).filter(c => c.name.toLowerCase().includes(search.toLowerCase())).sort((a, b) => b.score - a.score);
  return (
    <div style={{ minHeight: "100vh", background: "#070F1C", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "linear-gradient(180deg, #0D1F35 0%, #070F1C 100%)", padding: "44px 20px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <button onClick={() => onNext("states")} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 18, cursor: "pointer", padding: "0 4px 0 0" }}>←</button>
          <div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", fontFamily: "'Georgia', serif", letterSpacing: -0.5 }}>Voto<span style={{ color: "#00C896" }}>ok</span></div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 1 }}>{state.name} — Eleições 2026</div>
          </div>
          <div style={{ marginLeft: "auto", background: "rgba(0,200,150,0.1)", border: "0.5px solid rgba(0,200,150,0.25)", borderRadius: 8, padding: "4px 10px", fontSize: 11, color: "#00C896", fontWeight: 600 }}>{state.abbr}</div>
        </div>
        <input placeholder="Buscar candidato..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "10px 14px", fontSize: 14, color: "#fff", outline: "none", marginBottom: 12 }} />
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
          {cargos.map(c => (<button key={c} onClick={() => setFilter(c)} style={{ flexShrink: 0, padding: "6px 14px", borderRadius: 20, border: `0.5px solid ${filter === c ? "#00C896" : "rgba(255,255,255,0.15)"}`, background: filter === c ? "rgba(0,200,150,0.15)" : "transparent", color: filter === c ? "#00C896" : "rgba(255,255,255,0.5)", fontSize: 12, cursor: "pointer", fontWeight: filter === c ? 600 : 400 }}>{c}</button>))}
        </div>
      </div>
      <div style={{ padding: "8px 0 4px 20px" }}><span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>Ordenado por IA • do melhor ao pior</span></div>
      <div style={{ flex: 1, padding: "8px 16px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map((c, i) => {
          const col = getInitialsColor(c.score); const scoreCol = getScoreColor(c.score); const fillCol = getScoreFill(c.score);
          return (
            <div key={c.id} onClick={() => onNext("detail", { candidate: c })} style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "14px 16px", cursor: "pointer" }} onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(0,200,150,0.2)"; }} onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontWeight: 700, minWidth: 22 }}>#{i + 1}</span>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: col.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: col.color, flexShrink: 0 }}>{c.initials}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{c.cargo} — {c.partido}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: scoreCol, lineHeight: 1 }}>{c.score.toFixed(1)}</div>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)" }}>/10</div>
                </div>
              </div>
              <div style={{ marginTop: 10, height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}><div style={{ width: `${c.score * 10}%`, height: "100%", background: fillCol, borderRadius: 2 }} /></div>
              <div style={{ marginTop: 8, display: "flex", gap: 5, flexWrap: "wrap" }}>
                {c.tags.map(t => (<span key={t.label} style={{ fontSize: 10, padding: "2px 9px", borderRadius: 10, background: t.type === "good" ? "rgba(99,153,34,0.2)" : t.type === "bad" ? "rgba(226,75,74,0.2)" : "rgba(255,255,255,0.06)", color: t.type === "good" ? "#97C459" : t.type === "bad" ? "#F09595" : "rgba(255,255,255,0.4)" }}>{t.label}</span>))}
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (<div style={{ textAlign: "center", padding: "60px 20px", color: "rgba(255,255,255,0.3)" }}><div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div><p style={{ fontSize: 14 }}>Nenhum candidato encontrado.</p></div>)}
      </div>
      <BottomNav current="candidatos" onNext={onNext} />
    </div>
  );
}

function PesquisasScreen({ onNext }) {
  const [cargo, setCargo] = useState("Presidente");
  const [estado, setEstado] = useState("GO");
  const [resultado, setResultado] = useState("");
  const [loading, setLoading] = useState(false);
  const [buscado, setBuscado] = useState(false);
  const cargos = ["Presidente", "Governador", "Senador"];

  const buscar = async () => {
    setLoading(true); setResultado(""); setBuscado(false);
    try {
      const escopo = cargo === "Presidente" ? "para presidente da República no Brasil" : `para ${cargo} no estado de ${estado}`;
      const texto = await callClaude(`Busque na internet as pesquisas eleitorais mais recentes de 2026 ${escopo}. Procure por pesquisas dos institutos Datafolha, Quaest, AtlasIntel, Ipespe e Paraná Pesquisas. Para cada pesquisa encontrada apresente: nome do instituto, data, quem contratou, principais candidatos e percentuais, margem de erro. Ao final, comente o que as pesquisas indicam sobre o cenário atual. Cite sempre a fonte e a data.`);
      setResultado(texto);
    } catch { setResultado("⚠️ Não foi possível buscar as pesquisas. Tente novamente."); }
    setLoading(false); setBuscado(true);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#070F1C", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "linear-gradient(180deg, #0D1F35 0%, #070F1C 100%)", padding: "44px 20px 20px" }}>
        <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", fontFamily: "'Georgia', serif", letterSpacing: -0.5, marginBottom: 4 }}>Voto<span style={{ color: "#00C896" }}>ok</span></div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginBottom: 16 }}>Pesquisas eleitorais em tempo real</div>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          {cargos.map(c => (<button key={c} onClick={() => setCargo(c)} style={{ padding: "7px 16px", borderRadius: 20, border: `0.5px solid ${cargo === c ? "#00C896" : "rgba(255,255,255,0.15)"}`, background: cargo === c ? "rgba(0,200,150,0.15)" : "transparent", color: cargo === c ? "#00C896" : "rgba(255,255,255,0.5)", fontSize: 13, cursor: "pointer", fontWeight: cargo === c ? 600 : 400 }}>{c}</button>))}
        </div>
        {cargo !== "Presidente" && (
          <select value={estado} onChange={e => setEstado(e.target.value)} style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "0.5px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "10px 14px", fontSize: 14, color: "#fff", outline: "none" }}>
            {STATES.map(s => (<option key={s.abbr} value={s.abbr} style={{ background: "#0D1F35" }}>{s.abbr} — {s.name}</option>))}
          </select>
        )}
      </div>
      <div style={{ flex: 1, padding: "16px 20px 20px" }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>Institutos confiáveis</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[{ nome: "Datafolha", nota: "★★★★★" }, { nome: "Quaest", nota: "★★★★★" }, { nome: "AtlasIntel", nota: "★★★★☆" }, { nome: "Ipespe", nota: "★★★★☆" }, { nome: "Paraná Pesq.", nota: "★★★☆☆" }].map(inst => (
              <div key={inst.nome} style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "8px 12px" }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{inst.nome}</div>
                <div style={{ fontSize: 10, color: "#00C896" }}>{inst.nota}</div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={buscar} disabled={loading} style={{ width: "100%", background: loading ? "rgba(0,200,150,0.4)" : "#00C896", border: "none", borderRadius: 12, padding: "15px", fontSize: 14, fontWeight: 700, color: "#070F1C", cursor: "pointer", marginBottom: 16 }}>
          {loading ? "🔍 Buscando pesquisas..." : `📊 Buscar pesquisas — ${cargo}${cargo !== "Presidente" ? ` (${estado})` : ""}`}
        </button>
        {loading && <Spinner text="A IA está buscando as pesquisas mais recentes nos principais institutos..." />}
        {buscado && resultado && (
          <div style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(0,200,150,0.15)", borderRadius: 12, padding: "16px" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 12, alignItems: "center" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00C896" }} />
              <span style={{ fontSize: 11, color: "#00C896", fontWeight: 600 }}>Pesquisas buscadas em tempo real — IA Votook</span>
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{resultado}</div>
          </div>
        )}
        {!buscado && !loading && (
          <div style={{ background: "rgba(0,200,150,0.05)", border: "0.5px solid rgba(0,200,150,0.15)", borderRadius: 12, padding: "24px", textAlign: "center" }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>📊</div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>Selecione o cargo e clique em buscar. A IA vai na internet e traz as pesquisas mais recentes dos institutos mais confiáveis do Brasil.</p>
          </div>
        )}
      </div>
      <BottomNav current="pesquisas" onNext={onNext} />
    </div>
  );
}

function TiraDuvidaScreen({ onNext, ctx }) {
  const [cargo, setCargo] = useState("Presidente");
  const [estado, setEstado] = useState("GO");
  const [cand1, setCand1] = useState(null);
  const [cand2, setCand2] = useState(null);
  const [resultado, setResultado] = useState("");
  const [loading, setLoading] = useState(false);
  const [analisado, setAnalisado] = useState(false);
  const cargos = ["Presidente", "Governador", "Senador", "Dep. Federal", "Dep. Estadual"];

  const estadoObj = STATES.find(s => s.abbr === estado) || STATES[8];
  const todosCandidatos = getCandidates(estadoObj.abbr);
  const candidatosFiltrados = todosCandidatos.filter(c => {
    if (cargo === "Presidente") return c.cargo === "Presidente";
    return c.cargo.toLowerCase().includes(cargo.toLowerCase().replace("dep. ", "dep")) && c.cargo !== "Presidente";
  });

  const selecionar = (cand) => {
    if (!cand1) { setCand1(cand); return; }
    if (cand1.id === cand.id) { setCand1(null); return; }
    if (!cand2) { setCand2(cand); return; }
    if (cand2.id === cand.id) { setCand2(null); return; }
  };

  const analisar = async () => {
    if (!cand1 || !cand2) return;
    setLoading(true); setResultado(""); setAnalisado(false);
    try {
      const texto = await callClaude(`O eleitor está com dúvida entre dois candidatos para ${cargo}${cargo !== "Presidente" ? ` em ${estado}` : ""} nas eleições 2026:\n\nCandidato 1: ${cand1.name} (${cand1.partido}) — Nota Votook: ${cand1.score}/10\nCandidato 2: ${cand2.name} (${cand2.partido}) — Nota Votook: ${cand2.score}/10\n\nFaça uma análise comparativa honesta e imparcial buscando informações na internet. Analise: histórico político, integridade (processos, ficha limpa), propostas conhecidas, patrimônio, desempenho em pesquisas recentes. Apresente: PONTOS FORTES de cada um, PONTOS FRACOS de cada um, RECOMENDAÇÃO BASEADA EM DADOS com justificativa clara.`);
      setResultado(texto);
    } catch { setResultado("⚠️ Não foi possível analisar. Tente novamente."); }
    setLoading(false); setAnalisado(true);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#070F1C", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "linear-gradient(180deg, #0D1F35 0%, #070F1C 100%)", padding: "44px 20px 20px" }}>
        <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", fontFamily: "'Georgia', serif", letterSpacing: -0.5, marginBottom: 4 }}>Voto<span style={{ color: "#00C896" }}>ok</span></div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginBottom: 4 }}>Tira Dúvida — Compare candidatos</div>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.5, marginBottom: 12 }}>Selecione o cargo, o estado e toque em 2 candidatos para comparar.</p>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8 }}>
          {cargos.map(c => (<button key={c} onClick={() => { setCargo(c); setCand1(null); setCand2(null); setAnalisado(false); setResultado(""); }} style={{ flexShrink: 0, padding: "6px 14px", borderRadius: 20, border: `0.5px solid ${cargo === c ? "#00C896" : "rgba(255,255,255,0.15)"}`, background: cargo === c ? "rgba(0,200,150,0.15)" : "transparent", color: cargo === c ? "#00C896" : "rgba(255,255,255,0.5)", fontSize: 12, cursor: "pointer", fontWeight: cargo === c ? 600 : 400 }}>{c}</button>))}
        </div>
        {cargo !== "Presidente" && (
          <select value={estado} onChange={e => { setEstado(e.target.value); setCand1(null); setCand2(null); setAnalisado(false); setResultado(""); }} style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "0.5px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "10px 14px", fontSize: 14, color: "#fff", outline: "none", marginTop: 8 }}>
            {STATES.map(s => (<option key={s.abbr} value={s.abbr} style={{ background: "#0D1F35" }}>{s.abbr} — {s.name}</option>))}
          </select>
        )}
      </div>

      <div style={{ flex: 1, padding: "16px 20px 20px" }}>
        {/* Selecionados */}
        {(cand1 || cand2) && (
          <div style={{ background: "rgba(0,200,150,0.08)", border: "0.5px solid rgba(0,200,150,0.2)", borderRadius: 12, padding: "12px 16px", marginBottom: 14, display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ flex: 1, fontSize: 13, color: "#fff" }}>
              {cand1 && <div style={{ marginBottom: cand2 ? 4 : 0 }}>✓ <strong>{cand1.name}</strong></div>}
              {cand2 && <div>✓ <strong>{cand2.name}</strong></div>}
              {!cand2 && <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>Selecione mais 1 candidato abaixo</div>}
            </div>
            {cand1 && cand2 && (
              <button onClick={analisar} disabled={loading} style={{ background: "#00C896", border: "none", borderRadius: 10, padding: "10px 18px", fontSize: 13, fontWeight: 700, color: "#070F1C", cursor: "pointer", flexShrink: 0 }}>
                {loading ? "..." : "Comparar →"}
              </button>
            )}
          </div>
        )}

        {/* Lista de candidatos */}
        <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>
          {candidatosFiltrados.length > 0 ? "Toque para selecionar (escolha 2)" : "Candidatos"}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
          {candidatosFiltrados.length === 0 && (
            <div style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "20px", textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
              Nenhum candidato cadastrado para este cargo/estado ainda.
            </div>
          )}
          {candidatosFiltrados.map(c => {
            const sel1 = cand1?.id === c.id;
            const sel2 = cand2?.id === c.id;
            const selecionado = sel1 || sel2;
            const col = getInitialsColor(c.score);
            return (
              <div key={c.id} onClick={() => selecionar(c)} style={{ background: selecionado ? "rgba(0,200,150,0.1)" : "rgba(255,255,255,0.03)", border: `0.5px solid ${selecionado ? "#00C896" : "rgba(255,255,255,0.08)"}`, borderRadius: 12, padding: "12px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", border: `2px solid ${selecionado ? "#00C896" : "rgba(255,255,255,0.2)"}`, background: selecionado ? "#00C896" : "transparent", flexShrink: 0 }} />
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: col.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: col.color, flexShrink: 0 }}>{c.initials}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 1 }}>{c.partido}</div>
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: getScoreColor(c.score) }}>{c.score.toFixed(1)}</div>
              </div>
            );
          })}
        </div>

        {loading && <Spinner text={`Buscando informações sobre ${cand1?.name} e ${cand2?.name}...`} />}

        {analisado && resultado && (
          <div style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(0,200,150,0.15)", borderRadius: 12, padding: "16px" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 12, alignItems: "center" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00C896" }} />
              <span style={{ fontSize: 11, color: "#00C896", fontWeight: 600 }}>Análise comparativa — IA Votook</span>
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{resultado}</div>
          </div>
        )}
      </div>
      <BottomNav current="tira-duvida" onNext={onNext} />
    </div>
  );
}

function DetailScreen({ onNext, candidate: c }) {
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiLoaded, setAiLoaded] = useState(false);
  const scoreCol = getScoreColor(c.score); const col = getInitialsColor(c.score); const verdict = getVerdict(c.score);
  const fetchAI = async () => {
    setLoadingAI(true); setAiLoaded(false); setAiAnalysis("");
    try {
      const texto = await callClaude(`Analise este candidato e gere um parecer para o eleitor:\nNome: ${c.name}\nCargo: ${c.cargo}\nPartido: ${c.partido}\nMandatos: ${c.mandatos}\nProcessos: ${c.processos}\nPatrimônio inicial: ${c["patrimônio_ini"]}\nPatrimônio atual: ${c["patrimônio_fim"]}\nIdade: ${c.idade}\nFormação: ${c.formacao}\nNota: ${c.score}/10\n\nBusque informações adicionais na internet. Gere:\n1. PARECER GERAL (2 parágrafos)\n2. PONTOS POSITIVOS\n3. PONTOS DE ATENÇÃO\n4. RECOMENDAÇÃO FINAL`);
      setAiAnalysis(texto); setAiLoaded(true);
    } catch { setAiAnalysis("⚠️ Erro ao carregar análise. Tente novamente."); setAiLoaded(true); }
    setLoadingAI(false);
  };
  return (
    <div style={{ minHeight: "100vh", background: "#070F1C", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "linear-gradient(180deg, #0D1F35 0%, #0A1929 100%)", padding: "44px 20px 24px" }}>
        <button onClick={() => onNext("candidates")} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 20 }}>← Voltar</button>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div style={{ width: 60, height: 60, borderRadius: "50%", background: col.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: col.color, flexShrink: 0 }}>{c.initials}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>{c.name}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 3 }}>{c.cargo} — {c.partido}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 8 }}>
              <span style={{ fontSize: 36, fontWeight: 900, color: scoreCol, lineHeight: 1 }}>{c.score.toFixed(1)}</span>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>/10</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: verdict.color, marginLeft: 4 }}>• {verdict.label}</span>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[{ label: "Integridade", val: c.scores_cat.integridade }, { label: "Projetos", val: c.scores_cat.projetos }, { label: "Presença", val: c.scores_cat.presenca }, { label: "Patrimônio", val: c.scores_cat.patrimonio }].map(({ label, val }) => (
            <div key={label} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "10px 12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>{label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: getScoreColor(val) }}>{val.toFixed(1)}</span>
              </div>
              <div style={{ height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2 }}><div style={{ width: `${val * 10}%`, height: "100%", background: getScoreFill(val), borderRadius: 2 }} /></div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, padding: "20px 20px 40px", display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>Dados pessoais e carreira</div>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 12, overflow: "hidden" }}>
            {[["Idade", `${c.idade} anos`], ["Formação", c.formacao], ["Mandatos", c.mandatos === 0 ? "Primeiro mandato" : `${c.mandatos} mandato${c.mandatos > 1 ? "s" : ""}`], ["Processos", c.processos === 0 ? "✓ Nenhum" : `⚠ ${c.processos}`], ["Patrimônio inicial", c["patrimônio_ini"]], ["Patrimônio atual", c["patrimônio_fim"]]].map(([label, val], i, arr) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", borderBottom: i < arr.length - 1 ? "0.5px solid rgba(255,255,255,0.05)" : "none" }}>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>{label}</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: val.startsWith("✓") ? "#97C459" : val.startsWith("⚠") ? "#F09595" : "#fff" }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>Resumo rápido</div>
          <div style={{ background: "rgba(0,200,150,0.06)", border: "0.5px solid rgba(0,200,150,0.2)", borderRadius: 12, padding: "14px 16px", fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>{c.resumo}</div>
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>Análise completa da IA</div>
          {!aiLoaded && !loadingAI && (<button onClick={fetchAI} style={{ width: "100%", background: "rgba(0,200,150,0.1)", border: "0.5px solid rgba(0,200,150,0.3)", borderRadius: 12, padding: "16px", fontSize: 14, fontWeight: 600, color: "#00C896", cursor: "pointer" }}>Gerar análise completa com IA →</button>)}
          {loadingAI && <Spinner text="Analisando candidato..." />}
          {aiLoaded && (<div style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(0,200,150,0.15)", borderRadius: 12, padding: "16px" }}><div style={{ display: "flex", gap: 8, marginBottom: 12, alignItems: "center" }}><div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00C896" }} /><span style={{ fontSize: 11, color: "#00C896", fontWeight: 600 }}>Análise gerada pela IA Votook</span></div><div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{aiAnalysis}</div></div>)}
        </div>
        {c.noticias.length > 0 && (
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>Notícias</div>
            {c.noticias.map((n, i) => (<div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "12px 14px", marginBottom: 8 }}><div style={{ fontSize: 13, fontWeight: 500, color: "#fff" }}>{n.titulo}</div><div style={{ display: "flex", gap: 8, marginTop: 4 }}><span style={{ fontSize: 11, color: "#00C896" }}>{n.fonte}</span><span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>• {n.data}</span></div></div>))}
          </div>
        )}
        <div style={{ background: "rgba(0,200,150,0.06)", border: "0.5px solid rgba(0,200,150,0.2)", borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Compartilhe esta análise</div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>Ajude outros eleitores a votarem conscientes</div></div>
          <button onClick={() => { if (navigator.share) navigator.share({ title: `${c.name} no Votook`, text: `${c.name} tem nota ${c.score}/10 no Votook!`, url: "https://votook.com.br" }); }} style={{ background: "#00C896", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 700, color: "#070F1C", cursor: "pointer" }}>Compartilhar</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("splash");
  const [ctx, setCtx] = useState({});
  const goTo = (s, data = {}) => { setCtx(prev => ({ ...prev, ...data })); setScreen(s); };
  return (
    <div style={{ fontFamily: "'Georgia', serif", maxWidth: 480, margin: "0 auto", minHeight: "100vh" }}>
      {screen === "splash" && <SplashScreen onNext={goTo} />}
      {screen === "register" && <RegisterScreen onNext={goTo} />}
      {screen === "login" && <LoginScreen onNext={goTo} />}
      {screen === "states" && <StatesScreen onNext={goTo} user={ctx.user} />}
      {screen === "candidates" && <CandidatesScreen onNext={goTo} state={ctx.state || { abbr: "GO", name: "Goiás" }} user={ctx.user} />}
      {screen === "detail" && <DetailScreen onNext={goTo} candidate={ctx.candidate} user={ctx.user} />}
      {screen === "pesquisas" && <PesquisasScreen onNext={goTo} />}
      {screen === "tira-duvida" && <TiraDuvidaScreen onNext={goTo} ctx={ctx} />}
    </div>
  );
}

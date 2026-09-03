import { useState, useEffect, useRef } from "react";

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

const MOCK_CANDIDATES = {
  GO: [
    { id: 1, name: "Marina Rezende", initials: "MR", cargo: "Governadora", partido: "PSDB", mandatos: 2, score: 8.4, processos: 0, "patrimônio_ini": "R$ 320 mil", "patrimônio_fim": "R$ 580 mil", idade: 51, formacao: "Medicina — UFG", resumo: "Trajetória política limpa com foco em saúde pública. Dois mandatos como deputada federal com alto índice de presença. Patrimônio compatível com a carreira. Nenhum processo judicial.", tags: [{ label: "Sem processos", type: "good" }, { label: "Alta presença", type: "good" }, { label: "2 mandatos", type: "neutral" }], noticias: [{ titulo: "Marina propõe ampliação de UPAs no interior de Goiás", fonte: "O Popular", data: "mar 2025" }, { titulo: "Deputada lidera votação sobre saneamento básico", fonte: "Jornal Opção", data: "out 2024" }], scores_cat: { integridade: 9.1, projetos: 8.2, presenca: 8.8, patrimonio: 9.0 } },
    { id: 2, name: "Carlos Duarte", initials: "CD", cargo: "Senador", partido: "PSD", mandatos: 1, score: 7.6, processos: 0, "patrimônio_ini": "R$ 210 mil", "patrimônio_fim": "R$ 390 mil", idade: 44, formacao: "Direito — PUC Goiás", resumo: "Primeiro mandato sólido no Senado. Bom histórico de votações, especialmente em pautas econômicas. Sem escândalos. Crescimento patrimonial dentro do esperado.", tags: [{ label: "Ficha limpa", type: "good" }, { label: "1 mandato", type: "neutral" }], noticias: [{ titulo: "Carlos Duarte vota a favor da reforma tributária", fonte: "Valor Econômico", data: "jan 2025" }], scores_cat: { integridade: 8.0, projetos: 7.2, presenca: 7.8, patrimonio: 8.1 } },
    { id: 3, name: "Roberto Neves", initials: "RN", cargo: "Dep. Federal", partido: "PL", mandatos: 3, score: 5.8, processos: 1, "patrimônio_ini": "R$ 450 mil", "patrimônio_fim": "R$ 2.1 mi", idade: 58, formacao: "Administração — UEG", resumo: "Três mandatos com histórico irregular. Um processo administrativo em andamento e crescimento patrimonial elevado. Votações inconsistentes em pautas sociais.", tags: [{ label: "1 processo", type: "bad" }, { label: "Enriquecimento", type: "bad" }, { label: "3 mandatos", type: "neutral" }], noticias: [{ titulo: "Deputado investigado por licitação irregular em Goiânia", fonte: "Metrópoles", data: "fev 2025" }, { titulo: "Roberto Neves defende isenção fiscal para mineradoras", fonte: "O Popular", data: "set 2024" }], scores_cat: { integridade: 4.2, projetos: 6.1, presenca: 6.8, patrimonio: 3.5 } },
    { id: 4, name: "Joana Ferraz", initials: "JF", cargo: "Dep. Estadual", partido: "Solidariedade", mandatos: 1, score: 7.1, processos: 0, "patrimônio_ini": "R$ 180 mil", "patrimônio_fim": "R$ 290 mil", idade: 38, formacao: "Pedagogia — UFG", resumo: "Primeiro mandato com foco em educação e direitos da mulher. Sem histórico de irregularidades. Perfil jovem com engajamento digital intenso.", tags: [{ label: "Sem processos", type: "good" }, { label: "Foco em educação", type: "good" }], noticias: [{ titulo: "Joana Ferraz inaugura projeto de reforço escolar em Aparecida", fonte: "Diário de Goiás", data: "abr 2025" }], scores_cat: { integridade: 8.5, projetos: 6.8, presenca: 7.2, patrimonio: 8.0 } },
    { id: 5, name: "Adilson Teixeira", initials: "AT", cargo: "Dep. Federal", partido: "MDB", mandatos: 4, score: 2.9, processos: 3, "patrimônio_ini": "R$ 380 mil", "patrimônio_fim": "R$ 4.8 mi", idade: 63, formacao: "Não declarada", resumo: "Ficha extremamente irregular. Quatro mandatos com três processos judiciais ativos, incluindo investigação por desvio de verba pública. Crescimento patrimonial de mais de 1.100% sem justificativa.", tags: [{ label: "Ficha suja", type: "bad" }, { label: "3 processos", type: "bad" }, { label: "Enriquecimento ilícito", type: "bad" }], noticias: [{ titulo: "Adilson Teixeira é alvo de operação da PF por desvio de emendas", fonte: "G1 Goiás", data: "mar 2025" }, { titulo: "MPF pede afastamento do deputado por improbidade", fonte: "Correio Braziliense", data: "nov 2024" }], scores_cat: { integridade: 1.0, projetos: 3.2, presenca: 4.1, patrimonio: 1.2 } },
  ],
  SP: [
    { id: 6, name: "Ana Paula Costa", initials: "AC", cargo: "Governadora", partido: "PSDB", mandatos: 2, score: 8.9, processos: 0, "patrimônio_ini": "R$ 890 mil", "patrimônio_fim": "R$ 1.4 mi", idade: 55, formacao: "Economia — USP", resumo: "Carreira técnica sólida antes da política. Governadora com altos índices de aprovação e projetos de infraestrutura aprovados. Ficha completamente limpa.", tags: [{ label: "Sem processos", type: "good" }, { label: "Alta aprovação", type: "good" }], noticias: [{ titulo: "SP lidera ranking de transparência pública sob gestão de Ana Paula", fonte: "Folha de S.Paulo", data: "abr 2025" }], scores_cat: { integridade: 9.5, projetos: 8.8, presenca: 9.0, patrimonio: 8.7 } },
    { id: 7, name: "Marcelo Braga", initials: "MB", cargo: "Senador", partido: "PT", mandatos: 3, score: 6.2, processos: 1, "patrimônio_ini": "R$ 520 mil", "patrimônio_fim": "R$ 1.9 mi", idade: 60, formacao: "Ciências Sociais — UNICAMP", resumo: "Três mandatos com atuação intensa em pautas trabalhistas. Um processo por uso irregular de verba de gabinete. Crescimento patrimonial acima da média.", tags: [{ label: "1 processo", type: "bad" }, { label: "Atuação trabalhista", type: "good" }], noticias: [{ titulo: "Braga responde a processo por verba de gabinete desviada", fonte: "UOL", data: "fev 2025" }], scores_cat: { integridade: 5.0, projetos: 7.4, presenca: 7.8, patrimonio: 5.2 } },
  ],
};

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
        {[
          { key: "nome", label: "Nome completo", type: "text", placeholder: "Seu nome e sobrenome" },
          { key: "email", label: "E-mail", type: "email", placeholder: "seu@email.com" },
          { key: "celular", label: "Celular com DDD", type: "tel", placeholder: "(62) 99999-9999" },
          { key: "cep", label: "CEP residencial", type: "text", placeholder: "74000-000" },
        ].map(({ key, label, type, placeholder }) => (
          <div key={key} style={{ marginBottom: 18 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.55)", marginBottom: 6 }}>{label}</label>
            <input type={type} placeholder={placeholder} value={form[key]}
              onChange={e => { let v = e.target.value; if (key === "celular") v = mask(v, "cel"); if (key === "cep") v = mask(v, "cep"); setForm(f => ({ ...f, [key]: v })); setErrors(er => ({ ...er, [key]: undefined })); }}
              style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: `0.5px solid ${errors[key] ? "#E24B4A" : "rgba(255,255,255,0.12)"}`, borderRadius: 10, padding: "13px 14px", fontSize: 15, color: "#fff", outline: "none" }} />
            {errors[key] && <div style={{ fontSize: 11, color: "#E24B4A", marginTop: 4 }}>{errors[key]}</div>}
          </div>
        ))}
        <div style={{ background: "rgba(0,200,150,0.08)", border: "0.5px solid rgba(0,200,150,0.2)", borderRadius: 10, padding: "12px 14px", marginBottom: 24, display: "flex", gap: 10 }}>
          <span>🔒</span>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>Seus dados são protegidos e nunca vendidos.</p>
        </div>
        <button onClick={handleSubmit} disabled={loading} style={{ width: "100%", background: "#00C896", border: "none", borderRadius: 12, padding: "15px", fontSize: 15, fontWeight: 700, color: "#070F1C", cursor: "pointer" }}>
          {loading ? "Criando conta..." : "Criar conta e acessar →"}
        </button>
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
            <input type={type} placeholder={placeholder} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
              style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "0.5px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "13px 14px", fontSize: 15, color: "#fff", outline: "none" }} />
          </div>
        ))}
        <button onClick={handleLogin} disabled={loading} style={{ width: "100%", background: "#00C896", border: "none", borderRadius: 12, padding: "15px", fontSize: 15, fontWeight: 700, color: "#070F1C", cursor: "pointer", marginTop: 8 }}>
          {loading ? "Entrando..." : "Entrar →"}
        </button>
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
          <button key={s.abbr} onClick={() => onNext("candidates", { state: s })}
            style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "14px 8px", cursor: "pointer", textAlign: "center" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,200,150,0.08)"; e.currentTarget.style.borderColor = "rgba(0,200,150,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: "#fff" }}>{s.abbr}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", marginTop: 3 }}>{s.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function CandidatesScreen({ onNext, state, user }) {
  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const cargos = ["Todos", "Governador", "Senador", "Dep. Federal", "Dep. Estadual"];
  const all = MOCK_CANDIDATES[state.abbr] || MOCK_CANDIDATES["GO"];
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
      <div style={{ flex: 1, padding: "8px 16px 32px", display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map((c, i) => {
          const col = getInitialsColor(c.score); const scoreCol = getScoreColor(c.score); const fillCol = getScoreFill(c.score);
          return (
            <div key={c.id} onClick={() => onNext("detail", { candidate: c })} style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "14px 16px", cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(0,200,150,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}>
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
    </div>
  );
}

function DetailScreen({ onNext, candidate: c }) {
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiLoaded, setAiLoaded] = useState(false);
  const scoreCol = getScoreColor(c.score); const col = getInitialsColor(c.score); const verdict = getVerdict(c.score);
  const fetchAIAnalysis = async () => {
    setLoadingAI(true); setAiLoaded(false); setAiAnalysis("");
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: "Você é o motor de análise do Votook, plataforma brasileira de análise de candidatos políticos. Analise candidatos de forma honesta, objetiva e imparcial. Responda SEMPRE em português do Brasil.",
          messages: [{ role: "user", content: `Analise este candidato e gere um parecer para o eleitor:\n\nNome: ${c.name}\nCargo: ${c.cargo}\nPartido: ${c.partido}\nMandatos: ${c.mandatos}\nProcessos: ${c.processos}\nPatrimônio inicial: ${c["patrimônio_ini"]}\nPatrimônio atual: ${c["patrimônio_fim"]}\nIdade: ${c.idade}\nFormação: ${c.formacao}\nNota geral: ${c.score}/10\n\nGere: 1) Parecer geral (2 parágrafos) 2) Pontos positivos 3) Pontos de atenção 4) Recomendação final` }]
        })
      });
      const data = await response.json();
      const text = data.content?.find(b => b.type === "text")?.text || "Análise não disponível.";
      setAiAnalysis(text); setAiLoaded(true);
    } catch (err) { setAiAnalysis("⚠️ Erro ao carregar análise. Tente novamente."); setAiLoaded(true); }
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
          {!aiLoaded && !loadingAI && (<button onClick={fetchAIAnalysis} style={{ width: "100%", background: "rgba(0,200,150,0.1)", border: "0.5px solid rgba(0,200,150,0.3)", borderRadius: 12, padding: "16px", fontSize: 14, fontWeight: 600, color: "#00C896", cursor: "pointer" }}>Gerar análise completa com IA →</button>)}
          {loadingAI && (<div style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "24px 16px", textAlign: "center" }}><div style={{ width: 32, height: 32, border: "2px solid rgba(0,200,150,0.3)", borderTopColor: "#00C896", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 12px" }} /><p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>Analisando candidato...</p><style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style></div>)}
          {aiLoaded && (<div style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(0,200,150,0.15)", borderRadius: 12, padding: "16px" }}><div style={{ display: "flex", gap: 8, marginBottom: 12, alignItems: "center" }}><div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00C896" }} /><span style={{ fontSize: 11, color: "#00C896", fontWeight: 600 }}>Análise gerada pela IA Votook</span></div><div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{aiAnalysis}</div></div>)}
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>Notícias encontradas</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {c.noticias.map((n, i) => (<div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "12px 14px" }}><div style={{ fontSize: 13, fontWeight: 500, color: "#fff", lineHeight: 1.4 }}>{n.titulo}</div><div style={{ display: "flex", gap: 8, marginTop: 6 }}><span style={{ fontSize: 11, color: "#00C896" }}>{n.fonte}</span><span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>• {n.data}</span></div></div>))}
          </div>
        </div>
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
    </div>
  );
}

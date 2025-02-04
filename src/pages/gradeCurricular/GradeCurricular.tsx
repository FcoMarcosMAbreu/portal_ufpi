import "./GradeCurricular.css"

interface DisciplinaProps {
  codigo: string
  nome: string
  creditos: number
  cargaHoraria: number
  tipo: "Obrigatória" | "Optativa"
}

const disciplinasDoutorado: DisciplinaProps[] = [
  {
    codigo: "PPGCC001",
    nome: "Metodologia da Pesquisa Científica",
    creditos: 4,
    cargaHoraria: 60,
    tipo: "Obrigatória",
  },
  {
    codigo: "PPGCC002",
    nome: "Seminários de Doutorado I",
    creditos: 2,
    cargaHoraria: 30,
    tipo: "Obrigatória",
  },
  {
    codigo: "PPGCC003",
    nome: "Seminários de Doutorado II",
    creditos: 2,
    cargaHoraria: 30,
    tipo: "Obrigatória",
  },
  {
    codigo: "PPGCC004",
    nome: "Tópicos Avançados em Computação",
    creditos: 4,
    cargaHoraria: 60,
    tipo: "Optativa",
  },
]

const disciplinasMestrado: DisciplinaProps[] = [
  {
    codigo: "PPGCC101",
    nome: "Metodologia da Pesquisa",
    creditos: 3,
    cargaHoraria: 45,
    tipo: "Obrigatória",
  },
  {
    codigo: "PPGCC102",
    nome: "Seminários de Mestrado",
    creditos: 2,
    cargaHoraria: 30,
    tipo: "Obrigatória",
  },
  {
    codigo: "PPGCC103",
    nome: "Fundamentos de Computação",
    creditos: 4,
    cargaHoraria: 60,
    tipo: "Obrigatória",
  },
  {
    codigo: "PPGCC104",
    nome: "Tópicos Especiais em Computação",
    creditos: 4,
    cargaHoraria: 60,
    tipo: "Optativa",
  },
]

function DisciplinaCard({ disciplina }: { disciplina: DisciplinaProps }) {
  return (
    <div className={`disciplina-card ${disciplina.tipo.toLowerCase()}`}>
      <div className="disciplina-header">
        <span className="disciplina-codigo">{disciplina.codigo}</span>
        <span className={`disciplina-tipo ${disciplina.tipo.toLowerCase()}`}>{disciplina.tipo}</span>
      </div>
      <h3 className="disciplina-nome">{disciplina.nome}</h3>
      <div className="disciplina-info">
        <span>Créditos: {disciplina.creditos}</span>
        <span>Carga Horária: {disciplina.cargaHoraria}h</span>
      </div>
    </div>
  )
}

export default function GradeCurricular() {
  return (
    <div className="curriculo-container">
      <section className="programa-section">
        <h2>Doutorado</h2>
        <div className="disciplinas-grid">
          {disciplinasDoutorado.map((disciplina) => (
            <DisciplinaCard key={disciplina.codigo} disciplina={disciplina} />
          ))}
        </div>
      </section>

      <section className="programa-section">
        <h2>Mestrado</h2>
        <div className="disciplinas-grid">
          {disciplinasMestrado.map((disciplina) => (
            <DisciplinaCard key={disciplina.codigo} disciplina={disciplina} />
          ))}
        </div>
      </section>
    </div>
  )
}
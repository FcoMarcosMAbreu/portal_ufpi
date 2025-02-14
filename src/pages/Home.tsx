import "./Home.css"
import { ArrowDown } from "lucide-react"

// Mock data
const FEATURES = [
  {
    id: 1,
    title: "Pesquisa Inovadora",
    description:
      "Desenvolvimento de projetos de pesquisa de ponta com impacto nacional e internacional em áreas estratégicas da computação.",
  },
  {
    id: 2,
    title: "Corpo Docente Qualificado",
    description: "Professores doutores com formação em instituições renomadas e produção científica relevante.",
  },
  {
    id: 3,
    title: "Infraestrutura Moderna",
    description: "Laboratórios equipados com tecnologia de ponta, biblioteca atualizada e espaços de estudo dedicados.",
  },
  /*{
    id: 4,
    title: "Parcerias Internacionais",
    description: "Acordos de cooperação com universidades estrangeiras e participação em redes de pesquisa globais.",
  },*/
]

const PROFESSORS = [
  {
    id: 1,
    nome: "Dr. João Silva",
    nivel: "Professor Titular",
    email: "joao.silva@ufpi.edu.br",
    area: "Avicultura Tropical",
    curriculo_lattes: "http://lattes.cnpq.br/",
    publicacoes: 45,
  },
  {
    id: 2,
    nome: "Dra. Maria Santos",
    nivel: "Professora Associada",
    email: "maria.santos@ufpi.edu.br",
    area: "Análise de Alimentos",
    curriculo_lattes: "http://lattes.cnpq.br/",
    publicacoes: 38,
  },/*
  {
    id: 3,
    nome: "Dr. Pedro Costa",
    nivel: "Professor Adjunto",
    email: "pedro.costa@ufpi.edu.br",
    area: "Segurança da Informação",
    curriculo_lattes: "http://lattes.cnpq.br/",
    publicacoes: 32,
  },*/
]

const PARTNERS = [
  {
    id: 1,
    name: "CAPES",
    logo: "/capes-logo.png",
    description: "Coordenação de Aperfeiçoamento de Pessoal de Nível Superior",
  },
  {
    id: 2,
    name: "CNPq",
    logo: "/cnpq-logo.png",
    description: "Conselho Nacional de Desenvolvimento Científico e Tecnológico",
  },
  {
    id: 3,
    name: "FAPEPI",
    logo: "/fapepi-logo.png",
    description: "Fundação de Amparo à Pesquisa do Estado do Piauí",
  },
]

const HERO_DATA = {
  title: "Programa de Pós-Graduação em Zootecnia Tropical - CCA",
  subtitle: "Mestrado e Doutorado",
  description: "Formando Pesquisadores e Profissionais Especializados na área de Zootecnia",
}

function Home() {
  const scrollToContent = () => {
    const contentSection = document.getElementById("content")
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-overlay">
          <h1>{HERO_DATA.title}</h1>
          <p className="hero-subtitle">{HERO_DATA.subtitle}</p>
          <p className="hero-description">{HERO_DATA.description}</p>
          <button onClick={scrollToContent} className="scroll-button" aria-label="Rolar para conteúdo">
            <ArrowDown className="scroll-icon" />
          </button>
        </div>
      </section>

      <div id="content" className="content-section">
        <section className="about">
          <h2>Sobre o Programa</h2>
          {/*<p>
            O Programa de Pós-Graduação em Computação da Universidade Federal do Piauí (UFPI) é referência em pesquisa e
            inovação tecnológica. Nosso compromisso é formar profissionais e pesquisadores de excelência, contribuindo
            para o avanço da ciência e desenvolvimento tecnológico do país.
          </p>*/}
          <p>
          O Programa de Pós-Graduação em Zootecnia Tropical (PPGZT) da UFPI é um curso Stricto sensu vinculado ao Centro
           de Ciências Agrárias. Seu objetivo é formar docentes, pesquisadores e especialistas em Zootecnia, 
           contribuindo para a produção pecuária sustentável e a melhoria da qualidade de vida no campo. 
           Oferece Mestrado e Doutorado, promovendo a inserção de jovens doutores e acompanhando o impacto
            dos egressos na sociedade. Com abordagem internacional, suas pesquisas se concentram na Produção 
            Animal, abrangendo Nutrição, Melhoramento Genético e Reprodução nos Trópicos. As atividades são 
            organizadas em duas linhas de pesquisa: 1 - Produção de Alimentos e Nutrição Animal nos Trópicos 
            e 2 - Genética, Melhoramento Genético e Reprodução Animal nos Trópicos.
            <br/>
            Acompanhe mais pelo Instagram <a href="https://www.instagram.com/ppgztufpi/">@ppgztufpi</a> e YouTube: <a href="https://www.youtube.com/channel/UCuN8pgJX11FN57mR44NukGg">PPGZT UFPI</a>.
          </p>
        </section>

        <section className="features">
          <div className="features-grid">
            {FEATURES.map((feature) => (
              <div key={feature.id} className="feature-card">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="professors">
          <h2>Coordenadores do Programa</h2>
          <div className="professors-grid">
            {PROFESSORS.map((professor) => (
              <div key={professor.id} className="professor-card">
                <h3>{professor.nome}</h3>
                <p>
                  <strong>Nível:</strong> {professor.nivel}
                </p>
                <p>
                  <strong>Área:</strong> {professor.area}
                </p>
                <p>
                  <strong>Email:</strong> {professor.email}
                </p>
                <p>
                  <strong>Publicações:</strong> {professor.publicacoes}
                </p>
                <a href={professor.curriculo_lattes} target="_blank" rel="noopener noreferrer" className="lattes-link">
                  Currículo Lattes
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="stats">
          <div className="stats-grid">
            <div className="stat-card">
              <h3>45+</h3>
              <p>Professores Doutores</p>
            </div>
            <div className="stat-card">
              <h3>200+</h3>
              <p>Alunos Formados</p>
            </div>
            <div className="stat-card">
              <h3>30+</h3>
              <p>Projetos de Pesquisa</p>
            </div>
            <div className="stat-card">
              <h3>15+</h3>
              <p>Parcerias Internacionais</p>
            </div>
          </div>
        </section>

        <section className="partners">
          <h2>Parceiros Institucionais</h2>
          <div className="partners-grid">
            {PARTNERS.map((partner) => (
              <div key={partner.id} className="partner-card">
                <img src={partner.logo || "/placeholder.svg"} alt={partner.name} className="partner-logo" />
                <p className="partner-description">{partner.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home


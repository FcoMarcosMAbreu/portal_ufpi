import "./Home.css"

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-image">
          <img src="/campus-image.jpg" alt="Campus UFPI" />
        </div>
        <div className="hero-text">
          <h1>Bem-vindo ao Programa de Pós-Graduação</h1>
          <p>
            O Programa de Pós-Graduação em [Nome do Programa] da Universidade Federal do Piauí (UFPI) é dedicado à
            formação de profissionais e pesquisadores de alto nível. Nosso objetivo é promover a excelência acadêmica e
            contribuir para o avanço do conhecimento em nossa área de atuação.
          </p>
        </div>
      </section>

      <section className="alternative">
        <h2>Destaques do Programa</h2>
        <div className="cards">
          <div className="card">
            <h3>Pesquisa Inovadora</h3>
            <p>Conheça nossos projetos de pesquisa de ponta e oportunidades de colaboração.</p>
          </div>
          <div className="card">
            <h3>Corpo Docente Qualificado</h3>
            <p>Aprenda com professores reconhecidos nacional e internacionalmente em suas áreas.</p>
          </div>
          <div className="card">
            <h3>Infraestrutura Moderna</h3>
            <p>Acesse laboratórios e recursos de última geração para apoiar sua pesquisa.</p>
          </div>
        </div>
      </section>

      <section className="contact">
        <h2>Coordenação do Programa</h2>
        <div className="contact-info">
          <p>
            <strong>Coordenador:</strong> Prof. Dr. [Nome do Coordenador]
          </p>
          <p>
            <strong>E-mail:</strong> coordenacao@ufpi.edu.br
          </p>
          <p>
            <strong>Telefone:</strong> (86) 3215-XXXX
          </p>
          <p>
            <strong>Endereço:</strong> Campus Universitário Ministro Petrônio Portella, Bairro Ininga, Teresina-PI
          </p>
        </div>
      </section>
    </div>
  )
}

export default Home
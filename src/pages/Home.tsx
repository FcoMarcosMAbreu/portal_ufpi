import "./Home.css"

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-image">
          <img src="src\assets\images\predio_CCA_3.png" alt="Campus UFPI" />
        </div>
        <div className="hero-text">
          <h1>PPGZT-CCA COORDENACAO DO PROGRAMA DE POS-GRADUACAO EM ZOOTECNIA TROPICAL-CCA</h1>
          <p>
          O Programa de Pós-Graduação em Zootecnia Tropical (PPGZT) é um programa Stricto sensu, 
          vinculado ao Centro de Ciências Agrárias, ao Campus Professora Cinobelina Elvas e à 
          Pró-Reitoria de Ensino de Pós-Graduação da Universidade Federal do Piauí.
          </p>
          <p>
          Tem como objetivo principal a formação de docentes, pesquisadores e profissionais
           especializados na área de Zootecnia, com compromisso de solucionar problemas 
           relacionados à produção pecuária, por meio de atividades de ciência e 
           tecnologia que visem proporcionar a melhoria da qualidade de vida do homem 
           do campo e a conservação do meio ambiente que se insere, através de ampla 
           e sólida formação técnica, abrangendo as modalidades de Mestrado e 
           Doutorado acadêmicos, conduzindo aos Títulos de Mestre e de Doutor em Zootecnia.
          </p>
          <p>
          O Programa valoriza o acompanhamento dos egressos e seu impacto na sociedade, 
          bem como, estimulada a inserção de jovens doutores 
          (recém-doutores ou recém-contratados) no corpo docente 
          permanente do Programa, de modo a facilitar a renovação e reposição.
           Vale destacar que a dimensão internacional é parte integrante das 
           atividades de ensino e pesquisas científicas do Programa.
          </p>
          <p>
          O PPGZT tem suas atividades de pesquisa e ensino organizadas na área de 
          concentração Produção Animal, com duas linhas de pesquisa (1 - 
          Produção de Alimentos e Nutrição Animal nos Trópicos; 2 - Genética, 
          Melhoramento Genético e Reprodução Animal nos Trópicos), definidas 
          em termos de campos disciplinares de observação e abordagens teórico-metodológicas. 
          Fique por dentro de tudo também pelas nossas redes sociais 📷Instagram: @ppgztufpi 
          📹Youtube: <a>https://www.youtube.com/channel/UCuN8pgJX11FN57mR44NukGg</a> 
          </p>
        </div>
      </section>

      <section className="alternative">
        <h2 className="h2-color-text">Destaques do Programa</h2>
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
            <strong>Coordenador:</strong> 
            <br/>Natanael Pereira da Silva Santos 
          </p>
          <p>
            <strong>E-mail:</strong>
            <br/>zootropical@ufpi.edu.br
          </p>
          <p>
            <strong>Telefones:</strong> 
            <br/>(86)2222-4039 - Ramal 1
            <br/>(86)2222-4039 - Ramal 2
          </p>
          <p>
            <strong>Endereço:</strong> 
            <br/>Campus Universitário Ministro Petrônio Portella, Bairro Ininga, Teresina-PI
          </p>
        </div>
      </section>
    </div>
  )
}

export default Home
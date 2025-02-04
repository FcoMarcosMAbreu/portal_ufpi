import "./ApresentacaoCursos.css";

function ApresentacaoCursos() {
  return (
    <div className="pos-container">
      <h2 className="pos-title">Pós-Graduação</h2>
      <div className="cards-container">
        <div className="card">
          <h3 className="subtitle">Mestrado em Computação</h3>
          <ul className="card-links">
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                Documento de Conceito
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                Detalhes do Curso
              </a>
            </li>
          </ul>
        </div>

        <div className="card">
          <h3 className="subtitle">Doutorado em Computação</h3>
          <ul className="card-links">
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                Documento de Conceito
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                Detalhes do Curso
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ApresentacaoCursos;

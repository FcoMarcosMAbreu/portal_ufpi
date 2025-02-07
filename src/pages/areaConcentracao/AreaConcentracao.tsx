import { useState } from "react";
import "./AreaConcentracao.css";

interface LinhaPesquisa {
  titulo: string;
  descricao: string;
}

const linhasDePesquisa: LinhaPesquisa[] = [
  { titulo: "Inteligência Artificial", descricao: "Estudo avançado de redes neurais e aprendizado profundo." },
  { titulo: "Computação Quântica", descricao: "Pesquisas sobre a aplicação de qubits na computação." },
];

function AreaConcentracao() {
  const [detalhesVisiveis, setDetalhesVisiveis] = useState<{ [key: string]: boolean }>({});

  const toggleDetalhes = (titulo: string) => {
    setDetalhesVisiveis(prev => ({
      ...prev,
      [titulo]: !prev[titulo]
    }));
  };

  return (
    <div className="pos-graduacao">
      <h2 className="pos-title">Programas de Pós-Graduação</h2>
      <div className="cards-container">
        {[1, 2].map(index => (
          <div key={index} className="card">
            <h3 className="titulo">Doutorado</h3>
            <p className="subtitulo">Faculdade de Engenharia</p>
            <div className="linhas-pesquisa">
              <h4>Linhas de Pesquisa:</h4>
              <ul>
                {linhasDePesquisa.map((linha, idx) => (
                  <li key={idx}>
                    {linha.titulo} 
                    <button onClick={() => toggleDetalhes(linha.titulo)}>
                      {detalhesVisiveis[linha.titulo] ? "Ocultar" : "Detalhes"}
                    </button>
                    {detalhesVisiveis[linha.titulo] && <p className="descricao">{linha.descricao}</p>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AreaConcentracao;
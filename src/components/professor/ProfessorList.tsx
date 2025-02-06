import { useState } from "react"
import { PageContainer } from "../common/PageContainer"
import { ResourceGrid } from "../common/ResourceGrid"
import "./ProfessorList.css"
import { mockProfessores } from "../mock/mockData"

const ProfessorList = () => {
  const [professores, setProfessores] = useState(mockProfessores)

  return (
    <PageContainer title="Corpo Docente" description="Conheça os professores do programa de pós-graduação">
      <ResourceGrid>
        {professores.map((professor) => (
          <div key={professor.id} className="professor-card">
            <h3 className="professor-name">{professor.nome}</h3>
            <div className="professor-info">
              <p>
                <strong>Nível:</strong> {professor.nivel}
              </p>
              <p>
                <strong>Email:</strong> {professor.email}
              </p>
              <p>
                <strong>Telefone:</strong> {professor.telefone}
              </p>
            </div>
            <div className="professor-links">
              <a href={professor.curriculo_lattes} target="_blank" rel="noopener noreferrer" className="lattes-link">
                Currículo Lattes
              </a>
            </div>
          </div>
        ))}
      </ResourceGrid>
    </PageContainer>
  )
}

export default ProfessorList


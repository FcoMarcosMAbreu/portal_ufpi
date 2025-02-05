import type React from "react"
import { useState, useEffect } from "react"
import { alunoService } from "../../services/alunoService"
import type { AlunoResponseDto } from "../../types/aluno"
import { PageContainer } from "../common/PageContainer"
import { ResourceGrid } from "../common/ResourceGrid"
import "./AlunoList.css"

const AlunoList: React.FC = () => {
  const [alunos, setAlunos] = useState<AlunoResponseDto[]>([])

  useEffect(() => {
    fetchAlunos()
  }, [])

  const fetchAlunos = async () => {
    try {
      const data = await alunoService.getAll()
      setAlunos(data)
    } catch (error) {
      console.error("Erro ao buscar alunos:", error)
    }
  }

  return (
    <PageContainer title="Alunos Ativos" description="Lista de alunos atualmente matriculados no programa">
      <ResourceGrid>
        {alunos.map((aluno) => (
          // Novo card de aluno, semelhante ao card de professor
          <div key={aluno.id} className="aluno-card">
            <h3 className="aluno-name">{aluno.nome}</h3>
            <div className="aluno-info">
              <p>
                <strong>Matrícula:</strong> {aluno.matricula}
              </p>
              <p>
                <strong>Email:</strong> {aluno.email}
              </p>
              <p>
                <strong>Curso:</strong> {aluno.curso}
              </p>
            </div>
          </div>
        ))}
      </ResourceGrid>
    </PageContainer>
  )
}

export default AlunoList
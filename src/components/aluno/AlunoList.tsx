import type React from "react"
import { useState, useEffect } from "react"
import { alunoService } from "../../services/alunoService"
import type { AlunoResponseDto } from "../../types/aluno"
import { PageContainer } from "../common/PageContainer"
import { ResourceGrid } from "../common/ResourceGrid"
import "./AlunoList.css"
import { useTranslation } from "react-i18next"

const AlunoList: React.FC = () => {
  const [alunos, setAlunos] = useState<AlunoResponseDto[]>([])
  const [filteredAlunos, setFilteredAlunos] = useState<AlunoResponseDto[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const { t } = useTranslation()

  useEffect(() => {
    fetchAlunos()
  }, [])

  useEffect(() => {
    filterAlunos()
  }, [searchTerm, alunos])

  const fetchAlunos = async () => {
    try {
      const data = await alunoService.getAll()
      setAlunos(data)
    } catch (error) {
      console.error("Erro ao buscar alunos:", error)
    }
  }

  const filterAlunos = () => {
    const filtered = alunos.filter(
      (aluno) =>
        aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        aluno.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        aluno.matricula.toLowerCase().includes(searchTerm.toLowerCase()) ||
        aluno.curso.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredAlunos(filtered)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  return (
    <PageContainer title= {t("students.title")} description={t("students.description")}>
      <div className="filter-container">
        <input
          type="text"
          placeholder= {t("students.searchPlaceholder")}
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <ResourceGrid>
        {filteredAlunos.map((aluno) => (
          <div key={aluno.id} className="aluno-card">
            <h3 className="aluno-name">{aluno.nome}</h3>
            <div className="aluno-info">
              <p>
                <strong>{t("students.registration")}:</strong> {aluno.matricula}
              </p>
              <p>
                <strong>{t("students.email")}:</strong> {aluno.email}
              </p>
              <p>
                <strong>{t("students.course")}:</strong> {aluno.curso}
              </p>
            </div>
          </div>
        ))}
      </ResourceGrid>
    </PageContainer>
  )
}

export default AlunoList
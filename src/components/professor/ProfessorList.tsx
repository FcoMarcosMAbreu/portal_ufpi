"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { professorService } from "../../services/professorService"
import type { ProfessorResponseDto } from "../../types/professor"
import { PageContainer } from "../common/PageContainer"
import { ResourceGrid } from "../common/ResourceGrid"
import "./ProfessorList.css"
import { useTranslation } from "react-i18next"

const ProfessorList: React.FC = () => {
  const [professores, setProfessores] = useState<ProfessorResponseDto[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const { t } = useTranslation()

  useEffect(() => {
    fetchProfessores()
  }, [])

  const fetchProfessores = async () => {
    try {
      const data = await professorService.getAll()
      setProfessores(data)
    } catch (error) {
      console.error("Erro ao buscar professores:", error)
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredProfessores = professores.filter(
    (professor) =>
      professor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professor.nivel.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <PageContainer title= {t("professorList.title")} description={t("professorList.description")}>
      <div className="filter-container">
        <input
          type="text"
          placeholder={t("professorList.searchPlaceholder")}
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <ResourceGrid>
        {filteredProfessores.map((professor) => (
          <div key={professor.id} className="professor-card">
            <h3 className="professor-name">{professor.nome}</h3>
            <div className="professor-info">
              <p>
                <strong>{t("professorList.level")}:</strong> {professor.nivel}
              </p>
              <p>
                <strong>{t("professorList.email")}:</strong> {professor.email}
              </p>
              <p>
                <strong>{t("professorList.phone")}:</strong> {professor.telefone}
              </p>
            </div>
            <div className="professor-links">
              <a href={professor.curriculo_lattes} target="_blank" rel="noopener noreferrer" className="lattes-link">
              {t("professorList.lattes")}
              </a>
            </div>
          </div>
        ))}
      </ResourceGrid>
    </PageContainer>
  )
}

export default ProfessorList


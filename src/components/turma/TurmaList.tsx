"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { turmaService } from "../../services/turmaService"
import type { TurmaDto } from "../../types/turma"
import TurmaViewModal from "./TurmaViewModal"
import { PageContainer } from "../common/PageContainer"
import { ResourceGrid } from "../common/ResourceGrid"
import "./TurmaList.css"
import { useTranslation } from "react-i18next"

const TurmaList: React.FC = () => {
  const [turmas, setTurmas] = useState<TurmaDto[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTurma, setSelectedTurma] = useState<TurmaDto | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    fetchTurmas()
  }, [])

  const fetchTurmas = async () => {
    try {
      const data = await turmaService.getAll()
      setTurmas(data)
    } catch (error) {
      console.error("Erro ao buscar turmas:", error)
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredTurmas = turmas.filter(
    (turma) =>
      turma.materia.toLowerCase().includes(searchTerm.toLowerCase()) ||
      turma.nome_turma.toLowerCase().includes(searchTerm.toLowerCase()) ||
      turma.docentes.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const openViewModal = (turma: TurmaDto) => {
    setSelectedTurma(turma)
    setIsViewModalOpen(true)
  }

  const closeViewModal = () => {
    setSelectedTurma(null)
    setIsViewModalOpen(false)
  }

  return (
    <PageContainer title= {t("classes.title")} description={t("classes.description")}>
      <div className="filter-container">
        <input
          type="text"
          placeholder= {t("classes.searchPlaceholder")}
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <ResourceGrid>
        {filteredTurmas.map((turma) => (
          <div key={turma.id} className="turma-card">
            <h3>{turma.nome_turma}</h3>
            <p>
              <strong>{t("classes.subject")}:</strong> {turma.materia}
            </p>
            <p>
              <strong>{t("classes.schedules")}:</strong> {turma.horarios}
            </p>
            <button onClick={() => openViewModal(turma)} className="btn-view">
            {t("classes.see")}
            </button>
          </div>
        ))}
      </ResourceGrid>

      {isViewModalOpen && selectedTurma && (
        <TurmaViewModal isOpen={isViewModalOpen} onClose={closeViewModal} turma={selectedTurma} />
      )}
    </PageContainer>
  )
}

export default TurmaList


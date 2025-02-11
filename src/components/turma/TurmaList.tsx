"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { turmaService } from "../../services/turmaService"
import type { TurmaDto } from "../../types/turma"
import TurmaViewModal from "./TurmaViewModal"
import { PageContainer } from "../common/PageContainer"
import { ResourceGrid } from "../common/ResourceGrid"
import "./TurmaList.css"

const TurmaList: React.FC = () => {
  const [turmas, setTurmas] = useState<TurmaDto[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTurma, setSelectedTurma] = useState<TurmaDto | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

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
    <PageContainer title="Turmas" description="Lista de turmas disponíveis">
      <div className="filter-container">
        <input
          type="text"
          placeholder="Pesquisar turmas..."
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
              <strong>Matéria:</strong> {turma.materia}
            </p>
            <p>
              <strong>Horários:</strong> {turma.horarios}
            </p>
            <button onClick={() => openViewModal(turma)} className="btn-view">
              Visualizar
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


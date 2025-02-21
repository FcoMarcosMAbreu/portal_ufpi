"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { calendarioService } from "../../services/calendarioService"
import type { CalendarioDto } from "../../types/calendario"
import CalendarioViewModal from "./CalendarioViewModal"
import { PageContainer } from "../common/PageContainer"
import { ResourceGrid } from "../common/ResourceGrid"
import "./CalendarioList.css"
import { useTranslation } from "react-i18next"

const CalendarioList: React.FC = () => {
  const [calendarios, setCalendarios] = useState<CalendarioDto[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCalendario, setSelectedCalendario] = useState<CalendarioDto | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    fetchCalendarios()
  }, [])

  const fetchCalendarios = async () => {
    try {
      const data = await calendarioService.getAll()
      setCalendarios(data)
    } catch (error) {
      console.error("Erro ao buscar eventos do calendário:", error)
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredCalendarios = calendarios.filter(
    (calendario) =>
      calendario.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      calendario.descricao.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const openViewModal = (calendario: CalendarioDto) => {
    setSelectedCalendario(calendario)
    setIsViewModalOpen(true)
  }

  const closeViewModal = () => {
    setSelectedCalendario(null)
    setIsViewModalOpen(false)
  }

  return (
    <PageContainer title= {t("calendar.title")} description= {t("calendar.description")} >
      <div className="filter-container">
        <input
          type="text"
          placeholder= {t("calendar.placeholder")}
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <ResourceGrid>
        {filteredCalendarios.map((calendario) => (
          <div key={calendario.id} className="calendario-card">
            <h3>{calendario.titulo}</h3>
            <p>
              <strong>{t("calendar.initialDate")}:</strong> {new Date(calendario.data_inicio).toLocaleDateString()}
            </p>
            <p>
              <strong>{t("calendar.finalDate")}:</strong> {new Date(calendario.data_termino).toLocaleDateString()}
            </p>
            <button onClick={() => openViewModal(calendario)} className="btn-view">
            {t("calendar.see")}
            </button>
          </div>
        ))}
      </ResourceGrid>

      {isViewModalOpen && selectedCalendario && (
        <CalendarioViewModal isOpen={isViewModalOpen} onClose={closeViewModal} calendario={selectedCalendario} />
      )}
    </PageContainer>
  )
}

export default CalendarioList


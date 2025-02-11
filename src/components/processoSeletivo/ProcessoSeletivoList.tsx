"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { processoSeletivoService } from "../../services/processoSeletivoService"
import type { ProcessoSeletivoDto } from "../../types/processoSeletivo"
import ProcessoSeletivoViewModal from "./ProcessoSeletivoViewModal"
import { PageContainer } from "../common/PageContainer"
import { ResourceGrid } from "../common/ResourceGrid"
import "./ProcessoSeletivoList.css"

const ProcessoSeletivoList: React.FC = () => {
  const [processosSeletivos, setProcessosSeletivos] = useState<ProcessoSeletivoDto[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProcessoSeletivo, setSelectedProcessoSeletivo] = useState<ProcessoSeletivoDto | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  useEffect(() => {
    fetchProcessosSeletivos()
  }, [])

  const fetchProcessosSeletivos = async () => {
    try {
      const data = await processoSeletivoService.getAll()
      setProcessosSeletivos(data)
    } catch (error) {
      console.error("Erro ao buscar processos seletivos:", error)
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredProcessosSeletivos = processosSeletivos.filter(
    (processoSeletivo) =>
      processoSeletivo.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      processoSeletivo.descricao.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const openViewModal = (processoSeletivo: ProcessoSeletivoDto) => {
    setSelectedProcessoSeletivo(processoSeletivo)
    setIsViewModalOpen(true)
  }

  const closeViewModal = () => {
    setSelectedProcessoSeletivo(null)
    setIsViewModalOpen(false)
  }

  return (
    <PageContainer title="Processos Seletivos" description="Lista de processos seletivos em andamento">
      <div className="filter-container">
        <input
          type="text"
          placeholder="Pesquisar processos seletivos..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <ResourceGrid>
        {filteredProcessosSeletivos.map((processoSeletivo) => (
          <div key={processoSeletivo.id} className="processo-seletivo-card">
            <h3>{processoSeletivo.titulo}</h3>
            <p>{processoSeletivo.descricao.substring(0, 100)}...</p>
            <button onClick={() => openViewModal(processoSeletivo)} className="btn-view">
              Visualizar
            </button>
          </div>
        ))}
      </ResourceGrid>

      {isViewModalOpen && selectedProcessoSeletivo && (
        <ProcessoSeletivoViewModal
          isOpen={isViewModalOpen}
          onClose={closeViewModal}
          processoSeletivo={selectedProcessoSeletivo}
        />
      )}
    </PageContainer>
  )
}

export default ProcessoSeletivoList


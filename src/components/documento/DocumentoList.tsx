"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { documentoService } from "../../services/documentoService"
import type { DocumentoResponseDto } from "../../types/documento"
import type { TagDocumento } from "../../types/documento"
import DocumentoViewModal from "./DocumentoViewModal"
import { PageContainer } from "../common/PageContainer"
import { ResourceGrid } from "../common/ResourceGrid"
import "./DocumentoList.css"

interface DocumentoListProps {
  tag: TagDocumento
  title: string
}

const DocumentoList: React.FC<DocumentoListProps> = ({ tag, title }) => {
  const [documentos, setDocumentos] = useState<DocumentoResponseDto[]>([])
  const [filteredDocumentos, setFilteredDocumentos] = useState<DocumentoResponseDto[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDocumento, setSelectedDocumento] = useState<DocumentoResponseDto | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  useEffect(() => {
    fetchDocumentos()
  }, [])

  useEffect(() => {
    filterDocumentos()
  }, [searchTerm, tag]) //Corrected dependency array

  const fetchDocumentos = async () => {
    try {
      const allDocumentos = await documentoService.getAll()
      setDocumentos(allDocumentos)
    } catch (error) {
      console.error("Erro ao buscar documentos:", error)
    }
  }

  const filterDocumentos = () => {
    const filtered = documentos.filter(
      (doc) =>
        doc.tag === tag &&
        (doc.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.tipo.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    setFilteredDocumentos(filtered)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const openViewModal = (documento: DocumentoResponseDto) => {
    setSelectedDocumento(documento)
    setIsViewModalOpen(true)
  }

  const closeViewModal = () => {
    setSelectedDocumento(null)
    setIsViewModalOpen(false)
  }

  return (
    <PageContainer title={title} description={`Lista de documentos - ${title}`}>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Pesquisar documentos..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <ResourceGrid>
        {filteredDocumentos.map((documento) => (
          <div key={documento.id} className="documento-card">
            <h3>{documento.nome}</h3>
            <p>
              <strong>Tipo:</strong> {documento.tipo}
            </p>
            <p>
              <strong>Data de Criação:</strong> {new Date(documento.data_criacao).toLocaleDateString()}
            </p>
            <button onClick={() => openViewModal(documento)} className="btn-view">
              Visualizar
            </button>
          </div>
        ))}
      </ResourceGrid>

      {isViewModalOpen && selectedDocumento && (
        <DocumentoViewModal isOpen={isViewModalOpen} onClose={closeViewModal} documento={selectedDocumento} />
      )}
    </PageContainer>
  )
}

export default DocumentoList


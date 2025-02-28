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
import { useTranslation } from "react-i18next"

interface DocumentoListProps {
  tag: TagDocumento
  title: string
}

const DocumentoList: React.FC<DocumentoListProps> = ({ tag }) => {
  const [documentos, setDocumentos] = useState<DocumentoResponseDto[]>([])
  const [filteredDocumentos, setFilteredDocumentos] = useState<DocumentoResponseDto[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDocumento, setSelectedDocumento] = useState<DocumentoResponseDto | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const { t } = useTranslation()

  // Fetch documents on component mount
  useEffect(() => {
    fetchDocumentos()
  }, [])

  // Filter documents whenever documents array, search term or tag changes
  useEffect(() => {
    filterDocumentos()
  }, [documentos, searchTerm, tag])

  const fetchDocumentos = async () => {
    try {
      const allDocumentos = await documentoService.getAll()
      setDocumentos(allDocumentos)
    } catch (error) {
      console.error(t("errors.fetchDocuments"), error)
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
    <PageContainer title={t(`documentList.tags.${tag}`)} description={t("documentList.description", { title: t(`documentList.tags.${tag}`) })}>
      <div className="filter-container">
        <input
          type="text"
          placeholder={t("documentList.searchPlaceholder")}
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
              <strong>{t("documentList.type")}:</strong> {t(`documentTypes.${documento.tipo}`)}
            </p>
            <p>
              <strong>{t("documentList.creationDate")}:</strong>{" "}
              {new Date(documento.data_criacao).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <button onClick={() => openViewModal(documento)} className="btn-view">
              {t("documentList.view")}
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


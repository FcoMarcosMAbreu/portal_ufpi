"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { noticiaService } from "../../services/noticiaService"
import type { NoticiaDto } from "../../types/noticia"
import NoticiaViewModal from "./NoticiaViewModal"
import { PageContainer } from "../common/PageContainer"
import { ResourceGrid } from "../common/ResourceGrid"
import "./NoticiaList.css"

const NoticiaList: React.FC = () => {
  const [noticias, setNoticias] = useState<NoticiaDto[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedNoticia, setSelectedNoticia] = useState<NoticiaDto | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  useEffect(() => {
    fetchNoticias()
  }, [])

  const fetchNoticias = async () => {
    try {
      const data = await noticiaService.getAll()
      setNoticias(data)
    } catch (error) {
      console.error("Erro ao buscar notícias:", error)
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredNoticias = noticias.filter(
    (noticia) =>
      noticia.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      noticia.tag.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const openViewModal = (noticia: NoticiaDto) => {
    setSelectedNoticia(noticia)
    setIsViewModalOpen(true)
  }

  const closeViewModal = () => {
    setSelectedNoticia(null)
    setIsViewModalOpen(false)
  }

  return (
    <PageContainer title="Notícias" description="Últimas notícias e informações">
      <div className="filter-container">
        <input
          type="text"
          placeholder="Pesquisar notícias..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <ResourceGrid>
        {filteredNoticias.map((noticia) => (
          <div key={noticia.id} className="noticia-card">
            <h3>{noticia.titulo}</h3>
            <p>
              <strong>Tag:</strong> {noticia.tag}
            </p>
            <p>
              <strong>Data de Criação:</strong> {new Date(noticia.data_criacao).toLocaleDateString()}
            </p>
            <button onClick={() => openViewModal(noticia)} className="btn-view">
              Visualizar
            </button>
          </div>
        ))}
      </ResourceGrid>

      {isViewModalOpen && selectedNoticia && (
        <NoticiaViewModal isOpen={isViewModalOpen} onClose={closeViewModal} noticia={selectedNoticia} />
      )}
    </PageContainer>
  )
}

export default NoticiaList


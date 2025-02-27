import type React from "react"
import type { NoticiaDto } from "../../types/noticia"
import "./NoticiaViewModal.css"
import { Download } from "lucide-react"

const API_BASE_URL = "http://localhost:3000"

interface NoticiaViewModalProps {
  isOpen: boolean
  onClose: () => void
  noticia: NoticiaDto
}

const NoticiaViewModal: React.FC<NoticiaViewModalProps> = ({ isOpen, onClose, noticia }) => {
  if (!isOpen) return null

  const showDownloadButton = noticia.arquivo && noticia.arquivo !== "Sem arquivo"

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Detalhes da Notícia</h2>
        <div className="noticia-details">
          <p>
            <strong>Título:</strong> {noticia.titulo}
          </p>
          <p>
            <strong>Tag:</strong> {noticia.tag}
          </p>
          <p>
            <strong>Conteúdo:</strong> {noticia.conteudo}
          </p>
          <p>
            <strong>Links de Referência:</strong> {noticia.links_referencia}
          </p>
          <p>
            <strong>Data de Criação:</strong> {new Date(noticia.data_criacao).toLocaleString()}
          </p>
          {showDownloadButton && (
            <div className="download-container">
              <a
                href={`${API_BASE_URL}/noticias/${noticia.id}/download`}
                download
                className="download-btn"
                title="Baixar arquivo"
              >
                <Download size={18} />
                Baixar Arquivo
              </a>
            </div>
          )}
        </div>
        <div className="modal-buttons">
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  )
}

export default NoticiaViewModal


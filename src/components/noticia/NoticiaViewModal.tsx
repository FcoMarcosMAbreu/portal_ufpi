import type React from "react"
import type { NoticiaDto } from "../../types/noticia"
import "./NoticiaViewModal.css"

interface NoticiaViewModalProps {
  isOpen: boolean
  onClose: () => void
  noticia: NoticiaDto
}

const NoticiaViewModal: React.FC<NoticiaViewModalProps> = ({ isOpen, onClose, noticia }) => {
  if (!isOpen) return null

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
            <strong>Data de Criação:</strong> {new Date(noticia.data_criacao).toLocaleDateString()}
          </p>
          {noticia.documento_anexo && (
            <p>
              <strong>Documento Anexo:</strong>{" "}
              <a href={noticia.documento_anexo} target="_blank" rel="noopener noreferrer">
                Visualizar Documento
              </a>
            </p>
          )}
          {noticia.id && (
            <p>
              <strong>Arquivo:</strong>{" "}
              <a href={`/noticias/${noticia.id}/download`} download>
                Download do Arquivo
              </a>
            </p>
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


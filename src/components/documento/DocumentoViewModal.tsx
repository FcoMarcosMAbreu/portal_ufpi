import type React from "react"
import type { DocumentoResponseDto } from "../../types/documento"
import "./DocumentoViewModal.css"

interface DocumentoViewModalProps {
  isOpen: boolean
  onClose: () => void
  documento: DocumentoResponseDto
}

const DocumentoViewModal: React.FC<DocumentoViewModalProps> = ({ isOpen, onClose, documento }) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Detalhes do Documento</h2>
        <div className="documento-details">
          <p>
            <strong>Nome:</strong> {documento.nome}
          </p>
          <p>
            <strong>Tipo:</strong> {documento.tipo}
          </p>
          <p>
            <strong>Tag:</strong> {documento.tag}
          </p>
          <p>
            <strong>Data de Criação:</strong> {new Date(documento.data_criacao).toLocaleDateString()}
          </p>
          <p>
            <strong>Download:</strong>{" "}
            <a href={`/documentos/${documento.id}/download`} download>
              Baixar Arquivo
            </a>
          </p>
        </div>
        <div className="modal-buttons">
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  )
}

export default DocumentoViewModal


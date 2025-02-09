import type React from "react"
import type { CursoResponseDto } from "../../types/curso"
import "./CursoViewModal.css"

interface CursoViewModalProps {
  isOpen: boolean
  onClose: () => void
  curso: CursoResponseDto
}

const CursoViewModal: React.FC<CursoViewModalProps> = ({ isOpen, onClose, curso }) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Detalhes do Curso</h2>
        <div className="curso-details">
          <p>
            <strong>Nome:</strong> {curso.nome}
          </p>
          <p>
            <strong>Link Documento CAPES:</strong>{" "}
            <a href={curso.link_documento_capes} target="_blank" rel="noopener noreferrer">
              {curso.link_documento_capes}
            </a>
          </p>
          <p>
            <strong>Link Detalhes do Curso:</strong>{" "}
            <a href={curso.link_detalhes_curso} target="_blank" rel="noopener noreferrer">
              {curso.link_detalhes_curso}
            </a>
          </p>
          <p>
            <strong>Data de Criação:</strong> {new Date(curso.data_criacao).toLocaleDateString()}
          </p>
        </div>
        <div className="modal-buttons">
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  )
}

export default CursoViewModal


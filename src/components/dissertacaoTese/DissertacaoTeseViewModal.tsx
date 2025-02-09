import type React from "react"
import type { DissertacaoTeseDto } from "../../types/dissertacaoTese"
import "./DissertacaoTeseViewModal.css"

interface DissertacaoTeseViewModalProps {
  isOpen: boolean
  onClose: () => void
  dissertacaoTese: DissertacaoTeseDto
}

const DissertacaoTeseViewModal: React.FC<DissertacaoTeseViewModalProps> = ({ isOpen, onClose, dissertacaoTese }) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Detalhes da Dissertação/Tese</h2>
        <div className="dissertacao-tese-details">
          <p>
            <strong>Nome do Autor:</strong> {dissertacaoTese.nome_autor}
          </p>
          <p>
            <strong>Título:</strong> {dissertacaoTese.titulo}
          </p>
          <p>
            <strong>Orientador:</strong> {dissertacaoTese.orientador}
          </p>
          <p>
            <strong>Data:</strong> {new Date(dissertacaoTese.data).toLocaleDateString()}
          </p>
          <p>
            <strong>Resumo:</strong> {dissertacaoTese.resumo}
          </p>
        </div>
        <div className="modal-buttons">
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  )
}

export default DissertacaoTeseViewModal
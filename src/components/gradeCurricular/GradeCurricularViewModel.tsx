import type React from "react"
import type { GradeCurricularDto } from "../../types/gradeCurricular"
import "./GradeCurricularViewModal.css"

interface GradeCurricularViewModalProps {
  isOpen: boolean
  onClose: () => void
  gradeCurricular: GradeCurricularDto
}

const GradeCurricularViewModal: React.FC<GradeCurricularViewModalProps> = ({ isOpen, onClose, gradeCurricular }) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Detalhes da Grade Curricular</h2>
        <div className="grade-curricular-details">
          <p>
            <strong>Título:</strong> {gradeCurricular.titulo}
          </p>
          <p>
            <strong>Código:</strong> {gradeCurricular.codigo}
          </p>
          <p>
            <strong>Componente Curricular:</strong> {gradeCurricular.componente_curricular}
          </p>
          <p>
            <strong>Carga Horária:</strong> {gradeCurricular.carga_horaria}
          </p>
          <p>
            <strong>Data de Criação:</strong> {new Date(gradeCurricular.data_criacao).toLocaleDateString()}
          </p>
        </div>
        <div className="modal-buttons">
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  )
}

export default GradeCurricularViewModal
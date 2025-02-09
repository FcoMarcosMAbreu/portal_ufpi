import type React from "react"
import type { CalendarioDto } from "../../types/calendario"
import "./CalendarioViewModal.css"

interface CalendarioViewModalProps {
  isOpen: boolean
  onClose: () => void
  calendario: CalendarioDto
}

const CalendarioViewModal: React.FC<CalendarioViewModalProps> = ({ isOpen, onClose, calendario }) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Detalhes do Evento do Calendário</h2>
        <div className="calendario-details">
          <p>
            <strong>Título:</strong> {calendario.titulo}
          </p>
          <p>
            <strong>Descrição:</strong> {calendario.descricao}
          </p>
          <p>
            <strong>Data de Início:</strong> {new Date(calendario.data_inicio).toLocaleDateString()}
          </p>
          <p>
            <strong>Data de Término:</strong> {new Date(calendario.data_termino).toLocaleDateString()}
          </p>
          <p>
            <strong>Data de Criação:</strong> {new Date(calendario.data_criacao).toLocaleDateString()}
          </p>
        </div>
        <div className="modal-buttons">
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  )
}

export default CalendarioViewModal
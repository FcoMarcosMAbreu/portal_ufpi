import type React from "react"
import type { TurmaDto } from "../../types/turma"
//import "./TurmaViewModal.css"

interface TurmaViewModalProps {
  isOpen: boolean
  onClose: () => void
  turma: TurmaDto
}

const TurmaViewModal: React.FC<TurmaViewModalProps> = ({ isOpen, onClose, turma }) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Detalhes da Turma</h2>
        <div className="turma-details">
          <p>
            <strong>Matéria:</strong> {turma.materia}
          </p>
          <p>
            <strong>Nome da Turma:</strong> {turma.nome_turma}
          </p>
          <p>
            <strong>Horários:</strong> {turma.horarios}
          </p>
          <p>
            <strong>Período/Ano:</strong> {turma.periodo_ano}
          </p>
          <p>
            <strong>Docentes:</strong> {turma.docentes}
          </p>
          <p>
            <strong>Data de Criação:</strong> {new Date(turma.data_criacao).toLocaleDateString()}
          </p>
        </div>
        <div className="modal-buttons">
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  )
}

export default TurmaViewModal
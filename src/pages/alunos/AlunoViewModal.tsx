import type React from "react"
import type { AlunoResponseDto } from "../../types/aluno"
import "./AlunoViewModal.css"

interface AlunoViewModalProps {
  isOpen: boolean
  onClose: () => void
  aluno: AlunoResponseDto
}

const AlunoViewModal: React.FC<AlunoViewModalProps> = ({ isOpen, onClose, aluno }) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Detalhes do Aluno</h2>
        <div className="aluno-details">
          <p>
            <strong>Nome:</strong> {aluno.nome}
          </p>
          <p>
            <strong>Email:</strong> {aluno.email}
          </p>
          <p>
            <strong>Matrícula:</strong> {aluno.matricula}
          </p>
          <p>
            <strong>Curso:</strong> {aluno.curso}
          </p>
        </div>
        <div className="modal-buttons">
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  )
}

export default AlunoViewModal
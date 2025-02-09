import type React from "react"
import type { ProfessorResponseDto } from "../../types/professor"
import "./ProfessorViewModal.css"

interface ProfessorViewModalProps {
  isOpen: boolean
  onClose: () => void
  professor: ProfessorResponseDto
}

const ProfessorViewModal: React.FC<ProfessorViewModalProps> = ({ isOpen, onClose, professor }) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Detalhes do Professor</h2>
        <div className="professor-details">
          <p>
            <strong>Nome:</strong> {professor.nome}
          </p>
          <p>
            <strong>Matrícula:</strong> {professor.matricula}
          </p>
          <p>
            <strong>Email:</strong> {professor.email}
          </p>
          <p>
            <strong>Nível:</strong> {professor.nivel}
          </p>
          <p>
            <strong>Telefone:</strong> {professor.telefone}
          </p>
          <p>
            <strong>Currículo Lattes:</strong>{" "}
            <a href={professor.curriculo_lattes} target="_blank" rel="noopener noreferrer">
              {professor.curriculo_lattes}
            </a>
          </p>
          <p>
            <strong>Vínculo:</strong> {professor.vinculo}
          </p>
          <p>
            <strong>Data de Criação:</strong> {new Date(professor.data_criacao).toLocaleDateString()}
          </p>
        </div>
        <div className="modal-buttons">
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  )
}

export default ProfessorViewModal
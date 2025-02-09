import type React from "react"
import type { ProcessoSeletivoDto } from "../../types/processoSeletivo"
import "./ProcessoSeletivoViewModal.css"

interface ProcessoSeletivoViewModalProps {
  isOpen: boolean
  onClose: () => void
  processoSeletivo: ProcessoSeletivoDto
}

const ProcessoSeletivoViewModal: React.FC<ProcessoSeletivoViewModalProps> = ({ isOpen, onClose, processoSeletivo }) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Detalhes do Processo Seletivo</h2>
        <div className="processo-seletivo-details">
          <p>
            <strong>Título:</strong> {processoSeletivo.titulo}
          </p>
          <p>
            <strong>Descrição:</strong> {processoSeletivo.descricao}
          </p>
          <p>
            <strong>Link de Inscrição:</strong>{" "}
            <a href={processoSeletivo.link_inscricao} target="_blank" rel="noopener noreferrer">
              {processoSeletivo.link_inscricao}
            </a>
          </p>
          <p>
            <strong>Data de Criação:</strong> {new Date(processoSeletivo.data_criacao).toLocaleDateString()}
          </p>
        </div>
        <div className="modal-buttons">
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  )
}

export default ProcessoSeletivoViewModal
import type React from "react"
import type { ProcessoSeletivoDto } from "../../types/processoSeletivo"
import "./ProcessoSeletivoViewModal.css"
import { useTranslation } from "react-i18next"

interface ProcessoSeletivoViewModalProps {
  isOpen: boolean
  onClose: () => void
  processoSeletivo: ProcessoSeletivoDto
}

const ProcessoSeletivoViewModal: React.FC<ProcessoSeletivoViewModalProps> = ({ isOpen, onClose, processoSeletivo }) => {
  const { t } = useTranslation()
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{t("selectionProcesses.details")}</h2>
        <div className="processo-seletivo-details">
          <p>
            <strong>{t("selectionProcesses.detailsTitle")}:</strong> {processoSeletivo.titulo}
          </p>
          <p>
            <strong>{t("selectionProcesses.detailsDescription")}:</strong> {processoSeletivo.descricao}
          </p>
          <p>
            <strong>{t("selectionProcesses.detailsLink")}:</strong>{" "}
            <a href={processoSeletivo.link_inscricao} target="_blank" rel="noopener noreferrer">
              {processoSeletivo.link_inscricao}
            </a>
          </p>
          <p>
            <strong>{t("selectionProcesses.creationDate")}:</strong> {new Date(processoSeletivo.data_criacao).toLocaleDateString()}
          </p>
        </div>
        <div className="modal-buttons">
          <button onClick={onClose}>{t("selectionProcesses.close")}</button>
        </div>
      </div>
    </div>
  )
}

export default ProcessoSeletivoViewModal
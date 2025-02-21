import type React from "react"
import type { CalendarioDto } from "../../types/calendario"
import "./CalendarioViewModal.css"
import { useTranslation } from "react-i18next"

interface CalendarioViewModalProps {
  isOpen: boolean
  onClose: () => void
  calendario: CalendarioDto
}

const CalendarioViewModal: React.FC<CalendarioViewModalProps> = ({ isOpen, onClose, calendario }) => {
  const { t } = useTranslation() 
  
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{t("calendar.details")}</h2>
        <div className="calendario-details">
          <p>
            <strong>{t("calendar.detailTitle")}:</strong> {calendario.titulo}
          </p>
          <p>
            <strong>{t("calendar.detailDescription")}:</strong> {calendario.descricao}
          </p>
          <p>
            <strong>{t("calendar.initialDate")}:</strong> {new Date(calendario.data_inicio).toLocaleDateString()}
          </p>
          <p>
            <strong>{t("calendar.finalDate")}:</strong> {new Date(calendario.data_termino).toLocaleDateString()}
          </p>
          <p>
            <strong>{t("calendar.creationDate")}:</strong> {new Date(calendario.data_criacao).toLocaleDateString()}
          </p>
        </div>
        <div className="modal-buttons">
          <button onClick={onClose}>{t("calendar.close")}</button>
        </div>
      </div>
    </div>
  )
}

export default CalendarioViewModal
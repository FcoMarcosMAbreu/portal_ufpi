import type React from "react"
import type { TurmaDto } from "../../types/turma"
//import "./TurmaViewModal.css"
import { useTranslation } from "react-i18next"

interface TurmaViewModalProps {
  isOpen: boolean
  onClose: () => void
  turma: TurmaDto
}

const TurmaViewModal: React.FC<TurmaViewModalProps> = ({ isOpen, onClose, turma }) => {
  const { t } = useTranslation()
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{t("classes.details")}</h2>
        <div className="turma-details">
          <p>
            <strong>{t("classes.subject")}:</strong> {turma.materia}
          </p>
          <p>
            <strong>{t("classes.name")}:</strong> {turma.nome_turma}
          </p>
          <p>
            <strong>{t("classes.schedules")}:</strong> {turma.horarios}
          </p>
          <p>
            <strong>{t("classes.period")}:</strong> {turma.periodo_ano}
          </p>
          <p>
            <strong>{t("classes.teachers")}:</strong> {turma.docentes}
          </p>
          <p>
            <strong>{t("classes.dateCreate")}:</strong> {new Date(turma.data_criacao).toLocaleDateString()}
          </p>
        </div>
        <div className="modal-buttons">
          <button onClick={onClose}>{t("classes.close")}</button>
        </div>
      </div>
    </div>
  )
}

export default TurmaViewModal
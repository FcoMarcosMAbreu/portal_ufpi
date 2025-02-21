import type React from "react"
import type { DocumentoResponseDto } from "../../types/documento"
import "./DocumentoViewModal.css"
import { useTranslation } from "react-i18next"

interface DocumentoViewModalProps {
  isOpen: boolean
  onClose: () => void
  documento: DocumentoResponseDto
}

const API_BASE_URL = "http://localhost:3000"

const DocumentoViewModal: React.FC<DocumentoViewModalProps> = ({ isOpen, onClose, documento }) => {
  const { t } = useTranslation()
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{t("documentList.details")}</h2>
        <div className="documento-details">
          <p>
            <strong>{t("documentList.name")}:</strong> {documento.nome}
          </p>
          <p>
            <strong>{t("documentList.type")}:</strong> {documento.tipo}
          </p>
          <p>
            <strong>{t("documentList.tag")}:</strong> {documento.tag}
          </p>
          <p>
            <strong>{t("documentList.createDate")}:</strong> {new Date(documento.data_criacao).toLocaleDateString()}
          </p>
          <p>
            <strong>{t("documentList.download")}:</strong>{" "}
            <a href={`${API_BASE_URL}/documentos/${documento.id}/download`} download>
            {t("documentList.downloadFile")}
            </a>
          </p>
        </div>
        <div className="modal-buttons">
          <button onClick={onClose}>{t("documentList.close")}</button>
        </div>
      </div>
    </div>
  )
}

export default DocumentoViewModal


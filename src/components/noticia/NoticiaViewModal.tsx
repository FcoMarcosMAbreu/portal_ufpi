import type React from "react"
import type { NoticiaDto } from "../../types/noticia"
import "./NoticiaViewModal.css"
import { Download } from "lucide-react"
import { useTranslation } from "react-i18next"

const API_BASE_URL = "http://localhost:3000"

interface NoticiaViewModalProps {
  isOpen: boolean
  onClose: () => void
  noticia: NoticiaDto
}

const NoticiaViewModal: React.FC<NoticiaViewModalProps> = ({ isOpen, onClose, noticia }) => {
  const { t } = useTranslation()

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{t("news.details")}</h2>
        <div className="noticia-details">
          <p>
            <strong>{t("news.detailsTitle")}:</strong> {noticia.titulo}
          </p>
          <p>
            <strong>{t("news.tag")}:</strong> {noticia.tag}
          </p>
          <p>
            <strong>{t("news.detailsContent")}:</strong> {noticia.conteudo}
          </p>
          <p>
            <strong>{t("news.detailsLink")}:</strong> {noticia.links_referencia}
          </p>
          <p>
            <strong>{t("news.createDate")}:</strong> {new Date(noticia.data_criacao).toLocaleDateString()}
          </p>
          {noticia.documento_anexo && (
            <p>
              <strong>{t("news.attach")}:</strong>{" "}
              <a href={noticia.documento_anexo} target="_blank" rel="noopener noreferrer">
              {t("news.seeDoc")}
              </a>
            </p>
          )}
          {noticia.id && (
            <div className="download-container">
              <a
                href={`${API_BASE_URL}/noticias/${noticia.id}/download`}
                download
                className="download-btn"
                title="Baixar arquivo"
              >
                <Download size={18} />
                {t("news.dowload")}
              </a>
            </div>
          )}
        </div>
        <div className="modal-buttons">
          <button onClick={onClose}>{t("news.close")}</button>
        </div>
      </div>
    </div>
  )
}

export default NoticiaViewModal


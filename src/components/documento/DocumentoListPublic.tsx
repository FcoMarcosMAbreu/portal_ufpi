import { useState, useEffect } from "react"
import { documentoService } from "../../services/documentoService"
import type { DocumentoResponseDto } from "../../types/documento"
import type { TagDocumento } from "../../types/documento"
import "./DocumentoListPublic.css"

interface DocumentoListPublicProps {
  tag: TagDocumento
  title: string
}

const DocumentoListPublic: React.FC<DocumentoListPublicProps> = ({ tag, title }) => {
  const [documentos, setDocumentos] = useState<DocumentoResponseDto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDocumentos()
  }, []) // Removed unnecessary dependency: tag

  const fetchDocumentos = async () => {
    try {
      const allDocumentos = await documentoService.getAll()
      const filteredDocumentos = allDocumentos.filter((doc) => doc.tag === tag)
      setDocumentos(filteredDocumentos)
    } catch (error) {
      console.error("Erro ao buscar documentos:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-BR")
  }

  if (loading) {
    return (
      <div className="documento-list-public">
        <div className="loading">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="documento-list-public">
      <h2>{title}</h2>
      {documentos.length === 0 ? (
        <p className="no-documents">Nenhum documento encontrado nesta categoria.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Data de Publicação</th>
              <th>Arquivo</th>
            </tr>
          </thead>
          <tbody>
            {documentos.map((documento) => (
              <tr key={documento.id}>
                <td>{documento.nome}</td>
                <td>{formatDate(documento.data_criacao)}</td>
                <td>
                  <a href={`/api/documentos/${documento.id}/download`} className="download-link">
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default DocumentoListPublic
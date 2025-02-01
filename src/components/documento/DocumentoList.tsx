import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { documentoService } from "../../services/documentoService"
import type { DocumentoResponseDto } from "../../types/documento"
import "./DocumentoList.css"

const DocumentoList: React.FC = () => {
  const [documentos, setDocumentos] = useState<DocumentoResponseDto[]>([])

  useEffect(() => {
    fetchDocumentos()
  }, [])

  const fetchDocumentos = async () => {
    try {
      const data = await documentoService.getAll()
      setDocumentos(data)
    } catch (error) {
      console.error("Erro ao buscar documentos:", error)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este documento?")) {
      try {
        await documentoService.delete(id)
        fetchDocumentos()
      } catch (error) {
        console.error("Erro ao excluir documento:", error)
      }
    }
  }

  return (
    <div className="documento-list">
      <h2>Lista de Documentos</h2>
      <Link to="/documento/create" className="btn-create">
        Criar Novo Documento
      </Link>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Data de Criação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {documentos.map((documento) => (
            <tr key={documento.id}>
              <td>{documento.nome}</td>
              <td>{documento.tipo}</td>
              <td>{new Date(documento.data_criacao).toLocaleDateString()}</td>
              <td>
                <Link to={`/documento/edit/${documento.id}`} className="btn-edit">
                  Editar
                </Link>
                <button onClick={() => handleDelete(documento.id)} className="btn-delete">
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DocumentoList
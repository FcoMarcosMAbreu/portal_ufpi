"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import type { DocumentoResponseDto } from "../../../types/documento"
import "./AdminDocumentos.css"
import { documentoService } from "../../../services/documentoService"

const AdminDocumentos: React.FC = () => {
  const [documentos, setDocumentos] = useState<DocumentoResponseDto[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")

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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredDocumentos = documentos.filter((documento) =>
    documento.nome.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="admin-documentos">
      <h2>Lista de Documentos</h2>
      <div className="admin-documentos-actions">
        <Link to="/admin/documentos/create" className="btn-create">
          Criar Novo Documento
        </Link>
        <input
          type="text"
          placeholder="Pesquisar por nome..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Tag</th>
            <th>Data de Criação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredDocumentos.map((documento) => (
            <tr key={documento.id}>
              <td>{documento.nome}</td>
              <td>{documento.tipo}</td>
              <td>{documento.tag}</td>
              <td>{new Date(documento.data_criacao).toLocaleDateString()}</td>
              <td>
                <Link to={`/admin/documentos/view/${documento.id}`} className="btn-view">
                  Visualizar
                </Link>
                <Link to={`/admin/documentos/edit/${documento.id}`} className="btn-edit">
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

export default AdminDocumentos
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { cursoService } from "../../../services/cursoService"
import type { CursoResponseDto } from "../../../types/curso"
import "./AdminCursos.css"

const AdminCursos: React.FC = () => {
  const [cursos, setCursos] = useState<CursoResponseDto[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")

  useEffect(() => {
    fetchCursos()
  }, [])

  const fetchCursos = async () => {
    try {
      const data = await cursoService.getAll()
      setCursos(data)
    } catch (error) {
      console.error("Erro ao buscar cursos:", error)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este curso?")) {
      try {
        await cursoService.delete(id)
        fetchCursos()
      } catch (error) {
        console.error("Erro ao excluir curso:", error)
      }
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredCursos = cursos.filter((curso) => curso.nome.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="admin-cursos">
      <h2>Lista de Cursos</h2>
      <div className="admin-cursos-actions">
        <Link to="/admin/cursos/create" className="btn-create">
          Criar Novo Curso
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
            <th>Link Documento CAPES</th>
            <th>Link Detalhes do Curso</th>
            <th>Data de Criação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredCursos.map((curso) => (
            <tr key={curso.id}>
              <td>{curso.nome}</td>
              <td>
                <a href={curso.link_documento_capes} target="_blank" rel="noopener noreferrer">
                  Documento CAPES
                </a>
              </td>
              <td>
                <a href={curso.link_detalhes_curso} target="_blank" rel="noopener noreferrer">
                  Detalhes do Curso
                </a>
              </td>
              <td>{new Date(curso.data_criacao).toLocaleDateString()}</td>
              <td>
                <Link to={`/admin/cursos/view/${curso.id}`} className="btn-view">
                  Visualizar
                </Link>
                <Link to={`/admin/cursos/edit/${curso.id}`} className="btn-edit">
                  Editar
                </Link>
                <button onClick={() => handleDelete(curso.id)} className="btn-delete">
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

export default AdminCursos
import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { cursoService } from "../../services/cursoService"
import type { CursoResponseDto } from "../../types/curso"
import "./CursoList.css"

const CursoList: React.FC = () => {
  const [cursos, setCursos] = useState<CursoResponseDto[]>([])

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

  return (
    <div className="curso-list">
      <h2>Lista de Cursos</h2>
      <Link to="/curso/create" className="btn-create">
        Criar Novo Curso
      </Link>
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
          {cursos.map((curso) => (
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
                <Link to={`/curso/edit/${curso.id}`} className="btn-edit">
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

export default CursoList
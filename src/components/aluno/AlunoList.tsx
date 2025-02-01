import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { alunoService } from "../../services/alunoService"
import type { AlunoResponseDto } from "../../types/aluno"
import "./AlunoList.css"

const AlunoList: React.FC = () => {
  const [alunos, setAlunos] = useState<AlunoResponseDto[]>([])

  useEffect(() => {
    fetchAlunos()
  }, [])

  const fetchAlunos = async () => {
    try {
      const data = await alunoService.getAll()
      setAlunos(data)
    } catch (error) {
      console.error("Erro ao buscar alunos:", error)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este aluno?")) {
      try {
        await alunoService.delete(id)
        fetchAlunos()
      } catch (error) {
        console.error("Erro ao excluir aluno:", error)
      }
    }
  }

  return (
    <div className="aluno-list">
      <h2>Lista de Alunos</h2>
      <Link to="/aluno/create" className="btn-create">
        Criar Novo Aluno
      </Link>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Matrícula</th>
            <th>Curso</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.id}>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
              <td>{aluno.matricula}</td>
              <td>{aluno.curso}</td>
              <td>
                <Link to={`/aluno/edit/${aluno.id}`} className="btn-edit">
                  Editar
                </Link>
                <button onClick={() => handleDelete(aluno.id)} className="btn-delete">
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

export default AlunoList
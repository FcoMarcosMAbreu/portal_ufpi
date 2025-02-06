import type React from "react"
import { useState, useEffect } from "react"
import { turmaService } from "../../services/turmaService"
import type { TurmaDto } from "../../types/turma"
import "./TurmaList.css"

const TurmaList: React.FC = () => {
  const [turmas, setTurmas] = useState<TurmaDto[]>([])

  useEffect(() => {
    fetchTurmas()
  }, [])

  const fetchTurmas = async () => {
    try {
      const data = await turmaService.getAll()
      setTurmas(data)
    } catch (error) {
      console.error("Erro ao buscar turmas:", error)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta turma?")) {
      try {
        await turmaService.delete(id)
        fetchTurmas()
      } catch (error) {
        console.error("Erro ao excluir turma:", error)
      }
    }
  }

  return (
    <div className="turma-list">
      <h2>Lista de Turmas</h2>
      <table>
        <thead>
          <tr>
            <th>Matéria</th>
            <th>Nome da Turma</th>
            <th>Horários</th>
            <th>Período/Ano</th>
            <th>Docentes</th>
            <th>Data de Criação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {turmas.map((turma) => (
            <tr key={turma.id}>
              <td>{turma.materia}</td>
              <td>{turma.nome_turma}</td>
              <td>{turma.horarios}</td>
              <td>{turma.periodo_ano}</td>
              <td>{turma.docentes}</td>
              <td>{new Date(turma.data_criacao).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleDelete(turma.id)} className="btn-delete">
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

export default TurmaList


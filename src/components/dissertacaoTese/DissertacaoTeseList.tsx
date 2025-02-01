import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { dissertacaoTeseService } from "../../services/dissertacaoTeseService"
import type { DissertacaoTeseDto } from "../../types/dissertacaoTese"
import "./DissertacaoTeseList.css"

const DissertacaoTeseList: React.FC = () => {
  const [dissertacoesTeses, setDissertacoesTeses] = useState<DissertacaoTeseDto[]>([])

  useEffect(() => {
    fetchDissertacoesTeses()
  }, [])

  const fetchDissertacoesTeses = async () => {
    try {
      const data = await dissertacaoTeseService.getAll()
      setDissertacoesTeses(data)
    } catch (error) {
      console.error("Erro ao buscar dissertações e teses:", error)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta dissertação/tese?")) {
      try {
        await dissertacaoTeseService.delete(id)
        fetchDissertacoesTeses()
      } catch (error) {
        console.error("Erro ao excluir dissertação/tese:", error)
      }
    }
  }

  return (
    <div className="dissertacao-tese-list">
      <h2>Lista de Dissertações e Teses</h2>
      <Link to="/dissertacao-tese/create" className="btn-create">
        Criar Nova Dissertação/Tese
      </Link>
      <table>
        <thead>
          <tr>
            <th>Autor</th>
            <th>Título</th>
            <th>Orientador</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {dissertacoesTeses.map((dissertacaoTese) => (
            <tr key={dissertacaoTese.id}>
              <td>{dissertacaoTese.nome_autor}</td>
              <td>{dissertacaoTese.titulo}</td>
              <td>{dissertacaoTese.orientador}</td>
              <td>{new Date(dissertacaoTese.data).toLocaleDateString()}</td>
              <td>
                <Link to={`/dissertacao-tese/edit/${dissertacaoTese.id}`} className="btn-edit">
                  Editar
                </Link>
                <button onClick={() => handleDelete(dissertacaoTese.id)} className="btn-delete">
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

export default DissertacaoTeseList
import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { processoSeletivoService } from "../../services/processoSeletivoService"
import type { ProcessoSeletivoDto } from "../../types/processoSeletivo"
import "./ProcessoSeletivoList.css"

const ProcessoSeletivoList: React.FC = () => {
  const [processosSeletivos, setProcessosSeletivos] = useState<ProcessoSeletivoDto[]>([])

  useEffect(() => {
    fetchProcessosSeletivos()
  }, [])

  const fetchProcessosSeletivos = async () => {
    try {
      const data = await processoSeletivoService.getAll()
      setProcessosSeletivos(data)
    } catch (error) {
      console.error("Erro ao buscar processos seletivos:", error)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este processo seletivo?")) {
      try {
        await processoSeletivoService.delete(id)
        fetchProcessosSeletivos()
      } catch (error) {
        console.error("Erro ao excluir processo seletivo:", error)
      }
    }
  }

  return (
    <div className="processo-seletivo-list">
      <h2>Lista de Processos Seletivos</h2>
      <Link to="/processo-seletivo/create" className="btn-create">
        Criar Novo Processo Seletivo
      </Link>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descrição</th>
            <th>Link de Inscrição</th>
            <th>Data de Criação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {processosSeletivos.map((processoSeletivo) => (
            <tr key={processoSeletivo.id}>
              <td>{processoSeletivo.titulo}</td>
              <td>{processoSeletivo.descricao}</td>
              <td>
                <a href={processoSeletivo.link_inscricao} target="_blank" rel="noopener noreferrer">
                  Link de Inscrição
                </a>
              </td>
              <td>{new Date(processoSeletivo.data_criacao).toLocaleDateString()}</td>
              <td>
                <Link to={`/processo-seletivo/edit/${processoSeletivo.id}`} className="btn-edit">
                  Editar
                </Link>
                <button onClick={() => handleDelete(processoSeletivo.id)} className="btn-delete">
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

export default ProcessoSeletivoList
import type React from "react"
import { useState, useEffect } from "react"
import { processoSeletivoService } from "../../services/processoSeletivoService"
import type { ProcessoSeletivoDto } from "../../types/processoSeletivo"
import "./ProcessoSeletivoList.css"

const ProcessoSeletivoList: React.FC = () => {
  const [processosSeletivos, setProcessosSeletivos] = useState<ProcessoSeletivoDto[]>([])
  const [searchTerm, setSearchTerm] = useState("")

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredProcessosSeletivos = processosSeletivos.filter(
    (processoSeletivo) =>
      processoSeletivo.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      processoSeletivo.descricao.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="processo-seletivo-list">
      <h2>Lista de Processos Seletivos</h2>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Pesquisar processos seletivos..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
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
          {filteredProcessosSeletivos.map((processoSeletivo) => (
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
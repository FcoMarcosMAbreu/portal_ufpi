import type React from "react"
import { useState, useEffect } from "react"
import type { CalendarioDto } from "../../types/calendario"
import { calendarioService } from "../../services/calendarioService"
import "./CalendarioList.css"

const CalendarioList: React.FC = () => {
  const [calendarios, setCalendarios] = useState<CalendarioDto[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchCalendarios()
  }, [])

  const fetchCalendarios = async () => {
    try {
      const data = await calendarioService.getAll()
      setCalendarios(data)
    } catch (error) {
      console.error("Erro ao buscar eventos do calendário:", error)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este evento do calendário?")) {
      try {
        await calendarioService.delete(id)
        fetchCalendarios()
      } catch (error) {
        console.error("Erro ao excluir evento do calendário:", error)
      }
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredCalendarios = calendarios.filter(
    (calendario) =>
      calendario.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      calendario.descricao.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="calendario-list">
      <h2>Lista de Eventos do Calendário</h2>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Pesquisar eventos..."
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
            <th>Data de Início</th>
            <th>Data de Término</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredCalendarios.map((calendario) => (
            <tr key={calendario.id}>
              <td>{calendario.titulo}</td>
              <td>{calendario.descricao}</td>
              <td>{new Date(calendario.data_inicio).toLocaleDateString()}</td>
              <td>{new Date(calendario.data_termino).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleDelete(calendario.id)} className="btn-delete">
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

export default CalendarioList
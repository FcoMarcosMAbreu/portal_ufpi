"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { processoSeletivoService } from "../../../services/processoSeletivoService"
import type { ProcessoSeletivoDto } from "../../../types/processoSeletivo"
import "./AdminProcessosSeletivos.css"

const AdminProcessosSeletivos: React.FC = () => {
  const [processosSeletivos, setProcessosSeletivos] = useState<ProcessoSeletivoDto[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")

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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredProcessosSeletivos = processosSeletivos.filter((item) =>
    item.titulo.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="admin-processos-seletivos">
      <h2>Lista de Processos Seletivos</h2>
      <div className="admin-processos-seletivos-actions">
        <div className="action-buttons">
          <Link to="/admin" className="btn-back">
            Voltar
          </Link>
          <Link to="/admin/processos-seletivos/create" className="btn-create">
            Criar Novo Processo Seletivo
          </Link>
        </div>
        <input
          type="text"
          placeholder="Pesquisar por título..."
          value={searchTerm}
          onChange={handleSearch}
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
          {filteredProcessosSeletivos.map((item) => (
            <tr key={item.id}>
              <td>{item.titulo}</td>
              <td>{item.descricao}</td>
              <td>
                <a href={item.link_inscricao} target="_blank" rel="noopener noreferrer">
                  Link de Inscrição
                </a>
              </td>
              <td>{new Date(item.data_criacao).toLocaleDateString()}</td>
              <td>
                <Link to={`/admin/processos-seletivos/view/${item.id}`} className="btn-view">
                  Visualizar
                </Link>
                <Link to={`/admin/processos-seletivos/edit/${item.id}`} className="btn-edit">
                  Editar
                </Link>
                <button onClick={() => handleDelete(item.id)} className="btn-delete">
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

export default AdminProcessosSeletivos


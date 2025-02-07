"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { dissertacaoTeseService } from "../../../services/dissertacaoTeseService"
import type { DissertacaoTeseDto } from "../../../types/dissertacaoTese"
import "./AdminDissertacoesTeses.css"

const AdminDissertacoesTeses: React.FC = () => {
  const [dissertacoesTeses, setDissertacoesTeses] = useState<DissertacaoTeseDto[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")

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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredDissertacoesTeses = dissertacoesTeses.filter(
    (item) =>
      item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nome_autor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="admin-dissertacoes-teses">
      <h2>Lista de Dissertações e Teses</h2>
      <div className="admin-dissertacoes-teses-actions">
        <Link to="/admin/dissertacoes-teses/create" className="btn-create">
          Criar Nova Dissertação/Tese
        </Link>
        <input
          type="text"
          placeholder="Pesquisar por título ou autor..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Orientador</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredDissertacoesTeses.map((item) => (
            <tr key={item.id}>
              <td>{item.titulo}</td>
              <td>{item.nome_autor}</td>
              <td>{item.orientador}</td>
              <td>{item.data}</td>
              <td>
                <Link to={`/admin/dissertacoes-teses/view/${item.id}`} className="btn-view">
                  Visualizar
                </Link>
                <Link to={`/admin/dissertacoes-teses/edit/${item.id}`} className="btn-edit">
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

export default AdminDissertacoesTeses
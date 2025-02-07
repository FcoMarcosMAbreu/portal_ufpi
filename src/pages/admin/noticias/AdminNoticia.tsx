"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { noticiaService } from "../../../services/noticiaService"
import type { NoticiaDto } from "../../../types/noticia"
import "./AdminNoticia.css"

const AdminNoticias: React.FC = () => {
  const [noticias, setNoticias] = useState<NoticiaDto[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")

  useEffect(() => {
    fetchNoticias()
  }, [])

  const fetchNoticias = async () => {
    try {
      const data = await noticiaService.getAll()
      setNoticias(data)
    } catch (error) {
      console.error("Erro ao buscar notícias:", error)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta notícia?")) {
      try {
        await noticiaService.delete(id)
        fetchNoticias()
      } catch (error) {
        console.error("Erro ao excluir notícia:", error)
      }
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredNoticias = noticias.filter((noticia) => noticia.titulo.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="admin-noticias">
      <h2>Lista de Notícias</h2>
      <div className="admin-noticias-actions">
        <div className="action-buttons">
          <Link to="/admin" className="btn-back">
            Voltar
          </Link>
          <Link to="/admin/noticias/create" className="btn-create">
            Criar Nova Notícia
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
            <th>Tag</th>
            <th>Links de Referência</th>
            <th>Data de Criação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredNoticias.map((noticia) => (
            <tr key={noticia.id}>
              <td>{noticia.titulo}</td>
              <td>{noticia.tag}</td>
              <td>{noticia.links_referencia}</td>
              <td>{new Date(noticia.data_criacao).toLocaleDateString()}</td>
              <td>
                <Link to={`/admin/noticias/view/${noticia.id}`} className="btn-view">
                  Visualizar
                </Link>
                <Link to={`/admin/noticias/edit/${noticia.id}`} className="btn-edit">
                  Editar
                </Link>
                <button onClick={() => handleDelete(noticia.id)} className="btn-delete">
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

export default AdminNoticias
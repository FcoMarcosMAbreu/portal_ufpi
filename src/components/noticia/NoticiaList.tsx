import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { noticiaService } from "../../services/noticiaService"
import type { NoticiaDto } from "../../types/noticia"
import "./NoticiaList.css"

const NoticiaList: React.FC = () => {
  const [noticias, setNoticias] = useState<NoticiaDto[]>([])

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

  return (
    <div className="noticia-list">
      <h2>Lista de Notícias</h2>
      <Link to="/noticia/create" className="btn-create">
        Criar Nova Notícia
      </Link>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Tag</th>
            <th>Data de Criação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {noticias.map((noticia) => (
            <tr key={noticia.id}>
              <td>{noticia.titulo}</td>
              <td>{noticia.tag}</td>
              <td>{new Date(noticia.data_criacao).toLocaleDateString()}</td>
              <td>
                <Link to={`/noticia/edit/${noticia.id}`} className="btn-edit">
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

export default NoticiaList
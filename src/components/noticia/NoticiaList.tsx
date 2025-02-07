import type React from "react"
import { useState, useEffect } from "react"
import { noticiaService } from "../../services/noticiaService"
import type { NoticiaDto } from "../../types/noticia"
import "./NoticiaList.css"

const NoticiaList: React.FC = () => {
  const [noticias, setNoticias] = useState<NoticiaDto[]>([])
  const [searchTerm, setSearchTerm] = useState("")

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredNoticias = noticias.filter(
    (noticia) =>
      noticia.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      noticia.tag.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="noticia-list">
      <h2>Lista de Notícias</h2>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Pesquisar notícias..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
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
          {filteredNoticias.map((noticia) => (
            <tr key={noticia.id}>
              <td>{noticia.titulo}</td>
              <td>{noticia.tag}</td>
              <td>{new Date(noticia.data_criacao).toLocaleDateString()}</td>
              <td>
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
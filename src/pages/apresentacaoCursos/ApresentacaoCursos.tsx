"use client"

import { useState, useEffect } from "react"
import { cursoService } from "../../services/cursoService"
import type { CursoResponseDto } from "../../types/curso"
import "./ApresentacaoCursos.css"

const ApresentacaoCursos: React.FC = () => {
  const [cursos, setCursos] = useState<CursoResponseDto[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchCursos()
  }, [])

  const fetchCursos = async () => {
    try {
      const data = await cursoService.getAll()
      setCursos(data)
    } catch (error) {
      console.error("Erro ao buscar cursos:", error)
    }
  }

  const filteredCursos = cursos.filter((curso) => curso.nome.toLowerCase().includes(searchTerm.toLowerCase()))

  const doutoradoCursos = filteredCursos.filter((curso) => curso.tipo_pos.toLowerCase() === "doutorado")
  const mestradoCursos = filteredCursos.filter((curso) => curso.tipo_pos.toLowerCase() === "mestrado")

  const renderCursoCards = (cursos: CursoResponseDto[]) => {
    return cursos.map((curso) => (
      <div key={curso.id} className="curso-card">
        <h3>{curso.nome}</h3>
        <div className="curso-links">
          <a href={curso.link_documento_capes} target="_blank" rel="noopener noreferrer">
            Documento de reconhecimento e conceito da CAPES
          </a>
          <a href={curso.link_detalhes_curso} target="_blank" rel="noopener noreferrer">
            Detalhes do curso
          </a>
        </div>
      </div>
    ))
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div className="apresentacao-cursos">
      <section className="hero-section-cursos">
        <div className="hero-content">
          <h1>Cursos</h1>
        </div>
      </section>

      <section className="content-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Pesquisar cursos..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="section-padding">
          <h2>PÓS-GRADUAÇÃO EM ZOOTECNIA TROPICAL - Doutorado</h2>
          <div className="cursos-grid">{renderCursoCards(doutoradoCursos)}</div>
        </div>

        <div className="section-padding">
          <h2>PÓS-GRADUAÇÃO EM ZOOTECNIA TROPICAL - Mestrado</h2>
          <div className="cursos-grid">{renderCursoCards(mestradoCursos)}</div>
        </div>

        {filteredCursos.length === 0 && (
          <p className="no-results">Nenhum curso encontrado para a pesquisa realizada.</p>
        )}
      </section>
    </div>
  )
}

export default ApresentacaoCursos


"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { professorService } from "../../services/professorService"
import type { ProfessorResponseDto } from "../../types/professor"
import { PageContainer } from "../common/PageContainer"
import { ResourceGrid } from "../common/ResourceGrid"
import "./ProfessorList.css"

const ProfessorList: React.FC = () => {
  const [professores, setProfessores] = useState<ProfessorResponseDto[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchProfessores()
  }, [])

  const fetchProfessores = async () => {
    try {
      const data = await professorService.getAll()
      setProfessores(data)
    } catch (error) {
      console.error("Erro ao buscar professores:", error)
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredProfessores = professores.filter(
    (professor) =>
      professor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professor.nivel.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <PageContainer title="Corpo Docente" description="Conheça os professores do programa de pós-graduação">
      <div className="filter-container">
        <input
          type="text"
          placeholder="Pesquisar professores..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <ResourceGrid>
        {filteredProfessores.map((professor) => (
          <div key={professor.id} className="professor-card">
            <h3 className="professor-name">{professor.nome}</h3>
            <div className="professor-info">
              <p>
                <strong>Nível:</strong> {professor.nivel}
              </p>
              <p>
                <strong>Email:</strong> {professor.email}
              </p>
              <p>
                <strong>Telefone:</strong> {professor.telefone}
              </p>
            </div>
            <div className="professor-links">
              <a href={professor.curriculo_lattes} target="_blank" rel="noopener noreferrer" className="lattes-link">
                Currículo Lattes
              </a>
            </div>
          </div>
        ))}
      </ResourceGrid>
    </PageContainer>
  )
}

export default ProfessorList


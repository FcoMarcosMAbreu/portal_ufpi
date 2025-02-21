"use client"

import { useState, useEffect } from "react"
import "./GradeCurricular.css"
import type { GradeCurricularDto } from "../../types/gradeCurricular"
import { gradeCurricularService } from "../../services/gradeCurricularService"
import { Download } from "lucide-react"
import { useTranslation } from "react-i18next"

const API_BASE_URL = "http://localhost:3000"

// Mock data for grade curricular areas
/*
const GRADE_AREAS = [
  {
    id: 1,
    title: "Disciplinas Obrigatórias",
    shortDescription: "Disciplinas fundamentais para a formação acadêmica no programa.",
    icon: "📚",
  },
  {
    id: 2,
    title: "Disciplinas Optativas",
    shortDescription: "Disciplinas complementares para especialização em áreas específicas.",
    icon: "📖",
  },
]
*/

export default function GradeCurricular() {
  const [gradeCurricular, setGradeCurricular] = useState<GradeCurricularDto[]>([])
  const [filteredGradeCurricular, setFilteredGradeCurricular] = useState<GradeCurricularDto[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedArea, setExpandedArea] = useState<number | null>(null)
  const { t } = useTranslation()

  useEffect(() => {
    fetchGrade()
  }, [])

  useEffect(() => {
    filterGradeCurricular()
  }, [gradeCurricular]) //Fixed unnecessary dependency

  const fetchGrade = async () => {
    try {
      const data = await gradeCurricularService.getAll()
      setGradeCurricular(data)
      setFilteredGradeCurricular(data)
    } catch (error) {
      console.error("Erro ao buscar grade curricular:", error)
    }
  }

  const filterGradeCurricular = () => {
    const filtered = gradeCurricular.filter(
      (grade) =>
        grade.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grade.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grade.componente_curricular.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredGradeCurricular(filtered)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const toggleArea = (id: number) => {
    setExpandedArea(expandedArea === id ? null : id)
  }

  const renderDisciplinas = (disciplinas: GradeCurricularDto[]) => {
    return disciplinas.map((disciplina) => (
      <div key={disciplina.id} className="area-card">
        <div className="area-header">
          <h3>{disciplina.titulo}</h3>
          <span className="area-code">{disciplina.codigo}</span>
        </div>
        <p className="area-short-description">
          <strong>{t("curriculum.workload")}:</strong> {disciplina.carga_horaria}
        </p>
        <div className={`area-full-description ${expandedArea === disciplina.id ? "expanded" : ""}`}>
          <p>
            <strong>{t("curriculum.syllabus")}:</strong> {disciplina.ementa}
          </p>
          <p>
            <strong>{t("curriculum.currComponent")}:</strong> {disciplina.componente_curricular}
          </p>
        </div>
        <div className="area-actions">
          <button className="read-more-btn" onClick={() => toggleArea(disciplina.id)}>
            {expandedArea === disciplina.id ? `${t("curriculum.readLess")}` : `${t("curriculum.readMore")}`}
          </button>
          <a
            href={`${API_BASE_URL}/grade-curricular/${disciplina.id}/download`}
            download
            className="download-btn"
            title="Baixar ementa"
          >
            <Download size={18} />
            {t("curriculum.download")}
          </a>
        </div>
      </div>
    ))
  }

  const mestradoCourses = filteredGradeCurricular.filter((course) => course.tipo_pos.toLowerCase() === "mestrado")
  const doutoradoCourses = filteredGradeCurricular.filter((course) => course.tipo_pos.toLowerCase() === "doutorado")

  return (
    <div className="grade-curricular">
      <section className="hero-section">
        <div className="hero-content">
          <h1>{t("curriculum.title")}</h1>
        </div>
      </section>

      <section className="content-section">
        <div className="program-info">
          <h2>{t("curriculum.structure")}</h2>
          <p>
          {t("curriculum.structureText")}
          </p>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder={t("curriculum.search")}
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="research-areas">
          <h2>{t("curriculum.masterDisc")}</h2>
          <div className="areas-grid">{renderDisciplinas(mestradoCourses)}</div>
        </div>

        <div className="research-areas">
          <h2>{t("curriculum.docDisc")}</h2>
          <div className="areas-grid">{renderDisciplinas(doutoradoCourses)}</div>
        </div>

        <div className="contact-section">
          <h2>{t("curriculum.interest")}</h2>
          <p>
          {t("curriculum.interestText")}
          </p>
          <button className="contact-btn">{t("curriculum.contact")}</button>
        </div>
      </section>
    </div>
  )
}


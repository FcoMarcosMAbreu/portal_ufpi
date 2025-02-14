"use client"

import { useEffect, useState } from "react"
import "./GradeCurricular.css"
import type { GradeCurricularDto } from "../../types/gradeCurricular"
import { gradeCurricularService } from "../../services/gradeCurricularService"

export default function GradeCurricular() {
  const [gradeCurricular, setGradeCurricular] = useState<GradeCurricularDto[]>([])
  const [filteredGradeCurricular, setFilteredGradeCurricular] = useState<GradeCurricularDto[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedCourses, setExpandedCourses] = useState<{ [key: number]: boolean }>({})

  useEffect(() => {
    fetchGrade()
  }, [])

  useEffect(() => {
    filterGradeCurricular()
  }, [searchTerm]) //Fixed unnecessary dependency

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
        grade.carga_horaria.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grade.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grade.componente_curricular.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grade.ementa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grade.tipo_pos.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grade.titulo.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredGradeCurricular(filtered)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const toggleCourse = (id: number) => {
    setExpandedCourses((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const renderCourseCards = (courses: GradeCurricularDto[]) => {
    return courses.map((course) => (
      <div key={course.id} className="course-card">
        <div className="course-header">
          <h3>{course.titulo}</h3>
          <span className="course-code">{course.codigo}</span>
        </div>
        <p className="course-short-info">Carga Horária: {course.carga_horaria}</p>
        <div className={`course-full-description ${expandedCourses[course.id] ? "expanded" : ""}`}>
          <p>
            <strong>Ementa:</strong> {course.ementa}
          </p>
          <p>
            <strong>Componente Curricular:</strong> {course.componente_curricular}
          </p>
        </div>
        <button className="read-more-btn" onClick={() => toggleCourse(course.id)}>
          {expandedCourses[course.id] ? "Ler menos" : "Ler mais"}
        </button>
      </div>
    ))
  }

  const mestradoCourses = filteredGradeCurricular.filter((course) => course.tipo_pos.toLowerCase() === "mestrado")
  const doutoradoCourses = filteredGradeCurricular.filter((course) => course.tipo_pos.toLowerCase() === "doutorado")

  return (
    <div className="grade-curricular">
      <section className="hero-section-grade">
        <div className="hero-content">
          <h1>Grade Curricular</h1>
        </div>
      </section>

      <section className="content-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Pesquisar disciplinas..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="courses-section">
          <h2>Disciplinas de Mestrado</h2>
          <div className="courses-grid">{renderCourseCards(mestradoCourses)}</div>
        </div>

        <div className="courses-section">
          <h2>Disciplinas de Doutorado</h2>
          <div className="courses-grid">{renderCourseCards(doutoradoCourses)}</div>
        </div>

        <div className="contact-section">
          <h2>Interessado em nossos programas?</h2>
          <p>
            Entre em contato com a coordenação do programa para mais informações sobre a grade curricular e o processo
            seletivo.
          </p>
          <button className="contact-btn">Contate-nos</button>
        </div>
      </section>
    </div>
  )
}


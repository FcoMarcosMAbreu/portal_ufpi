"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { authService } from "../services/authService"
import logo from "../assets/images/logo.png"
import "./Header.css"
import LanguageSelector from "./LanguageSelector"

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        await authService.getCurrentUser()
        setIsLoggedIn(true)
      } catch (error) {
        setIsLoggedIn(false)
      }
    }
    checkLoginStatus()
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo-link">
          <img src={logo || "/placeholder.svg"} alt="Logo" className="logo" />
        </Link>
        <button className="mobile-menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
        <nav className={`navbar ${isMenuOpen ? "open" : ""}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                {t("header.home")}
              </Link>
            </li>
            <li className="nav-item">
              <span className="nav-link">{t("header.programs")}</span>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/" onClick={() => setIsMenuOpen(false)}>
                    {t("header.presentation")}
                  </Link>
                </li>
                <li>
                  <Link to="/programas/grade-curricular" onClick={() => setIsMenuOpen(false)}>
                    {t("header.curriculum")}
                  </Link>
                </li>
                <li>
                  <Link to="/programas/area-concentracao" onClick={() => setIsMenuOpen(false)}>
                    {t("header.concentrationArea")}
                  </Link>
                </li>
                <li>
                  <Link to="/programas/cursos" onClick={() => setIsMenuOpen(false)}>
                    {t("header.courses")}
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <span className="nav-link">{t("header.teaching")}</span>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/ensino/alunos-ativos" onClick={() => setIsMenuOpen(false)}>
                    {t("header.activeStudents")}
                  </Link>
                </li>
                <li>
                  <Link to="/ensino/corpo-docente" onClick={() => setIsMenuOpen(false)}>
                    {t("header.faculty")}
                  </Link>
                </li>
                <li>
                  <Link to="/ensino/cursos" onClick={() => setIsMenuOpen(false)}>
                    {t("header.courses")}
                  </Link>
                </li>
                <li>
                  <Link to="/ensino/teses-dissertacoes" onClick={() => setIsMenuOpen(false)}>
                    {t("header.thesesDissertations")}
                  </Link>
                </li>
                <li>
                  <Link to="/ensino/turmas" onClick={() => setIsMenuOpen(false)}>
                    {t("header.classes")}
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/calendario" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                {t("header.calendar")}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/processo-seletivo" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                {t("header.selectionProcesses")}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/noticia" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                {t("header.news")}
              </Link>
            </li>
            <li className="nav-item">
              <span className="nav-link">{t("header.documents")}</span>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/documentos/formularios" onClick={() => setIsMenuOpen(false)}>
                    {t("header.forms")}
                  </Link>
                </li>
                <li>
                  <Link to="/documentos/resolucao" onClick={() => setIsMenuOpen(false)}>
                    {t("header.resolution")}
                  </Link>
                </li>
                <li>
                  <Link to="/documentos/regimento" onClick={() => setIsMenuOpen(false)}>
                    {t("header.bylaws")}
                  </Link>
                </li>
                <li>
                  <Link to="/documentos/outros" onClick={() => setIsMenuOpen(false)}>
                    {t("header.others")}
                  </Link>
                </li>
                <li>
                  <Link to="/documentos/material-didatico" onClick={() => setIsMenuOpen(false)}>
                    {t("header.teachingMaterials")}
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <div className="auth-links">
          {isLoggedIn ? (
            <Link to="/admin" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              {t("header.adminDashboard")}
            </Link>
          ) : (
            <Link to="/login" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              {t("header.login")}
            </Link>
          )}
        </div>
        <LanguageSelector />
      </div>
    </header>
  )
}

export default Header


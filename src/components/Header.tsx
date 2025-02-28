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
  //const navigate = useNavigate()
  const { t } = useTranslation()

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

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo-link">
          <img src={logo || "/placeholder.svg"} alt="Logo" className="logo" />
        </Link>
        <nav className="navbar">
          <ul className="nav-list">
            {/*
            <li className="nav-item">
              <Link to="/" className="nav-link">
                {t("header.home")}
              </Link>
            </li>
            */}
            <li className="nav-item">
              <span className="nav-link">{t("header.programs")}</span>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/">{t("header.presentation")}</Link>
                </li>
                <li>
                  <Link to="/programas/grade-curricular">{t("header.curriculum")}</Link>
                </li>
                <li>
                  <Link to="/programas/area-concentracao">{t("header.concentrationArea")}</Link>
                </li>
                <li>
                  <Link to="/programas/cursos">{t("header.courses")}</Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <span className="nav-link">{t("header.teaching")}</span>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/ensino/alunos-ativos">{t("header.activeStudents")}</Link>
                </li>
                <li>
                  <Link to="/ensino/corpo-docente">{t("header.faculty")}</Link>
                </li>
                <li>
                  <Link to="/ensino/cursos">{t("header.courses")}</Link>
                </li>
                <li>
                  <Link to="/ensino/teses-dissertacoes">{t("header.thesesDissertations")}</Link>
                </li>
                <li>
                  <Link to="/ensino/turmas">{t("header.classes")}</Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/calendario" className="nav-link">
                {t("header.calendar")}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/processo-seletivo" className="nav-link">
                {t("header.selectionProcesses")}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/noticia" className="nav-link">
                {t("header.news")}
              </Link>
            </li>
            <li className="nav-item">
              <span className="nav-link">{t("header.documents")}</span>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/documentos/formularios">{t("header.forms")}</Link>
                </li>
                <li>
                  <Link to="/documentos/resolucao">{t("header.resolution")}</Link>
                </li>
                <li>
                  <Link to="/documentos/regimento">{t("header.bylaws")}</Link>
                </li>
                <li>
                  <Link to="/documentos/outros">{t("header.others")}</Link>
                </li>
                <li>
                  <Link to="/documentos/material-didatico">{t("header.teachingMaterials")}</Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <div className="auth-links">
          {isLoggedIn ? (
            <Link to="/admin" className="nav-link">
              {t("header.adminDashboard")}
            </Link>
          ) : (
            <Link to="/login" className="nav-link">
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


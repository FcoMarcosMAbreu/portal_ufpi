import type React from "react"
import { useTranslation } from "react-i18next"
//import { Globe } from "lucide-react"
import "./LanguageSelector.css"

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className="language-selector">
      {/*<Globe size={24} />*/}
      <button
        className={`language-button ${i18n.language === "pt" ? "active" : ""}`}
        onClick={() => changeLanguage("pt")}
      >
        <img src="src\assets\images\brasil.png" alt="Português" />
        {/*<a href="https://www.flaticon.com/br/icones-gratis/brasil" title="brasil ícones">Brasil ícones criados por Graphix Dxinerz - Flaticon</a>*/}
      </button>
      <button
        className={`language-button ${i18n.language === "en" ? "active" : ""}`}
        onClick={() => changeLanguage("en")}
      >
        <img src="src\assets\images\estados-unidos.png" alt="English" />
        {/*<a href="https://www.flaticon.com/br/icones-gratis/bandeira" title="bandeira ícones">Bandeira ícones criados por Freepik - Flaticon</a></a> */}
      </button>
    </div>
  )
}

export default LanguageSelector


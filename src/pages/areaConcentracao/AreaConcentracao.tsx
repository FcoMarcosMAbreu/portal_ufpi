import { useState } from "react"
import "./AreaConcentracao.css"
import { useTranslation } from "react-i18next"

// Mock data for research areas
const RESEARCH_AREAS = [
  {
    id: 1,
    title: "Genética, melhoramento genético e reprodução animal nos trópicos",
    shortDescription:
      "Aprimoramento genético de rebanhos e desenvolvimento de biotecnologias reprodutivas para espécies de interesse econômico.",
    fullDescription: `A linha de pesquisa busca aprimorar geneticamente os rebanhos do Piauí, Meio-Norte e Nordeste do Brasil, promovendo a competitividade e a sustentabilidade das espécies de interesse econômico. Para isso, investiga metodologias de estimação genética, impacto da interação genótipo-ambiente, conservação de raças nativas e planos de cruzamento para otimizar a produção de proteína animal.

O estudo também desenvolve programas computacionais para gestão de populações e controle zootécnico, além de modelos genéticos adaptados à realidade local. No campo da reprodução, explora o cultivo e comportamento de células germinativas, gametas e embriões, visando acelerar o melhoramento genético e consolidar biotécnicas reprodutivas.

A pesquisa inclui técnicas como controle do ciclo estral, inseminação artificial, transferência e produção in vitro de embriões, diagnóstico precoce de gestação, clonagem e transgenia, ampliando índices produtivos e modernizando a criação animal em regiões tropicais.`,
    icon: "🧬",
  },
  {
    id: 2,
    title: "Produção de alimentos e nutrição animal nos trópicos",
    shortDescription:
      "Pesquisa em produção e nutrição animal com foco em sustentabilidade e eficiência em regiões tropicais.",
    fullDescription: `A pesquisa foca na produção de alimentos para ruminantes e não ruminantes em regiões tropicais, avaliando alimentos, aditivos, sistemas de alimentação, exigências nutricionais e qualidade dos produtos. Destaca o uso de plantas forrageiras nativas e adaptadas, além de fontes convencionais e alternativas, visando eficiência e conforto animal.

Inclui estudos sobre manejo integrado, aspectos sanitários, genéticos e ambientais que influenciam a nutrição, bem como a análise da intensificação da pecuária, integração lavoura-pecuária e impacto ambiental.

Também investiga a otimização do aproveitamento de matéria-prima, segurança alimentar, formulações inovadoras e boas práticas de fabricação, abordando perigos físicos, químicos e biológicos na produção de alimentos para consumo humano e animal.`,
    icon: "🌾",
  },
]

export default function AreaConcentracao() {
  const [expandedArea, setExpandedArea] = useState<number | null>(null)
  const { t } = useTranslation()

  const toggleArea = (id: number) => {
    setExpandedArea(expandedArea === id ? null : id)
  }

  return (
    <div className="area-concentracao">
      <section className="hero-section-concentracao">
        <div className="hero-content">
          <h1>{t("concentrationArea.title")}</h1>
          {/*<p className="subtitle">Doutorado em Ciência Animal</p>*/}
        </div>
      </section>

      <section className="content-section">
        <div className="program-info">
          <h2>{t("concentrationArea.researchesTitle")}</h2>
          <p>
          {t("concentrationArea.researchesText")}
          </p>
        </div>

        <div className="research-areas">
          <h2>{t("concentrationArea.researchLines")}</h2>
          <div className="areas-grid">
            {RESEARCH_AREAS.map((area) => (
              <div key={area.id} className="area-card">
                <div className="area-header">
                  <span className="area-icon">{area.icon}</span>
                  <h3>{t(`researchArea.${area.id}.title`)}</h3>
                </div>
                <p className="area-short-description">{t(`researchArea.${area.id}.shortDescription`)}</p>
                <div className={`area-full-description ${expandedArea === area.id ? "expanded" : ""}`}>
                  {t(`researchArea.${area.id}.fullDescription`)
                    .split("\n\n")
                    .map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                </div>
                <button className="read-more-btn" onClick={() => toggleArea(area.id)}>
                  {expandedArea === area.id ? `${t("concentrationArea.readLess")}` : `${t("concentrationArea.readMore")}`}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-section">
          <h2>{t("concentrationArea.interest")}</h2>
          <p>
          {t("concentrationArea.interestText")}
          </p>
          <button className="contact-btn">{t("concentrationArea.contact")}</button>
        </div>
      </section>
    </div>
  )
}


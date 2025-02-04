import { useState, useEffect } from "react"
import "./Footer.css"

function Footer() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <footer className="footer">
      <div className="footer-div">
      <p>SIGAA | Superintendência de Tecnologia da Informação - STI/UFPI - (86) 3215-1124 | © UFRN</p>
      </div>
      <div className="footer-div">
      <p>Data e hora atual: {currentDateTime.toLocaleString()}</p>
      </div>
    </footer>
  )
}

export default Footer
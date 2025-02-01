import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { authService } from "../../services/authService"
import type { CreateAdminDto } from "../../types/auth"
import "./AuthForms.css"

const RegisterForm: React.FC = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<CreateAdminDto>({
    nome: "",
    email: "",
    senha: "",
    cargo: "",
    departamento: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await authService.register(formData)
      alert("Registro realizado com sucesso!")
      navigate("/login")
    } catch (error) {
      console.error("Erro ao registrar:", error)
      alert("Erro ao registrar. Por favor, tente novamente.")
    }
  }

  return (
    <div className="auth-form">
      <h2>Registro de Administrador</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="senha">Senha:</label>
          <input type="password" id="senha" name="senha" value={formData.senha} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="cargo">Cargo:</label>
          <input type="text" id="cargo" name="cargo" value={formData.cargo} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="departamento">Departamento:</label>
          <input
            type="text"
            id="departamento"
            name="departamento"
            value={formData.departamento}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  )
}

export default RegisterForm
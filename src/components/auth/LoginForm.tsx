import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { authService } from "../../services/authService"
import type { LoginAdminDto } from "../../types/auth"
import "./AuthForms.css"

const LoginForm: React.FC = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<LoginAdminDto>({
    email: "",
    senha: "",
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
      const token = await authService.login(formData)
      authService.setToken(token)
      alert("Login realizado com sucesso!")
      navigate("/")
    } catch (error) {
      console.error("Erro ao fazer login:", error)
      alert("Erro ao fazer login. Por favor, verifique suas credenciais e tente novamente.")
    }
  }

  return (
    <div className="auth-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="senha">Senha:</label>
          <input type="password" id="senha" name="senha" value={formData.senha} onChange={handleChange} required />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}

export default LoginForm
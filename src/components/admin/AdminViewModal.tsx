import type React from "react"
import type { AdminResponseDto } from "../../types/admin"
import "./AdminViewModal.css"

interface AdminViewModalProps {
  isOpen: boolean
  onClose: () => void
  admin: AdminResponseDto
}

const AdminViewModal: React.FC<AdminViewModalProps> = ({ isOpen, onClose, admin }) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Detalhes do Administrador</h2>
        <div className="admin-details">
          <p>
            <strong>Nome:</strong> {admin.nome}
          </p>
          <p>
            <strong>Email:</strong> {admin.email}
          </p>
          <p>
            <strong>Cargo:</strong> {admin.cargo}
          </p>
          <p>
            <strong>Departamento:</strong> {admin.departamento}
          </p>
          <p>
            <strong>Data de Criação:</strong> {new Date(admin.data_criacao).toLocaleDateString()}
          </p>
        </div>
        <div className="modal-buttons">
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  )
}

export default AdminViewModal
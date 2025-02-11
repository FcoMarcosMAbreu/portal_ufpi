"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { dissertacaoTeseService } from "../../services/dissertacaoTeseService"
import type { DissertacaoTeseDto } from "../../types/dissertacaoTese"
import DissertacaoTeseViewModal from "./DissertacaoTeseViewModal"
import "./DissertacaoTeseList.css"

const DissertacaoTeseList: React.FC = () => {
  const [dissertacoesTeses, setDissertacoesTeses] = useState<DissertacaoTeseDto[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedItem, setSelectedItem] = useState<DissertacaoTeseDto | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  useEffect(() => {
    fetchDissertacoesTeses()
  }, [])

  const fetchDissertacoesTeses = async () => {
    try {
      const data = await dissertacaoTeseService.getAll()
      setDissertacoesTeses(data)
    } catch (error) {
      console.error("Erro ao buscar dissertações e teses:", error)
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredDissertacoesTeses = dissertacoesTeses.filter(
    (item) =>
      item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nome_autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.orientador.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const openViewModal = (item: DissertacaoTeseDto) => {
    setSelectedItem(item)
    setIsViewModalOpen(true)
  }

  const closeViewModal = () => {
    setSelectedItem(null)
    setIsViewModalOpen(false)
  }

  return (
    <div className="dissertacao-tese-list">
      <h2>Lista de Dissertações e Teses</h2>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Pesquisar dissertações e teses..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Autor</th>
            <th>Título</th>
            <th>Orientador</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredDissertacoesTeses.map((item) => (
            <tr key={item.id}>
              <td>{item.nome_autor}</td>
              <td>{item.titulo}</td>
              <td>{item.orientador}</td>
              <td>{new Date(item.data).toLocaleDateString()}</td>
              <td>
                <button onClick={() => openViewModal(item)} className="btn-view">
                  Visualizar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isViewModalOpen && selectedItem && (
        <DissertacaoTeseViewModal isOpen={isViewModalOpen} onClose={closeViewModal} dissertacaoTese={selectedItem} />
      )}
    </div>
  )
}

export default DissertacaoTeseList


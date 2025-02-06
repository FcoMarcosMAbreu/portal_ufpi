import type React from "react"
import { useState, useEffect } from "react"
import { dissertacaoTeseService } from "../../services/dissertacaoTeseService"
import type { DissertacaoTeseDto } from "../../types/dissertacaoTese"
import "./DissertacaoTeseList.css"

const DissertacaoTeseList: React.FC = () => {
  const [dissertacoesTeses, setDissertacoesTeses] = useState<DissertacaoTeseDto[]>([])

  useEffect(() => {
    fetchDissertacoesTeses()
  }, [])

  // Função para buscar dissertações e teses
  const fetchDissertacoesTeses = async () => {
    try {
      const data = await dissertacaoTeseService.getAll()
      setDissertacoesTeses(data)
    } catch (error) {
      console.error("Erro ao buscar dissertações e teses:", error)
    }
  }

  // Função para excluir uma dissertação/tese
  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta dissertação/tese?")) {
      try {
        await dissertacaoTeseService.delete(id)
        fetchDissertacoesTeses() // Atualiza a lista após a exclusão
      } catch (error) {
        console.error("Erro ao excluir dissertação/tese:", error)
      }
    }
  }

  return (
    <div className="dissertacao-tese-list">
      <h2>Lista de Dissertações e Teses</h2>
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
          {dissertacoesTeses.map((dissertacaoTese) => (
            <tr key={dissertacaoTese.id}>
              <td>{dissertacaoTese.nome_autor}</td>
              <td>{dissertacaoTese.titulo}</td>
              <td>{dissertacaoTese.orientador}</td>
              <td>{new Date(dissertacaoTese.data).toLocaleDateString()}</td>
              <td>{/* Botão de exclusão removido da visualização pública */}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DissertacaoTeseList


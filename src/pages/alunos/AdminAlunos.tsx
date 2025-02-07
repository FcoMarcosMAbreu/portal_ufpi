import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { alunoService } from "../../services/alunoService";
import type { AlunoResponseDto } from "../../types/aluno";
import "./AdminAlunos.css";

const AdminAluno: React.FC = () => {
  const [alunos, setAlunos] = useState<AlunoResponseDto[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetchAlunos();
  }, []);

  const fetchAlunos = async () => {
    try {
      const data = await alunoService.getAll();
      setAlunos(data);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este aluno?")) {
      try {
        await alunoService.delete(id);
        fetchAlunos();
      } catch (error) {
        console.error("Erro ao excluir aluno:", error);
      }
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredAlunos = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-aluno">
      <h2>Lista de Alunos</h2>
      <div className="admin-aluno-actions">
        <div className="action-buttons">
          <Link to="/admin" className="btn-back">
            Voltar
          </Link>
          <Link to="/admin/alunos/create" className="btn-create">
            Criar Novo Aluno
          </Link>
        </div>
        <input
          type="text"
          placeholder="Pesquisar por nome..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Matrícula</th>
            <th>Curso</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredAlunos.map((aluno) => (
            <tr key={aluno.id}>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
              <td>{aluno.matricula}</td>
              <td>{aluno.curso}</td>
              <td>
                <Link to={`/admin/alunos/view/${aluno.id}`} className="btn-view">
                  Visualizar
                </Link>
                <Link to={`/admin/alunos/edit/${aluno.id}`} className="btn-edit">
                  Editar
                </Link>
                <button onClick={() => handleDelete(aluno.id)} className="btn-delete">
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAluno;
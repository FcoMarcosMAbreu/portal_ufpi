import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { alunoService } from "../../services/alunoService";
import type { CreateAlunoDto, UpdateAlunoDto } from "../../types/aluno";
import "./AlunoForm.css";

interface AlunoFormProps {
  isEditing: boolean;
}

const AlunoForm: React.FC<AlunoFormProps> = ({ isEditing }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CreateAlunoDto | UpdateAlunoDto>({
    nome: "",
    email: "",
    matricula: "",
    curso: "",
  });

  useEffect(() => {
    if (isEditing && id) {
      fetchAluno(parseInt(id));
    }
  }, [isEditing, id]);

  const fetchAluno = async (id: number) => {
    try {
      const aluno = await alunoService.getById(id);
      setFormData(aluno);
    } catch (error) {
      console.error("Erro ao buscar aluno:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && id) {
        await alunoService.update(parseInt(id), formData as UpdateAlunoDto);
      } else {
        await alunoService.create(formData as CreateAlunoDto);
      }
      navigate("/admin/alunos");
    } catch (error) {
      console.error("Erro ao salvar aluno:", error);
    }
  };

  return (
    <div className="aluno-form">
      <h2>{isEditing ? "Editar Aluno" : "Criar Novo Aluno"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Matrícula:</label>
          <input
            type="text"
            name="matricula"
            value={formData.matricula}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Curso:</label>
          <input
            type="text"
            name="curso"
            value={formData.curso}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn-submit">
          {isEditing ? "Atualizar" : "Criar"}
        </button>
        <button
          type="button"
          className="btn-cancel"
          onClick={() => navigate("/admin/alunos")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default AlunoForm;
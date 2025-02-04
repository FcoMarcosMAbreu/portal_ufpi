import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import AdminList from "./components/admin/AdminList"
import AdminForm from "./components/admin/AdminForm"
import AlunoList from "./components/aluno/AlunoList"
import AlunoForm from "./components/aluno/AlunoForm"
import NoticiaList from "./components/noticia/NoticiaList"
import NoticiaForm from "./components/noticia/NoticiaForm"
import ProfessorList from "./components/professor/ProfessorList"
import ProfessorForm from "./components/professor/ProfessorForm"
import CursoList from "./components/curso/CursoList"
import CursoForm from "./components/curso/CursoForm"
import DocumentoList from "./components/documento/DocumentoList"
import DocumentoForm from "./components/documento/DocumentoForm"
import GradeCurricularList from "./components/gradeCurricular/GradeCurricularList"
import GradeCurricularForm from "./components/gradeCurricular/GradeCurricularForm"
import TurmaList from "./components/turma/TurmaList"
import TurmaForm from "./components/turma/TurmaForm"
import DissertacaoTeseList from "./components/dissertacaoTese/DissertacaoTeseList"
import DissertacaoTeseForm from "./components/dissertacaoTese/DissertacaoTeseForm"
import CalendarioList from "./components/calendario/CalendarioList"
import CalendarioForm from "./components/calendario/CalendarioForm"
import ProcessoSeletivoList from "./components/processoSeletivo/ProcessoSeletivoList"
import ProcessoSeletivoForm from "./components/processoSeletivo/ProcessoSeletivoForm"
import RegisterForm from "./components/auth/RegisterForm"
import LoginForm from "./components/auth/LoginForm"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import ApresentacaoCursos from "./pages/apresentacaoCursos/ApresentacaoCursos"
import AreaConcentracao from "./pages/areaConcentracao/AreaConcentracao"
import GradeCurricular from "./pages/gradeCurricular/GradeCurricular"
import { TagDocumento } from "./types/documento"
import AdminDashboard from "./components/admin/AdminDashboard"
import ResourceManager from "./components/admin/ResourceManager"
import type { AdminResponseDto, CreateAdminDto, UpdateAdminDto } from "./types/admin"
import type { AlunoResponseDto, CreateAlunoDto, UpdateAlunoDto } from "./types/aluno"
import type { NoticiaDto, CreateNoticiaDto, UpdateNoticiaDto } from "./types/noticia"
import type { ProfessorResponseDto, CreateProfessorDto, UpdateProfessorDto } from "./types/professor"
import type { CursoResponseDto, CreateCursoDto, UpdateCursoDto } from "./types/curso"
import type { DocumentoResponseDto, CreateDocumentoDto, UpdateDocumentoDto } from "./types/documento"
import type { GradeCurricularDto, CreateGradeCurricularDto, UpdateGradeCurricularDto } from "./types/gradeCurricular"
import type { TurmaDto, CreateTurmaDto, UpdateTurmaDto } from "./types/turma"
import type { DissertacaoTeseDto, CreateDissertacaoTeseDto, UpdateDissertacaoTeseDto } from "./types/dissertacaoTese"
import type { CalendarioDto, CreateCalendarioDto, UpdateCalendarioDto } from "./types/calendario"
import type {
  ProcessoSeletivoDto,
  CreateProcessoSeletivoDto,
  UpdateProcessoSeletivoDto,
} from "./types/processoSeletivo"

// Import all service files here
import { adminService } from "./services/adminService"
import { alunoService } from "./services/alunoService"
import { noticiaService } from "./services/noticiaService"
import { professorService } from "./services/professorService"
import { cursoService } from "./services/cursoService"
import { documentoService } from "./services/documentoService"
import { gradeCurricularService } from "./services/gradeCurricularService"
import { turmaService } from "./services/turmaService"
import { dissertacaoTeseService } from "./services/dissertacaoTeseService"
import { calendarioService } from "./services/calendarioService"
import { processoSeletivoService } from "./services/processoSeletivoService"

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />}/>
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/programas/area-concentracao" element={<AreaConcentracao />} />
            <Route path="/programas/cursos" element={<ApresentacaoCursos />} />
            <Route path="/programas/grade-curricular" element={<GradeCurricular />} />
            <Route path="/ensino/alunos-ativos" element={<AlunoList />} />
            <Route path="/ensino/corpo-docente" element={<ProfessorList />} />
            <Route path="/ensino/cursos" element={<ApresentacaoCursos />} />
            <Route path="/ensino/teses-dissertacoes" element={<DissertacaoTeseList />} />
            <Route path="/ensino/turmas" element={<TurmaList />} />
            <Route path="/aluno/list" element={<AlunoList />} />
            <Route path="/noticia" element={<NoticiaList />} />
            <Route path="/professor/list" element={<ProfessorList />} />
            <Route path="/curso/list" element={<CursoList />} />
            <Route path="/documento/list" element={<DocumentoList tag={TagDocumento.FORMULARIO} title="Geral" />} />
            <Route
              path="/documentos/formularios"
              element={<DocumentoList tag={TagDocumento.FORMULARIO} title="Formulários" />}
            />
            <Route
              path="/documentos/resolucao"
              element={<DocumentoList tag={TagDocumento.RESOLUCAO} title="Resoluções" />}
            />
            <Route
              path="/documentos/regimento"
              element={<DocumentoList tag={TagDocumento.REGIMENTO} title="Regimentos" />}
            />
            <Route
              path="/documentos/material-didatico"
              element={<DocumentoList tag={TagDocumento.MATERIAL_DIDATICO} title="Material Didático" />}
            />
            <Route
              path="/documentos/outros"
              element={<DocumentoList tag={TagDocumento.OUTROS} title="Outros Documentos" />}
            />
            <Route path="/grade-curricular/list" element={<GradeCurricularList />} />
            <Route path="/turma/list" element={<TurmaList />} />
            <Route path="/dissertacao-tese/list" element={<DissertacaoTeseList />} />
            <Route path="/calendario" element={<CalendarioList />} />
            <Route path="/processo-seletivo" element={<ProcessoSeletivoList />} />

            {/* Protected Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/admins"
              element={
                <ProtectedRoute>
                  <ResourceManager<AdminResponseDto, CreateAdminDto, UpdateAdminDto>
                    resourceName="Administrador"
                    fetchResources={adminService.getAll}
                    createResource={adminService.create}
                    updateResource={adminService.update}
                    deleteResource={adminService.delete}
                    resourceFields={[
                      { name: "nome", label: "Nome", type: "text" },
                      { name: "email", label: "Email", type: "email" },
                      { name: "senha", label: "Senha", type: "password" },
                    ]}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/alunos"
              element={
                <ProtectedRoute>
                  <ResourceManager<AlunoResponseDto, CreateAlunoDto, UpdateAlunoDto>
                    resourceName="Aluno"
                    fetchResources={alunoService.getAll}
                    createResource={alunoService.create}
                    updateResource={alunoService.update}
                    deleteResource={alunoService.delete}
                    resourceFields={[
                      { name: "nome", label: "Nome", type: "text" },
                      { name: "email", label: "Email", type: "email" },
                      { name: "matricula", label: "Matrícula", type: "text" },
                    ]}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/noticias"
              element={
                <ProtectedRoute>
                  <ResourceManager<NoticiaDto, CreateNoticiaDto, UpdateNoticiaDto>
                    resourceName="Notícia"
                    fetchResources={noticiaService.getAll}
                    createResource={noticiaService.create}
                    updateResource={noticiaService.update}
                    deleteResource={noticiaService.delete}
                    resourceFields={[
                      { name: "titulo", label: "Título", type: "text" },
                      { name: "conteudo", label: "Conteúdo", type: "textarea" },
                    ]}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/professores"
              element={
                <ProtectedRoute>
                  <ResourceManager<ProfessorResponseDto, CreateProfessorDto, UpdateProfessorDto>
                    resourceName="Professor"
                    fetchResources={professorService.getAll}
                    createResource={professorService.create}
                    updateResource={professorService.update}
                    deleteResource={professorService.delete}
                    resourceFields={[
                      { name: "nome", label: "Nome", type: "text" },
                      { name: "email", label: "Email", type: "email" },
                      { name: "siape", label: "Siape", type: "text" },
                    ]}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/cursos"
              element={
                <ProtectedRoute>
                  <ResourceManager<CursoResponseDto, CreateCursoDto, UpdateCursoDto>
                    resourceName="Curso"
                    fetchResources={cursoService.getAll}
                    createResource={cursoService.create}
                    updateResource={cursoService.update}
                    deleteResource={cursoService.delete}
                    resourceFields={[
                      { name: "nome", label: "Nome", type: "text" },
                      { name: "sigla", label: "Sigla", type: "text" },
                    ]}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/documentos"
              element={
                <ProtectedRoute>
                  <ResourceManager<DocumentoResponseDto, CreateDocumentoDto, UpdateDocumentoDto>
                    resourceName="Documento"
                    fetchResources={documentoService.getAll}
                    createResource={documentoService.create}
                    updateResource={documentoService.update}
                    deleteResource={documentoService.delete}
                    resourceFields={[
                      { name: "titulo", label: "Título", type: "text" },
                      { name: "arquivo", label: "Arquivo", type: "file" },
                      {
                        name: "tag",
                        label: "Tag",
                        type: "select",
                        options: () => Promise.resolve(Object.values(TagDocumento)),
                      },
                    ]}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/grade-curricular"
              element={
                <ProtectedRoute>
                  <ResourceManager<GradeCurricularDto, CreateGradeCurricularDto, UpdateGradeCurricularDto>
                    resourceName="Grade Curricular"
                    fetchResources={gradeCurricularService.getAll}
                    createResource={gradeCurricularService.create}
                    updateResource={gradeCurricularService.update}
                    deleteResource={gradeCurricularService.delete}
                    resourceFields={[
                      { name: "cursoId", label: "Curso", type: "select", options: cursoService.getAll },
                      { name: "ano", label: "Ano", type: "number" },
                    ]}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/turmas"
              element={
                <ProtectedRoute>
                  <ResourceManager<TurmaDto, CreateTurmaDto, UpdateTurmaDto>
                    resourceName="Turma"
                    fetchResources={turmaService.getAll}
                    createResource={turmaService.create}
                    updateResource={turmaService.update}
                    deleteResource={turmaService.delete}
                    resourceFields={[
                      { name: "nome", label: "Nome", type: "text" },
                      { name: "cursoId", label: "Curso", type: "select", options: cursoService.getAll },
                      { name: "ano", label: "Ano", type: "number" },
                    ]}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dissertacoes-teses"
              element={
                <ProtectedRoute>
                  <ResourceManager<DissertacaoTeseDto, CreateDissertacaoTeseDto, UpdateDissertacaoTeseDto>
                    resourceName="Dissertação/Tese"
                    fetchResources={dissertacaoTeseService.getAll}
                    createResource={dissertacaoTeseService.create}
                    updateResource={dissertacaoTeseService.update}
                    deleteResource={dissertacaoTeseService.delete}
                    resourceFields={[
                      { name: "titulo", label: "Título", type: "text" },
                      { name: "autor", label: "Autor", type: "text" },
                      { name: "arquivo", label: "Arquivo", type: "file" },
                    ]}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/calendarios"
              element={
                <ProtectedRoute>
                  <ResourceManager<CalendarioDto, CreateCalendarioDto, UpdateCalendarioDto>
                    resourceName="Calendário"
                    fetchResources={calendarioService.getAll}
                    createResource={calendarioService.create}
                    updateResource={calendarioService.update}
                    deleteResource={calendarioService.delete}
                    resourceFields={[
                      { name: "titulo", label: "Título", type: "text" },
                      { name: "data", label: "Data", type: "date" },
                      { name: "descricao", label: "Descrição", type: "textarea" },
                    ]}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/processos-seletivos"
              element={
                <ProtectedRoute>
                  <ResourceManager<ProcessoSeletivoDto, CreateProcessoSeletivoDto, UpdateProcessoSeletivoDto>
                    resourceName="Processo Seletivo"
                    fetchResources={processoSeletivoService.getAll}
                    createResource={processoSeletivoService.create}
                    updateResource={processoSeletivoService.update}
                    deleteResource={processoSeletivoService.delete}
                    resourceFields={[
                      { name: "nome", label: "Nome", type: "text" },
                      { name: "dataInicio", label: "Data de Início", type: "date" },
                      { name: "dataFim", label: "Data de Fim", type: "date" },
                    ]}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/list"
              element={
                <ProtectedRoute>
                  <AdminList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/create"
              element={
                <ProtectedRoute>
                  <AdminForm isEditing={false} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/edit/:id"
              element={
                <ProtectedRoute>
                  <AdminForm isEditing={true} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/aluno/create"
              element={
                <ProtectedRoute>
                  <AlunoForm isEditing={false} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/aluno/edit/:id"
              element={
                <ProtectedRoute>
                  <AlunoForm isEditing={true} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/noticia/create"
              element={
                <ProtectedRoute>
                  <NoticiaForm isEditing={false} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/noticia/edit/:id"
              element={
                <ProtectedRoute>
                  <NoticiaForm isEditing={true} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/professor/create"
              element={
                <ProtectedRoute>
                  <ProfessorForm isEditing={false} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/professor/edit/:id"
              element={
                <ProtectedRoute>
                  <ProfessorForm isEditing={true} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/curso/create"
              element={
                <ProtectedRoute>
                  <CursoForm isEditing={false} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/curso/edit/:id"
              element={
                <ProtectedRoute>
                  <CursoForm isEditing={true} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/documento/create"
              element={
                <ProtectedRoute>
                  <DocumentoForm isEditing={false} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/documento/edit/:id"
              element={
                <ProtectedRoute>
                  <DocumentoForm isEditing={true} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/grade-curricular/create"
              element={
                <ProtectedRoute>
                  <GradeCurricularForm isEditing={false} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/grade-curricular/edit/:id"
              element={
                <ProtectedRoute>
                  <GradeCurricularForm isEditing={true} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/turma/create"
              element={
                <ProtectedRoute>
                  <TurmaForm isEditing={false} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/turma/edit/:id"
              element={
                <ProtectedRoute>
                  <TurmaForm isEditing={true} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dissertacao-tese/create"
              element={
                <ProtectedRoute>
                  <DissertacaoTeseForm isEditing={false} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dissertacao-tese/edit/:id"
              element={
                <ProtectedRoute>
                  <DissertacaoTeseForm isEditing={true} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/calendario/create"
              element={
                <ProtectedRoute>
                  <CalendarioForm isEditing={false} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/calendario/edit/:id"
              element={
                <ProtectedRoute>
                  <CalendarioForm isEditing={true} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/processo-seletivo/create"
              element={
                <ProtectedRoute>
                  <ProcessoSeletivoForm isEditing={false} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/processo-seletivo/edit/:id"
              element={
                <ProtectedRoute>
                  <ProcessoSeletivoForm isEditing={true} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
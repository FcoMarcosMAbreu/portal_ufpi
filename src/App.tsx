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
import "./App.css"

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
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
              path="/aluno/list"
              element={
                <ProtectedRoute>
                  <AlunoList />
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
              path="/noticia/list"
              element={
                <ProtectedRoute>
                  <NoticiaList />
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
              path="/professor/list"
              element={
                <ProtectedRoute>
                  <ProfessorList />
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
              path="/curso/list"
              element={
                <ProtectedRoute>
                  <CursoList />
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
              path="/documento/list"
              element={
                <ProtectedRoute>
                  <DocumentoList />
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
              path="/grade-curricular/list"
              element={
                <ProtectedRoute>
                  <GradeCurricularList />
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
              path="/turma/list"
              element={
                <ProtectedRoute>
                  <TurmaList />
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
              path="/dissertacao-tese/list"
              element={
                <ProtectedRoute>
                  <DissertacaoTeseList />
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
              path="/calendario/list"
              element={
                <ProtectedRoute>
                  <CalendarioList />
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
              path="/processo-seletivo/list"
              element={
                <ProtectedRoute>
                  <ProcessoSeletivoList />
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
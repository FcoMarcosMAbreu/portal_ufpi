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
import "./App.css"

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/list" element={<AdminList />} />
            <Route path="/admin/create" element={<AdminForm isEditing={false} />} />
            <Route path="/admin/edit/:id" element={<AdminForm isEditing={true} />} />
            <Route path="/aluno/list" element={<AlunoList />} />
            <Route path="/aluno/create" element={<AlunoForm isEditing={false} />} />
            <Route path="/aluno/edit/:id" element={<AlunoForm isEditing={true} />} />
            <Route path="/noticia/list" element={<NoticiaList />} />
            <Route path="/noticia/create" element={<NoticiaForm isEditing={false} />} />
            <Route path="/noticia/edit/:id" element={<NoticiaForm isEditing={true} />} />
            <Route path="/professor/list" element={<ProfessorList />} />
            <Route path="/professor/create" element={<ProfessorForm isEditing={false} />} />
            <Route path="/professor/edit/:id" element={<ProfessorForm isEditing={true} />} />
            <Route path="/curso/list" element={<CursoList />} />
            <Route path="/curso/create" element={<CursoForm isEditing={false} />} />
            <Route path="/curso/edit/:id" element={<CursoForm isEditing={true} />} />
            <Route path="/documento/list" element={<DocumentoList />} />
            <Route path="/documento/create" element={<DocumentoForm isEditing={false} />} />
            <Route path="/documento/edit/:id" element={<DocumentoForm isEditing={true} />} />
            <Route path="/grade-curricular/list" element={<GradeCurricularList />} />
            <Route path="/grade-curricular/create" element={<GradeCurricularForm isEditing={false} />} />
            <Route path="/grade-curricular/edit/:id" element={<GradeCurricularForm isEditing={true} />} />
            <Route path="/turma/list" element={<TurmaList />} />
            <Route path="/turma/create" element={<TurmaForm isEditing={false} />} />
            <Route path="/turma/edit/:id" element={<TurmaForm isEditing={true} />} />
            <Route path="/dissertacao-tese/list" element={<DissertacaoTeseList />} />
            <Route path="/dissertacao-tese/create" element={<DissertacaoTeseForm isEditing={false} />} />
            <Route path="/dissertacao-tese/edit/:id" element={<DissertacaoTeseForm isEditing={true} />} />
            <Route path="/calendario/list" element={<CalendarioList />} />
            <Route path="/calendario/create" element={<CalendarioForm isEditing={false} />} />
            <Route path="/calendario/edit/:id" element={<CalendarioForm isEditing={true} />} />
            <Route path="/processo-seletivo/list" element={<ProcessoSeletivoList />} />
            <Route path="/processo-seletivo/create" element={<ProcessoSeletivoForm isEditing={false} />} />
            <Route path="/processo-seletivo/edit/:id" element={<ProcessoSeletivoForm isEditing={true} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
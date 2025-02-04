export const mockNoticias = [
  {
    id: 1,
    titulo: "Processo seletivo para mestrado 2024",
    tag: "Informativo",
    conteudo: "Estão abertas as inscrições para o processo seletivo...",
    links_referencia: "https://example.com/edital",
    data_criacao: new Date("2024-01-15"),
  },
  {
    id: 2,
    titulo: "Seminário de Pesquisa em Computação",
    tag: "Evento",
    conteudo: "O departamento realizará um seminário...",
    links_referencia: "https://example.com/seminario",
    data_criacao: new Date("2024-01-10"),
  },
  // Add more mock news...
]

export const mockProfessores = [
  {
    id: 1,
    nome: "Dr. João Silva",
    matricula: "12345",
    email: "joao.silva@ufpi.edu.br",
    nivel: "DOUTORADO",
    telefone: "(86) 3215-1234",
    curriculo_lattes: "http://lattes.cnpq.br/1234567890",
    vinculo: "EFETIVO",
    data_criacao: new Date("2020-01-01"),
  },
  {
    id: 2,
    nome: "Dra. Maria Santos",
    matricula: "12346",
    email: "maria.santos@ufpi.edu.br",
    nivel: "DOUTORADO",
    telefone: "(86) 3215-1235",
    curriculo_lattes: "http://lattes.cnpq.br/0987654321",
    vinculo: "EFETIVO",
    data_criacao: new Date("2019-06-01"),
  },
  // Add more mock professors...
]

export const mockCursos = [
  {
    id: 1,
    nome: "Mestrado em Ciência da Computação",
    link_documento_capes: "https://example.com/capes/mestrado",
    link_detalhes_curso: "https://example.com/mestrado",
    data_criacao: new Date("2015-01-01"),
  },
  {
    id: 2,
    nome: "Doutorado em Ciência da Computação",
    link_documento_capes: "https://example.com/capes/doutorado",
    link_detalhes_curso: "https://example.com/doutorado",
    data_criacao: new Date("2018-01-01"),
  },
  // Add more mock courses...
]

export const mockDissertacoesTeses = [
  {
    id: 1,
    nome_autor: "Pedro Oliveira",
    titulo: "Análise de Algoritmos de Machine Learning em Big Data",
    orientador: "Dr. João Silva",
    data: "2023-12-15",
    resumo: "Esta dissertação apresenta uma análise comparativa...",
  },
  {
    id: 2,
    nome_autor: "Ana Costa",
    titulo: "Segurança em Redes IoT",
    orientador: "Dra. Maria Santos",
    data: "2023-11-20",
    resumo: "Este trabalho propõe uma nova arquitetura de segurança...",
  },
  // Add more mock dissertations/theses...
]

// Existing mock data...

export const mockAlunos = [
  {
    id: 1,
    nome: "Ana Silva",
    email: "ana.silva@aluno.ufpi.edu.br",
    matricula: "20210001",
    curso: "Mestrado em Ciência da Computação",
  },
  {
    id: 2,
    nome: "Carlos Oliveira",
    email: "carlos.oliveira@aluno.ufpi.edu.br",
    matricula: "20210002",
    curso: "Doutorado em Ciência da Computação",
  },
  {
    id: 3,
    nome: "Mariana Santos",
    email: "mariana.santos@aluno.ufpi.edu.br",
    matricula: "20210003",
    curso: "Mestrado em Ciência da Computação",
  },
  {
    id: 4,
    nome: "Rafael Costa",
    email: "rafael.costa@aluno.ufpi.edu.br",
    matricula: "20210004",
    curso: "Doutorado em Ciência da Computação",
  },
  {
    id: 5,
    nome: "Juliana Ferreira",
    email: "juliana.ferreira@aluno.ufpi.edu.br",
    matricula: "20210005",
    curso: "Mestrado em Ciência da Computação",
  },
]

export const mockDocumentos = [
  {
    id: 1,
    nome: "Formulário de Matrícula",
    tipo: "PDF",
    tag: "FORMULARIO",
    data_criacao: new Date("2023-01-15"),
  },
  {
    id: 2,
    nome: "Resolução 01/2023 - Normas do Programa",
    tipo: "PDF",
    tag: "RESOLUCAO",
    data_criacao: new Date("2023-02-01"),
  },
  {
    id: 3,
    nome: "Regimento Interno do Programa",
    tipo: "PDF",
    tag: "REGIMENTO",
    data_criacao: new Date("2023-01-10"),
  },
  {
    id: 4,
    nome: "Material Didático - Algoritmos Avançados",
    tipo: "PDF",
    tag: "MATERIAL_DIDATICO",
    data_criacao: new Date("2023-03-05"),
  },
  {
    id: 5,
    nome: "Calendário Acadêmico 2023",
    tipo: "PDF",
    tag: "OUTROS",
    data_criacao: new Date("2023-01-02"),
  },
]

export const mockGradeCurricular = [
  {
    id: 1,
    titulo: "Algoritmos Avançados",
    codigo: "CC001",
    componente_curricular: "Disciplina Obrigatória",
    carga_horaria: "60h",
    data_criacao: new Date("2023-01-01"),
  },
  {
    id: 2,
    titulo: "Inteligência Artificial",
    codigo: "CC002",
    componente_curricular: "Disciplina Obrigatória",
    carga_horaria: "60h",
    data_criacao: new Date("2023-01-01"),
  },
  {
    id: 3,
    titulo: "Redes de Computadores Avançadas",
    codigo: "CC003",
    componente_curricular: "Disciplina Optativa",
    carga_horaria: "45h",
    data_criacao: new Date("2023-01-01"),
  },
  {
    id: 4,
    titulo: "Computação em Nuvem",
    codigo: "CC004",
    componente_curricular: "Disciplina Optativa",
    carga_horaria: "45h",
    data_criacao: new Date("2023-01-01"),
  },
  {
    id: 5,
    titulo: "Seminários de Pesquisa",
    codigo: "CC005",
    componente_curricular: "Atividade Obrigatória",
    carga_horaria: "30h",
    data_criacao: new Date("2023-01-01"),
  },
]

export const mockTurmas = [
  {
    id: 1,
    materia: "Algoritmos Avançados",
    nome_turma: "Turma A",
    horarios: "Segunda e Quarta, 14h-16h",
    periodo_ano: "PRIMEIRO",
    docentes: "Dr. João Silva",
    data_criacao: new Date("2023-02-15"),
  },
  {
    id: 2,
    materia: "Inteligência Artificial",
    nome_turma: "Turma B",
    horarios: "Terça e Quinta, 10h-12h",
    periodo_ano: "PRIMEIRO",
    docentes: "Dra. Maria Santos",
    data_criacao: new Date("2023-02-15"),
  },
  {
    id: 3,
    materia: "Redes de Computadores Avançadas",
    nome_turma: "Turma C",
    horarios: "Quarta e Sexta, 8h-10h",
    periodo_ano: "SEGUNDO",
    docentes: "Dr. Carlos Oliveira",
    data_criacao: new Date("2023-07-15"),
  },
  {
    id: 4,
    materia: "Computação em Nuvem",
    nome_turma: "Turma D",
    horarios: "Segunda e Quinta, 16h-18h",
    periodo_ano: "SEGUNDO",
    docentes: "Dra. Ana Costa",
    data_criacao: new Date("2023-07-15"),
  },
]

export const mockCalendario = [
  {
    id: 1,
    titulo: "Início do Semestre Letivo",
    descricao: "Início das aulas para todos os alunos",
    data_inicio: "2024-03-01",
    data_termino: "2024-03-01",
    data_criacao: new Date("2023-12-01"),
  },
  {
    id: 2,
    titulo: "Período de Matrícula",
    descricao: "Prazo para matrícula em disciplinas",
    data_inicio: "2024-02-15",
    data_termino: "2024-02-25",
    data_criacao: new Date("2023-12-01"),
  },
  {
    id: 3,
    titulo: "Simpósio de Pesquisa",
    descricao: "Apresentação de trabalhos de pesquisa dos alunos",
    data_inicio: "2024-05-10",
    data_termino: "2024-05-12",
    data_criacao: new Date("2023-12-01"),
  },
  {
    id: 4,
    titulo: "Prazo para Entrega de Dissertações/Teses",
    descricao: "Data limite para entrega dos trabalhos finais",
    data_inicio: "2024-07-15",
    data_termino: "2024-07-15",
    data_criacao: new Date("2023-12-01"),
  },
  {
    id: 5,
    titulo: "Fim do Semestre Letivo",
    descricao: "Encerramento das aulas e atividades acadêmicas",
    data_inicio: "2024-07-31",
    data_termino: "2024-07-31",
    data_criacao: new Date("2023-12-01"),
  },
]

export const mockProcessosSeletivos = [
  {
    id: 1,
    titulo: "Processo Seletivo Mestrado 2024.1",
    descricao: "Seleção para o programa de Mestrado em Ciência da Computação",
    link_inscricao: "https://example.com/inscricao-mestrado-2024-1",
    data_criacao: new Date("2023-09-01"),
  },
  {
    id: 2,
    titulo: "Processo Seletivo Doutorado 2024.1",
    descricao: "Seleção para o programa de Doutorado em Ciência da Computação",
    link_inscricao: "https://example.com/inscricao-doutorado-2024-1",
    data_criacao: new Date("2023-09-01"),
  },
  {
    id: 3,
    titulo: "Seleção de Bolsistas PIBIC 2024",
    descricao: "Processo seletivo para bolsistas de iniciação científica",
    link_inscricao: "https://example.com/inscricao-pibic-2024",
    data_criacao: new Date("2023-11-15"),
  },
  {
    id: 4,
    titulo: "Chamada para Projetos de Pesquisa 2024",
    descricao: "Seleção de projetos de pesquisa para financiamento interno",
    link_inscricao: "https://example.com/projetos-pesquisa-2024",
    data_criacao: new Date("2023-10-01"),
  },
]
import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

// Import translations directly
const resources = {
  pt: {
    translation: {
      header: {
        home: "Início",
        programs: "Programas",
        presentation: "Apresentação",
        curriculum: "Grade Curricular",
        concentrationArea: "Área de Concentração",
        courses: "Cursos",
        teaching: "Ensino",
        activeStudents: "Alunos Ativos",
        faculty: "Corpo Docente",
        thesesDissertations: "Teses/Dissertações",
        classes: "Turmas",
        calendar: "Calendário",
        selectionProcesses: "Processos Seletivos",
        news: "Notícias",
        documents: "Documentos",
        forms: "Formulários",
        resolution: "Resolução",
        bylaws: "Regimento",
        others: "Outros",
        teachingMaterials: "Material Didático",
        adminDashboard: "Painel Administrativo",
        login: "Entrar",
      },
      home: {
        title: "Programa de Pós-Graduação em Zootecnia Tropical - CCA",
        subtitle: "Mestrado e Doutorado",
        description: "Formando Pesquisadores e Profissionais Especializados na área de Zootecnia",
        aboutProgram: "Sobre o Programa",
        aboutProgramText: "O Programa de Pós-Graduação em Zootecnia Tropical (PPGZT) da UFPI é um curso Stricto sensu vinculado ao Centro de Ciências Agrárias. Seu objetivo é formar docentes, pesquisadores e especialistas em Zootecnia, contribuindo para a produção pecuária sustentável e a melhoria da qualidade de vida no campo. Oferece Mestrado e Doutorado, promovendo a inserção de jovens doutores e acompanhando o impacto dos egressos na sociedade. Com abordagem internacional, suas pesquisas se concentram na Produção Animal, abrangendo Nutrição, Melhoramento Genético e Reprodução nos Trópicos. As atividades são organizadas em duas linhas de pesquisa: 1 - Produção de Alimentos e Nutrição Animal nos Trópicos e 2 - Genética, Melhoramento Genético e Reprodução Animal nos Trópicos.",
        aboutProgramLinkIg: "Acompanhe mais pelo Instagram ",
        aboutProgramLinkY2b: " e YouTube: ",
        coordinatorsTitle: "Coordenadores do Programa",
        coodinatorsLevel: "Nível",
        coordinatorsArea: "Área",
        coordinatorsEmail: "Email",
        coordinatorsPublications: "Publicações",
        coordinatorsCurriculum: "Currículo Lattes",
        professorsDoc: "Professores Doutores",
        alunosForms: "Alunos Formados",
        researchProj: "Projetos de Pesquisa",
        internationalPartners: "Parcerias Internacionais",
        institutionalPartners: "Parceiros Institucionais",
      },
      features: {
        1: {
          title: "Pesquisa Inovadora",
          description:
            "Desenvolvimento de projetos de pesquisa de ponta com impacto nacional e internacional em áreas estratégicas da computação.",
        },
        2: {
          title: "Corpo Docente Qualificado",
          description: "Professores doutores com formação em instituições renomadas e produção científica relevante.",
        },
        3: {
          title: "Infraestrutura Moderna",
          description:
            "Laboratórios equipados com tecnologia de ponta, biblioteca atualizada e espaços de estudo dedicados.",
        },
        4: {
          title: "Parcerias Internacionais",
          description:
            "Acordos de cooperação com universidades estrangeiras e participação em redes de pesquisa globais.",
        },
      },
      professors: {
        1: {
          name: "Dr. João Silva",
          level: "Professor Titular",
          email: "joao.silva@ufpi.edu.br",
          area: "Avicultura Tropical",
          curriculum: "http://lattes.cnpq.br/",
          publications: 45,
        },
        2: {
          name: "Dra. Maria Santos",
          level: "Professora Associada",
          email: "maria.santos@ufpi.edu.br",
          area: "Análise de Alimentos",
          curriculum: "http://lattes.cnpq.br/",
          publications: 38,
        },
      },
      partners: {
        1: {
          name: "CAPES",
          logo: "/capes-logo.png",
          description: "Coordenação de Aperfeiçoamento de Pessoal de Nível Superior",
        },
        2: {
          name: "CNPq",
          logo: "/cnpq-logo.png",
          description: "Conselho Nacional de Desenvolvimento Científico e Tecnológico",
        },
        3: {
          name: "FAPEPI",
          logo: "/fapepi-logo.png",
          description: "Fundação de Amparo à Pesquisa do Estado do Piauí",
        }
      },
      curriculum: {
        title: "Grade Curricular",
        structure: "Estrutura Curricular",
        structureText: "Nossa grade curricular é projetada para fornecer uma formação sólida e abrangente, combinando disciplinas obrigatórias fundamentais com optativas especializadas.",
        masterDisc: "Disciplinas de Mestrado",
        docDisc: "Disciplinas de Doutorado",
        interest: "Interessado em nosso programa?",
        interestText: "Entre em contato com a coordenação do programa para mais informações sobre a grade curricular e o processo seletivo.",
        contact: "Contate-nos",
        search: "Pesquisar disciplinas...",
        readMore: "Ler mais",
        readLess: "Ler menos",
        download: "Baixar Ementa",
        workload: "Carga Horária",
        syllabus: "Ementa",
        currComponent: "Componente Curricular",
      },
      concentrationArea: {
        title: "Áreas de Concentração",
        researchesTitle: "Pesquisas",
        researchesText: "O Programa oferece formação avançada em duas linhas de pesquisa principais, focando no desenvolvimento de soluções inovadoras para os desafios da produção animal em regiões tropicais.",
        researchLines: "Linhas de Pesquisa",
        interest: "Interessado em nosso programa?",
        interestText: 'Entre em contato com a coordenação do programa para mais informações sobre o processo seletivo e as linhas de pesquisa.',
        contact: "Contate-nos",
        readMore: "Ler mais",
        readLess: "Ler menos",
      },
      researchArea: {
        1: {
          title: "Genética, melhoramento genético e reprodução animal nos trópicos",
          shortDescription:
            "Aprimoramento genético de rebanhos e desenvolvimento de biotecnologias reprodutivas para espécies de interesse econômico.",
          fullDescription: 
            `A linha de pesquisa busca aprimorar geneticamente os rebanhos do Piauí, Meio-Norte e Nordeste do Brasil, promovendo a competitividade e a sustentabilidade das espécies de interesse econômico. Para isso, investiga metodologias de estimação genética, impacto da interação genótipo-ambiente, conservação de raças nativas e planos de cruzamento para otimizar a produção de proteína animal.
            O estudo também desenvolve programas computacionais para gestão de populações e controle zootécnico, além de modelos genéticos adaptados à realidade local. No campo da reprodução, explora o cultivo e comportamento de células germinativas, gametas e embriões, visando acelerar o melhoramento genético e consolidar biotécnicas reprodutivas.
            A pesquisa inclui técnicas como controle do ciclo estral, inseminação artificial, transferência e produção in vitro de embriões, diagnóstico precoce de gestação, clonagem e transgenia, ampliando índices produtivos e modernizando a criação animal em regiões tropicais.`,
          icon: "🧬",
        },
        2: {
          title: "Produção de alimentos e nutrição animal nos trópicos",
          shortDescription:
            "Pesquisa em produção e nutrição animal com foco em sustentabilidade e eficiência em regiões tropicais.",
          fullDescription: 
          `A pesquisa foca na produção de alimentos para ruminantes e não ruminantes em regiões tropicais, avaliando alimentos, aditivos, sistemas de alimentação, exigências nutricionais e qualidade dos produtos. Destaca o uso de plantas forrageiras nativas e adaptadas, além de fontes convencionais e alternativas, visando eficiência e conforto animal.
          Inclui estudos sobre manejo integrado, aspectos sanitários, genéticos e ambientais que influenciam a nutrição, bem como a análise da intensificação da pecuária, integração lavoura-pecuária e impacto ambiental.
          Também investiga a otimização do aproveitamento de matéria-prima, segurança alimentar, formulações inovadoras e boas práticas de fabricação, abordando perigos físicos, químicos e biológicos na produção de alimentos para consumo humano e animal.`,
          icon: "🌾",
        },
      },
      courses: {
        title: "Cursos",
        searchPlaceholder: "Pesquisar Cursos...",
        titleDoc: "PÓS-GRADUAÇÃO EM ZOOTECNIA TROPICAL - Doutorado",
        titleMest: "PÓS-GRADUAÇÃO EM ZOOTECNIA TROPICAL - Mestrado",
        noResults: "Nenhum curso encontrado para a pesquisa realizada.",
        capes: "Documento de reconhecimento e conceito da CAPES",
        details: "Detalhes do curso",    
      },
      students: {
        title: "Alunos Ativos",
        description: "Lista de alunos atualmente matriculados no programa",
        searchPlaceholder: "Pesquisar Alunos...",
        registration: "Matricula",
        email: "Email",
        course: "Curso",
      },
      professorList: {
        title: "Corpo Docente",
        description: "Conheça os professores do programa de pós-graduação",
        searchPlaceholder: "Pesquisar professores...",
        level: "Nível",
        email: "Email",
        phone: "Telefone",
        lattes: "Currículo Lattes"
      },
      theses: {
        title: "Dissertações e Teses",
        description: "Lista de dissertações e teses do programa",
        searchPlaceholder: "Pesquisar dissertações e teses...",
        author: "Autor",
        thesesTitle: "Título",
        advisor: "Orientador",
        date: "Data",
        actions: "Ações",
        seeMore: "Visualizar",
        details: "Detalhes da Dissertação/Tese",
        summarize: "Resumo",
        close: "Fechar"
      },
      classes: {
        title: "Turmas",
        description: "Lista de turmas disponíveis",
        searchPlaceholder: "Pesquisar turmas...",
        subject: "Matéria",
        schedules: "Horários",
        see: "Visualizar",
        details: "Detalhes da Turma",
        name: "Nome da Turma",
        period: "Período/Ano",
        teachers: "Docentes",
        dateCreate: "Data de Criação",
        close: "Fechar"
      },
      calendar: {
        title: "Calendário de Eventos",
        description: "Lista de eventos programados",
        placeholder: "Pesquisar eventos...",
        initialDate: "Data de Início",
        finalDate: "Data de Término",
        see: "Visualizar",
        details: "Detalhes do Evento do Calendário",
        detailTitle: "Título",
        detailDescription: "Descrição",
        creationDate: "Data de Criação",
        close: "Fechar"
      },
      selectionProcesses: {
        title: "Processos Seletivos",
        description: "Lista de processos seletivos em andamento",
        placeholder: "Pesquisar processos seletivos...",
        see: "Visualizar",
        details: "Detalhes do Processo Seletivo",
        detailsTitle: "Título",
        detailsDescription: "Descrição",
        detailsLink: "Link de Inscrição",
        creationDate: "Data de Criação",
        close: "Fechar",
      },
      news: {
        title: "Notícias",
        description: "Últimas notícias e informações",
        placeholder: "Pesquisar notícias...",
        tag: "Tag",
        creationDate: "Data de Criação",
        see: "Visualizar",
        details: "Detalhes da Notícia",
        detailsTitle: "Título",
        detailsContent: "Conteúdo",
        detailsLink: "Links de Referência",
        createDate: "Data de Criação",
        attach: "Documento Anexo",
        seeDoc: "Visualizar Documento",
        download: "Baixar Arquivo",
        close: "Fechar"
      },
      documentList: {
        description: "Lista de documentos - {{title}}",
        searchPlaceholder: "Pesquisar documentos...",
        type: "Tipo",
        creationDate: "Data de Criação",
        view: "Visualizar",
        details: "Detalhes do Documento",
        name: "Nome",
        typeDoc: "Tipo",
        tag: "Tag",
        tags: {
          FORMULARIO: "Formulários",
          RESOLUCAO: "Resoluções",
          REGIMENTO: "Regimentos",
          MATERIAL_DIDATICO: "Material Didático",
          OUTROS: "Outros Documentos",
        },
        createDate: "Data de Criação",
        download: "Download",
        downloadFile: "Baixar arquivo",
        close: "Fechar",
      },
      documentTypes: {
        PDF: "PDF",
        DOCX: "Word",
        XLS: "Excel",
        JPG: "Imagem JPEG",
        PNG: "Imagem PNG",
      },
      errors: {
        fetchDocuments: "Erro ao buscar documentos:",
      },
    },
  },
  en: {
    translation: {
      header: {
        home: "Home",
        programs: "Programs",
        presentation: "Presentation",
        curriculum: "Curriculum",
        concentrationArea: "Concentration Area",
        courses: "Courses",
        teaching: "Teaching",
        activeStudents: "Active Students",
        faculty: "Faculty",
        thesesDissertations: "Theses/Dissertations",
        classes: "Classes",
        calendar: "Calendar",
        selectionProcesses: "Selection Processes",
        news: "News",
        documents: "Documents",
        forms: "Forms",
        resolution: "Resolution",
        bylaws: "Bylaws",
        others: "Others",
        teachingMaterials: "Teaching Materials",
        adminDashboard: "Admin Dashboard",
        login: "Login",
      },
      home: {
        title: "Graduate Program in Tropical Animal Science - CCA",
        subtitle: "Master's and Doctorate",
        description: "Training Researchers and Specialized Professionals in the Field of Animal Science",
        aboutProgram: "About the Program",
        aboutProgramText: `The Graduate Program in Tropical Animal Science (PPGZT) at UFPI is a Stricto Sensu course linked to the Center for Agricultural Sciences. Its objective is to train professors, researchers, and specialists in Animal Science, contributing to sustainable livestock production and improving the quality of life in rural areas. It offers Master's and Doctorate degrees, promoting the integration of young PhDs and monitoring the impact of graduates on society. With an international approach, its research focuses on Animal Production, covering Nutrition, Genetic Improvement, and Reproduction in the Tropics. Activities are organized into two research lines: 1 - Food Production and Animal Nutrition in the Tropics and 2 - Genetics, Genetic Improvement, and Animal Reproduction in the Tropics.`,
        aboutProgramLinkIg: "Follow more on Instagram: ",
        aboutProgramLinkY2b: " and YouTube: ",
        coordinatorsTitle: "Program Coordinators",
        coodinatorsLevel: "Level",
        coordinatorsArea: "Area",
        coordinatorsEmail: "Email",
        coordinatorsPublications: "Publications",
        coordinatorsCurriculum: "Lattes Curriculum",
        professorsDoc: "PhD Professors",
        alunosForms: "Graduated Students",
        researchProj: "Research Projects",
        internationalPartners: "International Partnerships",
        institutionalPartners: "Institutional Partners",
      },
      features: {
        1: {
          title: "Innovative Research",
          description:
            "Development of cutting-edge research projects with national and international impact in strategic areas of computing.",
        },
        2: {
          title: "Qualified Faculty",
          description: "PhD professors trained at renowned institutions with relevant scientific production.",
        },
        3: {
          title: "Modern Infrastructure",
          description:
            "Laboratories equipped with cutting-edge technology, updated library and dedicated study spaces.",
        },
        /*
        4: {
          title: "International Partnerships",
          description:
            "Cooperation agreements with foreign universities and participation in global research networks.",
        },*/
      },
      professors: {
        1: {
          name: "Dr. João Silva",
          level: "Full Professor",
          email: "joao.silva@ufpi.edu.br",
          area: "Tropical Poultry Farming",
          curriculum: "http://lattes.cnpq.br/",
          publications: 45
        },
        2: {
          name: "Dr. Maria Santos",
          level: "Associate Professor",
          email: "maria.santos@ufpi.edu.br",
          area: "Food Analysis",
          curriculum: "http://lattes.cnpq.br/",
          publications: 38
        },
      },
      partners: {
        1: {
          name: "CAPES",
          logo: "/capes-logo.png",
          description: "Coordination for the Improvement of Higher Education Personnel",
        },
        2: {
          name: "CNPq",
          logo: "/cnpq-logo.png",
          description: "National Council for Scientific and Technological Development",
        },
        3: {
          name: "FAPEPI",
          logo: "/fapepi-logo.png",
          description: "Foundation for the Support of Research in the State of Piauí",
        }
      },
      curriculum: {
        title: "Curriculum",
        structure: "Curricular Structure",
        structureText: "Our curriculum is designed to provide a solid and comprehensive education, combining fundamental mandatory courses with specialized electives.",
        masterDisc: "Master’s Courses",
        docDisc: "Doctorate Courses",
        interest: "Interested in our program?",
        interestText: "Contact the program coordination for more information about the curriculum and the selection process.",
        contact: "Contact Us",
        search: "Search subjects...",
        readMore: "Read more",
        readLess: "Read Less",
        download: "Download Syllabus",
        workload: "Workloud",
        syllabus: "Syllabus",
        currComponent: "Curricular Component",
      },
      concentrationArea: {
        title: "Concentration Areas",
        researchesTitle: "Research",
        researchesText: "The program offers advanced training in two main research lines, focusing on the development of innovative solutions for the challenges of animal production in tropical regions.",
        researchLines: "Research Lines",
        interest: "Interested in our program?",
        interestText: "Contact the program coordination for more information about the selection process and research lines.",
        contact: "Contact Us",
        readMore: "Read more",
        readLess: "Read Less",
      },
      researchArea: {
        1: {
        title: "Genetics, Genetic Improvement, and Animal Reproduction in the Tropics",
        shortDescription: "Genetic enhancement of livestock and development of reproductive biotechnologies for economically significant species.",
        fullDescription: 
          "This research line aims to genetically improve livestock in Piauí, Meio-Norte, and Northeast Brazil, promoting the competitiveness and sustainability of economically significant species. To achieve this, it investigates genetic estimation methodologies, the impact of genotype-environment interaction, conservation of native breeds, and crossbreeding plans to optimize animal protein production.\n\nThe study also develops computational programs for population management and zootechnical control, along with genetic models adapted to local conditions. In the field of reproduction, it explores the cultivation and behavior of germ cells, gametes, and embryos, aiming to accelerate genetic improvement and consolidate reproductive biotechnologies.\n\nResearch includes techniques such as estrous cycle control, artificial insemination, embryo transfer and in vitro production, early pregnancy diagnosis, cloning, and transgenics, enhancing productivity and modernizing animal breeding in tropical regions.",
        },
        2: {
          title: "Food Production and Animal Nutrition in the Tropics",
          shortDescription: "Research on animal production and nutrition with a focus on sustainability and efficiency in tropical regions.",
          fullDescription: 
            "This research focuses on food production for ruminants and non-ruminants in tropical regions, evaluating food sources, additives, feeding systems, nutritional requirements, and product quality. It highlights the use of native and adapted forage plants, as well as conventional and alternative sources, aiming for efficiency and animal welfare.\n\nIt includes studies on integrated management, sanitary, genetic, and environmental aspects influencing nutrition, as well as the analysis of livestock intensification, crop-livestock integration, and environmental impact.\n\nAdditionally, it investigates the optimization of raw material utilization, food safety, innovative formulations, and best manufacturing practices, addressing physical, chemical, and biological hazards in food production for both human and animal consumption.",
        }
      },
      courses: {
        title: "Courses",
        searchPlaceholder: "Search Courses...",
        titleDoc: "POSTGRADUATE PROGRAM IN TROPICAL ANIMAL SCIENCE - Ph.D.",
        titleMest: "POSTGRADUATE PROGRAM IN TROPICAL ANIMAL SCIENCE - Master's",
        noResults: "No courses found for the search performed.",
        capes: "Recognition document and CAPES rating",
        details: "Course details",
      },
      students: {
        title: "Active Students",
        description: "List of students currently enrolled in the program",
        searchPlaceholder: "Search Students...",
        registration: "Registration",
        email: "Email",
        course: "Course"
      },
      professorList: {
        title: "Faculty",
        description: "Meet the professors of the graduate program",
        searchPlaceholder: "Search professors...",
        level: "Level",
        email: "Email",
        phone: "Phone",
        lattes: "Lattes Curriculum"
      },
      theses: {
        title: "Dissertations and Theses",
        description: "List of dissertations and theses from the program",
        searchPlaceholder: "Search dissertations and theses...",
        author: "Author",
        thesesTitle: "Title",
        advisor: "Advisor",
        date: "Date",
        actions: "Actions",
        seeMore: "View",
        details: "Dissertation/Thesis Details",
        summarize: "Summary",
        close: "Close",
      },
      classes: {
        title: "Classes",
        description: "List of available classes",
        searchPlaceholder: "Search classes...",
        subject: "Subject",
        schedules: "Schedules",
        see: "View",
        details: "Class Details",
        name: "Class Name",
        period: "Period/Year",
        teachers: "Teachers",
        dateCreate: "Creation Date",
        close: "Close"
      },
      calendar: {
        title: "Event Calendar",
        description: "List of scheduled events",
        placeholder: "Search events...",
        initialDate: "Start Date",
        finalDate: "End Date",
        see: "View",
        details: "Calendar Event Details",
        detailTitle: "Title",
        detailDescription: "Description",
        creationDate: "Creation Date",
        close: "Close"
      },
      selectionProcesses: {
        title: "Selection Processes",
        description: "List of ongoing selection processes",
        placeholder: "Search selection processes...",
        see: "View",
        details: "Selection Process Details",
        detailsTitle: "Title",
        detailsDescription: "Description",
        detailsLink: "Registration Link",
        creationDate: "Creation Date",
        close: "Close"
      },
      news: {
        title: "News",
        description: "Latest news and information",
        placeholder: "Search news...",
        tag: "Tag",
        creationDate: "Creation Date",
        see: "View",
        details: "News Details",
        detailsTitle: "Title",
        detailsContent: "Content",
        detailsLink: "Reference Links",
        createDate: "Creation Date",
        attach: "Attached Document",
        seeDoc: "View Document",
        download: "Download File",
        close: "Close"
      },
      documentList: {
        description: "Document list - {{title}}",
        searchPlaceholder: "Search documents...",
        type: "Type",
        creationDate: "Creation Date",
        view: "View",
        details: "Document Details",
        name: "Name",
        typeDoc: "Type",
        tag: "Tag",
        tags: {
          FORMULARIO: "Forms",
          RESOLUCAO: "Resolutions",
          REGIMENTO: "Bylaws",
          MATERIAL_DIDATICO: "Teaching Materials",
          OUTROS: "Other Documents",
        },
        createDate: "Creation Date",
        download: "Download",
        downloadFile: "Download file",
        close: "Close"
      },
      documentTypes: {
        PDF: "PDF",
        DOCX: "Word",
        XLS: "Excel",
        JPG: "JPEG Image",
        PNG: "PNG Image",
      },
      errors: {
        fetchDocuments: "Error fetching documents:",
      },
    },
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "pt",
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n


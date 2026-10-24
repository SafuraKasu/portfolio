/*
 * SITE CONTENT: the one file to edit for text, links, and media.
 *
 * - Everything here is rendered by js/app.js. Nothing in the animation code holds copy.
 * - Entries with `published: false` are kept here but never shown. Flip to true once approved.
 * - Media: add files to a folder of your choice (e.g. media/), then list them in an entry's
 *   `media` array:  { src: "media/murshid-demo.mp4", alt: "What the image shows", caption: "Optional" }
 *   Supported: images, .mp4/.webm video, .pdf (shown as a link). `alt` is required for images.
 *   Entries with no `media` show nothing, so no empty frames appear on the live site.
 * - Layout preview: open index.html?slots to see dashed placeholders for each entry's
 *   `plannedMedia` list (what you intend to add). Never shown without ?slots.
 * - This file is public once deployed. Keep private notes in .private/ instead.
 */
window.SITE_CONTENT = {
  meta: {
    name: "Safura Kasu",
    siteTitle: "Safura Kasu | Portfolio",
    description: "Safura Kasu is a Data Science & AI undergraduate at UDST working on machine learning research, projects, teaching, and technical writing.",
    footer: "QUANTUM_STATE: |ψ⟩ = α|0⟩ + β|1⟩ | REALITY.VERSION: 2026.10"
  },

  // Page headings keep the original retro "filename" style.
  pages: {
    home:     { nav: "Home",     title: "Home" },
    research: { nav: "Research", title: "RESEARCH.QPY",  intro: "Research I have taken part in, and what I am still learning." },
    projects: { nav: "Projects", title: "PROJECTS.QSM",  intro: "Things I built to learn, to teach, or to see whether an idea holds up." },
    writing:  { nav: "Writing",  title: "WRITING.MD",    intro: "I write about machine learning concepts because explaining them exposes the gaps in my own understanding and pushes me to build stronger intuition." },
    about:    { nav: "About",    title: "ABOUT.EXE" },
    contact:  { nav: "Contact",  title: "CONTACT.NET" }
  },

  hero: {
    name: "SAFURA KASU",
    // DRAFT: headline option B from the brief. Option A: "Understanding intelligent systems. Building things that matter."
    headline: "Learning how intelligent systems work, from the inside out.",
    meta: "BSc Data Science & AI · University of Doha for Science and Technology (UDST) · Expected 2028",
    // DRAFT copy: rewrite in your own voice.
    intro: [
      "Hi, I'm Safura. I'm a Data Science & AI undergraduate interested in how machine learning systems learn, adapt, and behave. My work has taken me from continual model merging research to applied language-model projects, and I enjoy following technical questions from theory into implementation.",
      "Outside research, I teach programming, build projects that help me learn, and write about the concepts I want to understand more deeply."
    ],
    // Optional personal element for the homepage, e.g. { src: "media/me.jpg", alt: "...", caption: "..." }
    media: [],
    plannedMedia: ["One candid photo or a technical visual (optional)"]
  },

  /* ---------------- Research ---------------- */
  research: [
    {
      id: "continual-model-merging",
      published: true,
      featured: true,
      title: "Continual Model Merging",
      org: "Qatar Computing Research Institute (QCRI)",
      role: "AI Research Intern",
      period: "May – July 2026",
      status: "Internship completed",
      blurb: "Parameter-space merging in a continual-learning setting: combining models adapted across tasks while retaining prior capabilities.",
      summary: [
        "During a research internship at Qatar Computing Research Institute (QCRI), I worked on parameter-space merging methods in a continual-learning setting, investigating how models adapted across tasks might be combined while retaining prior capabilities. The work involved implementing and comparing methods, examining benchmark results, and engaging with mathematical ideas behind parameter interpolation and optimization."
      ],
      tags: ["Continual learning", "Model merging"],
      // Technical details (methods, models, datasets) are withheld until approved.
      details: [],
      links: [],
      media: [],
      plannedMedia: ["Approved poster (photo or PDF)", "Methodology diagram", "Vetted result plots", "Presentation photo"]
    },
    {
      id: "llm-clinical-referral-triaging",
      published: true,
      featured: true,
      title: "LLM-Based Clinical Referral Triaging",
      org: "",
      role: "",
      period: "2025 – present",
      status: "Ongoing · collaborative research",
      blurb: "Exploring how language models can support clinical referral triaging, and how to make their outputs useful, interpretable, and properly validated.",
      summary: [
        "I am involved in collaborative research exploring language models for clinical referral triaging, including comparing prompting strategies and evaluating the outputs. The project raises practical questions about how to make model outputs useful, interpretable, and appropriately validated in high-stakes contexts."
      ],
      note: "Research in progress. This is not a deployed or clinically validated system.",
      tags: ["Language models", "Evaluation", "Healthcare"],
      links: [],
      media: [],
      plannedMedia: ["Approved pipeline diagram (no patient or partner information)"]
    }
  ],

  // A current learning interest, not a project. Shown as a short note on the Research page.
  researchInterests: "Currently learning: mechanistic interpretability, i.e. understanding what is actually going on inside trained models.",

  /* ---------------- Projects ---------------- */
  projects: [
    {
      id: "murshid",
      published: true,
      featured: true,
      title: "Murshid",
      kind: "Team project",
      status: "",
      blurb: "A bilingual desktop AI assistant for on-screen help, translation, and content tasks.",
      summary: [
        "A bilingual desktop AI assistant built with an Electron application and Fanar-powered workflows for on-screen assistance, translation, and content-related tasks."
      ],
      tags: ["Electron", "Fanar"],
      links: [{ label: "Repository", href: "https://github.com/SafuraKasu/fanar-murshid" }],
      media: [],
      plannedMedia: ["Screen recording", "Screenshots of representative workflows", "Architecture diagram"]
    },
    {
      id: "tiryaq-birthguide",
      published: true,
      featured: true,
      title: "Tiryaq BirthGuide",
      kind: "Team project",
      status: "Prototype",
      blurb: "An emergency childbirth guidance prototype exploring accessible voice and visual interaction.",
      summary: [
        "An emergency childbirth guidance prototype exploring accessible voice and visual interactions in difficult circumstances."
      ],
      note: "A prototype for exploration. It is not clinically validated and not a substitute for medical care.",
      tags: [],
      links: [{ label: "Repository", href: "https://github.com/ruusbrews/tiryaq-birthguide" }],
      media: [],
      plannedMedia: ["Application screenshots", "Short demo", "Team / event photo (if permitted)"]
    },
    {
      id: "quantum-gates-playground",
      published: true,
      featured: true,
      title: "Quantum Gates Playground",
      kind: "Independent educational project",
      status: "",
      blurb: "A single-qubit teaching tool linking quantum gates to state vectors, circuit diagrams, and the Bloch sphere.",
      summary: [
        "A single-qubit teaching tool that connects common quantum gates to state-vector calculations, circuit diagrams, and Bloch-sphere visualizations."
      ],
      scope: "Scope: single qubit, basis-state input, one chosen gate per interaction. It is not a general multi-qubit circuit builder.",
      tags: ["Quantum computing", "Visualization", "Education"],
      links: [{ label: "Repository", href: "https://github.com/SafuraKasu/quantum_gates_playground" }],
      media: [],
      plannedMedia: ["Demo GIF (assets/demo.gif in the repository)", "Screenshot (assets/image.png in the repository)"]
    },

    /* Reserved for future updates. Not shown until published: true. */
    { id: "imagegpt", published: false, title: "ImageGPT", kind: "Learning project", status: "In progress",
      summary: ["Handwritten PyTorch implementation of an autoregressive image model. No completed generation demo yet."], tags: ["PyTorch"], links: [], media: [] },
    { id: "satellitewatch", published: false, title: "SatelliteWatch", kind: "Project", status: "In progress",
      summary: [], tags: [], links: [], media: [] },
    { id: "data-mining-code-patterns", published: false, title: "Human vs. AI-written Python code", kind: "Applied Data Mining project", status: "Ongoing",
      summary: ["Analysis of structural and stylistic patterns in human- and AI-generated Python code. No results to claim yet."], tags: [], links: [], media: [] },
    { id: "csv-anomaly-detector", published: false, title: "CSV Anomaly Detector", kind: "Early prototype", status: "",
      summary: ["Streamlit app for flagging outliers and missing data in CSV files."], tags: ["Streamlit", "Python", "Pandas"], links: [], media: [] },
    { id: "zenith", published: false, title: "Project Zenith", kind: "Hackathon prototype", status: "Unfinished",
      summary: [], tags: [], links: [], media: [] }
  ],

  /* ---------------- Writing ---------------- */
  writing: {
    platform: "Medium",
    profileUrl: "https://medium.com/@safurakasu",
    // Add ONLY published pieces:
    // { title: "", date: "", description: "", url: "", featured: true, media: [{ src: "", alt: "" }] }
    articles: [],
    emptyNote: "My articles live on Medium.",
    plannedMedia: ["Article cover images"]
  },

  /* ---------------- About ---------------- */
  about: {
    // DRAFT: first-person themes from the brief; rewrite in your own words.
    paragraphs: [
      "I'm an undergraduate studying Data Science and Artificial Intelligence at the University of Doha for Science and Technology (UDST), expected to graduate in 2028.",
      "I like understanding why systems behave the way they do, not just using them. That curiosity pulls me toward machine learning research, mathematical and geometric intuition, and the work of turning technical ideas into things that run.",
      "I learn by building, experimenting, asking questions, and explaining what I've learned, which is why I teach programming as a teaching assistant and write about machine learning concepts. I'm also interested in how technical work can be useful beyond demonstrations."
    ],
    education: [
      { org: "University of Doha for Science and Technology (UDST)", detail: "BSc Data Science and Artificial Intelligence", period: "2024 – 2028 (expected)" }
    ],
    experience: [
      { org: "University of Doha for Science and Technology (UDST)", role: "Teaching Assistant", period: "January 2026 – present",
        detail: "Supporting undergraduate programming and related computing courses." },
      { org: "Qatar Computing Research Institute (QCRI)", role: "AI Research Intern", period: "May – July 2026",
        detail: "Research on continual model merging. See the Research page." }
    ],
    // Compact selection, not a logo wall.
    skills: ["Python", "Java", "JavaScript", "SQL", "PyTorch", "scikit-learn"],
    // Hackathons / recognition. Add entries only once confirmed.
    achievements: [],
    // Optional photos: { src, alt, caption }. Only with consent.
    media: [],
    plannedMedia: ["Hackathon / research / workshop photos with captions (optional, with consent)"]
  },

  /* ---------------- Contact ---------------- */
  contact: {
    tagline: "Ready to collapse the wavefunction of collaboration?",
    // Split so the address is not sitting in the page source as a plain string.
    email: { user: "safurakasu", domain: "gmail.com" },
    location: "Doha, Qatar",
    links: [
      { label: "GitHub",   href: "https://github.com/SafuraKasu" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/safura-kasu/" },
      { label: "Medium",   href: "https://medium.com/@safurakasu" }
    ]
  }
};

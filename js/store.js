/* ==========================================================================
   PIB Jaguapitã - Central Data Store & Content Management System
   ========================================================================== */

const DEFAULT_SETTINGS = {
  phone: "(43) 3272-1234",
  whatsapp: "(43) 99999-1234",
  email: "contato@pibjaguapita.org.br",
  address: "R. Goiás, 160 - Centro, Jaguapitã - PR, 86610-000",
  mapsUrl: "https://maps.google.com/maps?q=Rua+Goi%C3%A1s,+160,+Jaguapit%C3%A3+-+PR",
  mapsEmbedUrl: "https://maps.google.com/maps?q=Rua+Goi%C3%A1s,+160,+Jaguapit%C3%A3+-+PR&t=&z=16&ie=UTF8&iwloc=&output=embed",
  pixKey: "financeiro@pibjaguapita.org.br",
  bankName: "Banco do Brasil (001)",
  bankAgency: "1234-5",
  bankAccount: "98765-4",
  bankFavored: "Primeira Igreja Batista de Jaguapitã",
  instagramUrl: "https://instagram.com",
  facebookUrl: "https://facebook.com",
  youtubeUrl: "https://youtube.com"
};

const DEFAULT_BLOG_POSTS = [
  {
    id: "1",
    title: "Como crescer na vida de oração",
    category: "devocional",
    categoryLabel: "DEVOCIONAL",
    date: "12 AGO 2026",
    image: "./assets/blog_oracao.jpg",
    summary: "Descubra disciplinas práticas para desenvolver uma vida de intimidade diária com Deus.",
    content: "A oração é a respiração da alma cristã. Quando oramos, não estamos tentando mudar a vontade de Deus para alinhá-la aos nossos desejos, mas alinhando nosso coração à perfeita vontade do Pai. Para desenvolver uma vida de oração consistente: 1. Separe um horário fixo e um lugar tranquilo todos os dias. 2. Use a Palavra de Deus como guia para suas petições. 3. Cultive momentos de silêncio para ouvir a voz do Espírito Santo. 4. Seja honesto e transparente diante de Deus."
  },
  {
    id: "2",
    title: "A esperança da ressurreição",
    category: "estudo",
    categoryLabel: "ESTUDO BÍBLICO",
    date: "05 AGO 2026",
    image: "./assets/blog_ressurreicao.jpg",
    summary: "Como a vitória de Cristo sobre a morte transforma nossas dores e dá sentido ao presente.",
    content: "A ressurreição de Jesus Cristo é a pedra angular da fé cristã. Como o apóstolo Paulo escreveu aos Coríntios, se Cristo não ressuscitou, a nossa pregação é inútil e a nossa fé é vã. No entanto, porque Ele vive, temos uma esperança viva que ultrapassa as dores do tempo presente. A ressurreição nos garante o perdão dos nossos pecados, o triunfo final sobre o mal e a certeza de que a morte não tem a última palavra."
  },
  {
    id: "3",
    title: "Cultivando um lar cristão saudável",
    category: "familia",
    categoryLabel: "FAMÍLIA",
    date: "28 JUL 2026",
    image: "./assets/blog_familia.jpg",
    summary: "Princípios bíblicos essenciais para edificar um lar abençoado, guiado pela oração e pelo amor cristão.",
    content: "O lar é o primeiro campo missionário de todo cristão. É no ambiente familiar que nosso caráter e fé são testados e fortalecidos diariamente. Um lar centrado em Cristo é edificado sobre o altar da oração diária, a leitura conjunta das Escrituras, o perdão recíproco e a honra mútua entre pais e filhos."
  },
  {
    id: "4",
    title: "O que significa seguir a Cristo?",
    category: "discipulado",
    categoryLabel: "DISCIPULADO",
    date: "18 JUL 2026",
    image: "./assets/hero_church_worship.jpg",
    summary: "Reflexões bíblicas sobre o custo e a alegria de uma caminhada fiel com o Senhor.",
    content: "Jesus disse: 'Se alguém quiser vir após mim, renuncie-se a si mesmo, tome sobre si a sua cruz e siga-me.' Seguir a Cristo vai muito além de frequentar reuniões de domingo; significa render totalmente nossos planos, ambições e vontade ao Seu Senhorio soberano."
  },
  {
    id: "5",
    title: "O significado do Batismo nas águas",
    category: "estudo",
    categoryLabel: "ESTUDO BÍBLICO",
    date: "10 JUL 2026",
    image: "./assets/Fotos/Templo/527572079_17863841322442439_6892293775101133619_n.jpg",
    summary: "Entenda o simbolismo bíblico da profissão pública de fé e da nova vida em Cristo Jesus.",
    content: "O batismo nas águas é uma ordem de Nosso Senhor Jesus Cristo e um ato de obediência pública. Ele simboliza nossa morte para o pecado e o mundo, e a nossa ressurreição para uma nova vida purificada com Cristo."
  },
  {
    id: "6",
    title: "Firmeza em tempos de incerteza",
    category: "devocional",
    categoryLabel: "DEVOCIONAL",
    date: "02 JUL 2026",
    image: "./assets/pastor_nilson.jpg",
    summary: "Como a soberania imutável de Deus guarda nosso coração e nossa mente em meio às tempestades.",
    content: "Em um mundo marcado por constantes mudanças e incertezas econômicas e sociais, a Bíblia nos lembra que Deus é nossa rocha inabalável. Quando colocamos nossa confiança no Senhor, recebemos a paz que excede todo o entendimento."
  }
];

class PIBDataStore {
  constructor() {
    this.STORAGE_KEY_SETTINGS = "pib_site_settings_v1";
    this.STORAGE_KEY_BLOG = "pib_blog_posts_v1";
    this.STORAGE_KEY_AUTH = "pib_admin_session";
    this.init();
  }

  init() {
    if (!localStorage.getItem(this.STORAGE_KEY_SETTINGS)) {
      localStorage.setItem(this.STORAGE_KEY_SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
    }
    if (!localStorage.getItem(this.STORAGE_KEY_BLOG)) {
      localStorage.setItem(this.STORAGE_KEY_BLOG, JSON.stringify(DEFAULT_BLOG_POSTS));
    }
  }

  /* Settings Read/Write */
  getSettings() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY_SETTINGS);
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch (e) {
      return DEFAULT_SETTINGS;
    }
  }

  saveSettings(newSettings) {
    const current = this.getSettings();
    const updated = { ...current, ...newSettings };
    localStorage.setItem(this.STORAGE_KEY_SETTINGS, JSON.stringify(updated));
    return updated;
  }

  /* Blog Posts Read/Write (CRUD) */
  getBlogPosts() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY_BLOG);
      return saved ? JSON.parse(saved) : DEFAULT_BLOG_POSTS;
    } catch (e) {
      return DEFAULT_BLOG_POSTS;
    }
  }

  getBlogPostById(id) {
    const posts = this.getBlogPosts();
    return posts.find(p => p.id === String(id));
  }

  addBlogPost(postData) {
    const posts = this.getBlogPosts();
    const newId = String(Date.now());
    const newPost = {
      id: newId,
      title: postData.title || "Novo Artigo",
      category: postData.category || "devocional",
      categoryLabel: (postData.category || "devocional").toUpperCase(),
      date: postData.date || new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase(),
      image: postData.image || "./assets/blog_oracao.jpg",
      summary: postData.summary || "",
      content: postData.content || ""
    };
    posts.unshift(newPost);
    localStorage.setItem(this.STORAGE_KEY_BLOG, JSON.stringify(posts));
    return newPost;
  }

  updateBlogPost(id, postData) {
    const posts = this.getBlogPosts();
    const index = posts.findIndex(p => p.id === String(id));
    if (index !== -1) {
      posts[index] = {
        ...posts[index],
        ...postData,
        categoryLabel: (postData.category || posts[index].category).toUpperCase()
      };
      localStorage.setItem(this.STORAGE_KEY_BLOG, JSON.stringify(posts));
      return posts[index];
    }
    return null;
  }

  deleteBlogPost(id) {
    let posts = this.getBlogPosts();
    posts = posts.filter(p => p.id !== String(id));
    localStorage.setItem(this.STORAGE_KEY_BLOG, JSON.stringify(posts));
    return true;
  }

  /* Auth Session */
  isAuthenticated() {
    return localStorage.getItem(this.STORAGE_KEY_AUTH) === "true";
  }

  login(user, pass) {
    if (user === "admin" && pass === "pib123") {
      localStorage.setItem(this.STORAGE_KEY_AUTH, "true");
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.STORAGE_KEY_AUTH);
  }
}

// Export singleton instance globally
window.PIBStore = new PIBDataStore();

/* ==========================================================================
   Primeira Igreja Batista de Jaguapitã - JavaScript App Core
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initVisitModal();
  initPixCopy();
  initBlogFilter();
  initContactForm();
});

/* ==========================================================================
   1. Mobile Navigation Menu
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const closeBtn = document.querySelector('.drawer-close');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.drawer-overlay');

  if (!toggleBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);
}

/* ==========================================================================
   2. "Planeje sua Visita" Modal
   ========================================================================== */
function initVisitModal() {
  const visitButtons = document.querySelectorAll('.btn-visit, [data-modal="visit"]');
  const modal = document.getElementById('visit-modal');
  
  if (!modal) return;

  const closeBtn = modal.querySelector('.modal-close-btn');

  visitButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  const form = modal.querySelector('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal();
      showToast('Agradecemos pelo seu interesse! Em breve nossa equipe entrará em contato com você.');
      form.reset();
    });
  }
}

/* ==========================================================================
   3. Copy PIX Key with Toast Notification
   ========================================================================== */
function initPixCopy() {
  const copyBtn = document.getElementById('btn-copy-pix');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const pixKey = 'financeiro@pibjaguapita.org.br';
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(pixKey).then(() => {
        showToast('Chave PIX copiada para a área de transferência!');
      }).catch(() => {
        fallbackCopyTextToClipboard(pixKey);
      });
    } else {
      fallbackCopyTextToClipboard(pixKey);
    }
  });
}

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast('Chave PIX copiada para a área de transferência!');
  } catch (err) {
    showToast('Chave: financeiro@pibjaguapita.org.br');
  }
  document.body.removeChild(textArea);
}

/* ==========================================================================
   4. Toast Notification System
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B8862E" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      <span class="toast-text"></span>
    `;
    document.body.appendChild(toast);
  }

  toast.querySelector('.toast-text').textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* ==========================================================================
   5. Blog Filter & Search
   ========================================================================== */
function initBlogFilter() {
  const searchInput = document.getElementById('blog-search-input');
  const categorySelect = document.getElementById('blog-category-select');
  const postCards = document.querySelectorAll('.blog-post-card');

  if (!postCards.length) return;

  function filterPosts() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const category = categorySelect ? categorySelect.value.toLowerCase() : 'all';

    postCards.forEach(card => {
      const title = card.querySelector('.blog-card-title').textContent.toLowerCase();
      const cardCategory = card.dataset.category ? card.dataset.category.toLowerCase() : '';
      
      const matchesSearch = title.includes(query);
      const matchesCategory = (category === 'all' || cardCategory === category);

      if (matchesSearch && matchesCategory) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (searchInput) searchInput.addEventListener('input', filterPosts);
  if (categorySelect) categorySelect.addEventListener('change', filterPosts);

  // Article Reader Modal
  const articleModal = document.getElementById('article-modal');
  if (articleModal) {
    const articleLinks = document.querySelectorAll('.read-article-link');
    articleLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const card = link.closest('.blog-post-card');
        const title = card.querySelector('.blog-card-title').textContent;
        const date = card.querySelector('.blog-card-date').textContent;
        const cat = card.querySelector('.blog-card-badge').textContent;

        articleModal.querySelector('.article-modal-title').textContent = title;
        articleModal.querySelector('.article-modal-date').textContent = `${date} • ${cat}`;
        
        articleModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeBtn = articleModal.querySelector('.modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        articleModal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  }
}

/* ==========================================================================
   6. Contact Form Validation
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Sua mensagem/pedido de oração foi enviado com sucesso! Que Deus abençoe você.');
    contactForm.reset();
  });
}

/* ==========================================================================
   PIB Jaguapitã - Application Logic & Dynamic Site Hydration Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize dynamic site content hydration
  initSiteHydration();

  // Mobile Navigation Drawer Toggle
  initMobileDrawer();

  // Modal Handlers
  initModals();

  // PIX Clipboard Handler
  initPixClipboard();

  // Contact Form Submission Handler
  initContactForm();

  // Blog Search and Filter Handler
  initBlogFilters();
});

/* ==========================================================================
   1. Dynamic Site Hydration Engine
   ========================================================================== */
function initSiteHydration() {
  if (!window.PIBStore) return;
  const settings = window.PIBStore.getSettings();

  // 1. Social Links
  document.querySelectorAll('a.social-icon[aria-label="Instagram"]').forEach(el => {
    if (settings.instagramUrl) el.href = settings.instagramUrl;
  });
  document.querySelectorAll('a.social-icon[aria-label="Facebook"]').forEach(el => {
    if (settings.facebookUrl) el.href = settings.facebookUrl;
  });
  document.querySelectorAll('a.social-icon[aria-label="YouTube"]').forEach(el => {
    if (settings.youtubeUrl) el.href = settings.youtubeUrl;
  });

  // 2. Telefone & WhatsApp
  document.querySelectorAll('[data-bind="phone"]').forEach(el => {
    el.textContent = settings.phone;
  });
  document.querySelectorAll('[data-bind="whatsapp"]').forEach(el => {
    el.textContent = settings.whatsapp;
    if (el.tagName === 'A') {
      const cleanNum = settings.whatsapp.replace(/\D/g, '');
      el.href = `https://wa.me/55${cleanNum}`;
    }
  });

  // 3. E-mail
  document.querySelectorAll('[data-bind="email"]').forEach(el => {
    el.textContent = settings.email;
    if (el.tagName === 'A') el.href = `mailto:${settings.email}`;
  });

  // 4. Endereço
  document.querySelectorAll('[data-bind="address"]').forEach(el => {
    el.innerHTML = settings.address.replace(/,\s*/g, '<br>');
  });

  // 5. Dados de Dízimo / PIX
  document.querySelectorAll('[data-bind="pixKey"]').forEach(el => {
    el.textContent = settings.pixKey;
  });
  document.querySelectorAll('[data-bind="bankName"]').forEach(el => {
    el.textContent = settings.bankName;
  });
  document.querySelectorAll('[data-bind="bankAgency"]').forEach(el => {
    el.textContent = settings.bankAgency;
  });
  document.querySelectorAll('[data-bind="bankAccount"]').forEach(el => {
    el.textContent = settings.bankAccount;
  });
  document.querySelectorAll('[data-bind="bankFavored"]').forEach(el => {
    el.textContent = settings.bankFavored;
  });

  // 6. Mapa do Google
  document.querySelectorAll('iframe[title="Mapa PIB Jaguapitã"]').forEach(iframe => {
    if (settings.mapsEmbedUrl) iframe.src = settings.mapsEmbedUrl;
  });
  document.querySelectorAll('a[href*="maps.google.com"]').forEach(link => {
    if (settings.mapsUrl) link.href = settings.mapsUrl;
  });

  // 7. Dynamic Blog Posts Grid Rendering
  renderDynamicBlogPosts();
}

function renderDynamicBlogPosts() {
  const blogGrid = document.getElementById('blog-posts-grid');
  if (!blogGrid || !window.PIBStore) return;

  const posts = window.PIBStore.getBlogPosts();
  if (!posts || posts.length === 0) {
    blogGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--color-text-muted);">Nenhum artigo publicado no momento.</div>`;
    return;
  }

  blogGrid.innerHTML = posts.map(post => `
    <article class="feature-card blog-post-card" data-category="${post.category}" style="padding: 0; overflow: hidden; background: #fff;">
      <a href="artigo?id=${post.id}">
        <img src="${post.image}" alt="${post.title}" style="width: 100%; height: 210px; object-fit: cover;">
      </a>
      <div style="padding: 28px;">
        <div style="font-size: 11.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-gold); font-weight: 700;">${post.date} • ${(post.categoryLabel || post.category).toUpperCase()}</div>
        <h2 style="font-family: var(--font-heading); font-size: 21px; font-weight: 600; margin-top: 10px; color: var(--color-text-main);">
          <a href="artigo?id=${post.id}" style="color: var(--color-text-main); text-decoration: none;">${post.title}</a>
        </h2>
        <p style="font-size: 14.5px; color: var(--color-text-body); margin-top: 10px; line-height: 1.6;">${post.summary}</p>
        <a href="artigo?id=${post.id}" style="display: inline-block; font-size: 14px; font-weight: 700; color: var(--color-primary); margin-top: 20px; text-decoration: none;">Ler artigo completo →</a>
      </div>
    </article>
  `).join('');
}

/* ==========================================================================
   2. Mobile Drawer Navigation
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const closeBtn = document.querySelector('.drawer-close');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.drawer-overlay');

  if (!toggleBtn || !drawer || !overlay) return;

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);
}

/* ==========================================================================
   3. Modal System (Visit)
   ========================================================================== */
function initModals() {
  const visitModal = document.getElementById('visit-modal');
  const visitTriggers = document.querySelectorAll('[data-modal="visit"]');

  if (visitModal && visitTriggers.length > 0) {
    visitTriggers.forEach(btn => {
      btn.addEventListener('click', () => {
        visitModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeBtn = visitModal.querySelector('.modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        visitModal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    visitModal.addEventListener('click', (e) => {
      if (e.target === visitModal) {
        visitModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    const form = visitModal.querySelector('form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        visitModal.classList.remove('active');
        document.body.style.overflow = '';
        showToast('✓ Sua visita foi agendada! Estamos ansiosos para receber você.');
        form.reset();
      });
    }
  }
}

/* ==========================================================================
   4. PIX Clipboard Handler
   ========================================================================== */
function initPixClipboard() {
  const btnCopy = document.getElementById('btn-copy-pix');
  if (!btnCopy) return;

  btnCopy.addEventListener('click', () => {
    const pixKeyEl = document.querySelector('[data-bind="pixKey"]');
    const key = pixKeyEl ? pixKeyEl.textContent.trim() : (window.PIBStore ? window.PIBStore.getSettings().pixKey : 'financeiro@pibjaguapita.org.br');
    
    navigator.clipboard.writeText(key).then(() => {
      showToast('✓ Chave PIX copiada para a área de transferência!');
    }).catch(() => {
      showToast('✓ Chave PIX: ' + key);
    });
  });
}

/* ==========================================================================
   5. Contact Form Handler
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('✓ Sua mensagem foi enviada com sucesso! Em breve entraremos em contato.');
    form.reset();
  });
}

/* ==========================================================================
   6. Blog Search & Filtering
   ========================================================================== */
function initBlogFilters() {
  const searchInput = document.getElementById('blog-search');
  const categorySelect = document.getElementById('blog-category');

  if (!searchInput && !categorySelect) return;

  function filterPosts() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedCat = categorySelect ? categorySelect.value : 'todos';

    const cards = document.querySelectorAll('.blog-post-card');
    cards.forEach(card => {
      const cat = card.getAttribute('data-category');
      const text = card.textContent.toLowerCase();

      const matchCat = (selectedCat === 'todos' || cat === selectedCat);
      const matchQuery = (!query || text.includes(query));

      if (matchCat && matchQuery) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (searchInput) searchInput.addEventListener('input', filterPosts);
  if (categorySelect) categorySelect.addEventListener('change', filterPosts);
}

/* ==========================================================================
   Toast Notification Utility
   ========================================================================== */
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

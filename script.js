(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');

  if (toggle && nav && header) {
    toggle.addEventListener('click', () => {
      const open = header.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    nav.addEventListener('click', (e) => {
      if (e.target instanceof HTMLAnchorElement) {
        header.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
    );

    document
      .querySelectorAll(
        '.section-head, .service, .trial-step, .tile, blockquote, .faq-list details, .about-copy, .approach-art, .book-copy, .book-form, .visit-grid > *'
      )
      .forEach((el) => {
        el.classList.add('reveal');
        observer.observe(el);
      });
  }

  const form = document.querySelector('.book-form');
  const status = form?.querySelector('.form-status');
  if (form && status) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      status.classList.remove('is-error', 'is-success');

      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const email = String(data.get('email') || '').trim();
      const weddingDate = String(data.get('weddingDate') || '').trim();

      if (!name || !email || !weddingDate) {
        status.textContent = 'Please share your name, email, and wedding date so I can check availability.';
        status.classList.add('is-error');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.textContent = 'That email address doesn’t look quite right.';
        status.classList.add('is-error');
        return;
      }
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const picked = new Date(weddingDate);
      if (Number.isNaN(picked.getTime()) || picked < today) {
        status.textContent = 'Please pick a wedding date in the future.';
        status.classList.add('is-error');
        return;
      }

      status.textContent = 'Thank you — I’ll reply within one business day, usually sooner.';
      status.classList.add('is-success');
      form.reset();
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();

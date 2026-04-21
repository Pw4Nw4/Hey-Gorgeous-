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
      .querySelectorAll('.section-head, .service, blockquote, .about-copy, .about-art, .book-copy, .book-form, .visit-grid > *')
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
      const service = String(data.get('service') || '').trim();

      if (!name || !email || !service) {
        status.textContent = 'Please fill in your name, email, and the service you want.';
        status.classList.add('is-error');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.textContent = 'That email address doesn’t look quite right.';
        status.classList.add('is-error');
        return;
      }

      status.textContent = 'Thanks! We’ll confirm your appointment within one business day.';
      status.classList.add('is-success');
      form.reset();
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();

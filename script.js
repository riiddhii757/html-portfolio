const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.getElementById('nav-links');
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

themeToggle.addEventListener('click', () => {
  const light = root.dataset.theme === 'light';
  root.dataset.theme = light ? 'dark' : 'light';
  themeToggle.textContent = light ? '☀' : '☾';
  themeToggle.setAttribute('aria-label', light ? 'Switch to light theme' : 'Switch to dark theme');
  localStorage.setItem('portfolio-theme', root.dataset.theme);
});

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light' || savedTheme === 'dark') {
  root.dataset.theme = savedTheme;
  themeToggle.textContent = savedTheme === 'light' ? '☾' : '☀';
}

mobileMenu.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  mobileMenu.setAttribute('aria-expanded', String(open));
  mobileMenu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    mobileMenu.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

document.getElementById('year').textContent = new Date().getFullYear();

form.addEventListener('submit', event => {
  event.preventDefault();
  status.textContent = '';

  if (!form.checkValidity()) {
    form.reportValidity();
    status.textContent = 'Please complete the required fields correctly.';
    return;
  }

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

  status.textContent = 'Opening your email client…';
  window.location.href = `mailto:riddhiithakkar515@gmail.com?subject=${subject}&body=${body}`;
});

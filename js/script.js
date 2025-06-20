document.addEventListener('DOMContentLoaded', function () {
  // 1. Nav toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  // 2. Active link highlighting
  const links = document.querySelectorAll('.nav-menu a');
  const currentPath = window.location.pathname.split('/').pop(); // e.g., "skills.html" or "" for index
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (
      (href === currentPath) ||
      (href === 'index.html' && (currentPath === '' || currentPath === 'index.html'))
    ) {
      link.classList.add('active');
    }
  });
});

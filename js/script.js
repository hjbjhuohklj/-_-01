const themeToggleBtn = document.getElementById('theme-toggle');
const rootElement = document.documentElement;

function updateButtonLabel(theme) {
  themeToggleBtn.textContent = theme === 'dark' ? '☀️ Светлая тема' : '🌙 Тёмная тема';
  themeToggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему');
}

function applyTheme(theme) {
  rootElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateButtonLabel(theme);
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  applyTheme(savedTheme);
} else {
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(systemPrefersDark ? 'dark' : 'light');
}

themeToggleBtn.addEventListener('click', () => {
  const currentTheme = rootElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    applyTheme(e.matches ? 'dark' : 'light');
  }
});

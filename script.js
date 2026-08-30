const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); toggle?.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = new Date().getFullYear();

document.querySelectorAll('.guide-trigger').forEach(trigger => trigger.addEventListener('click', () => {
  document.getElementById(`${trigger.dataset.guide}-guide`)?.showModal();
}));
document.querySelectorAll('.guide-dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
  dialog.querySelector('a[href="#contact"]')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
});

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('.filter').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-pressed', 'false');
    });
    button.classList.add('active');
    button.setAttribute('aria-pressed', 'true');
    const selected = button.dataset.filter;
    document.querySelectorAll('.product-card').forEach((card) => {
      const visible = selected === 'todos' || card.dataset.category.split(' ').includes(selected);
      card.classList.toggle('is-hidden', !visible);
    });
  });
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

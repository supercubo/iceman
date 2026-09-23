const model = new URLSearchParams(location.search).get('modelo');
const product = window.ICEMAN_CATALOG.products.find((item) => item.id === model) || window.ICEMAN_CATALOG.products[0];
const mainImage = document.querySelector('#main-image');
document.title = 'ICEMAN';
document.querySelector('#breadcrumb-model').textContent = product.name;
document.querySelector('#product-label').textContent = product.label;
document.querySelector('#product-name').textContent = product.name;
document.querySelector('#product-description').textContent = product.description;
document.querySelector('#detail-list').innerHTML = product.details.map((detail) => `<li>${detail}</li>`).join('');
document.querySelector('#color-block').hidden = product.colors.length <= 1;
document.querySelector('#color-list').innerHTML = product.colors.map((color, index) => `<button class="color-item${index === 0 ? ' active' : ''}" type="button" data-image="${color.image || product.images[index] || product.images[0]}" aria-label="Ver ${product.name} na cor ${color.name}"><i style="background:${color.hex}"></i>${color.name}</button>`).join('');
document.querySelector('#ml-link').href = product.ml;
document.querySelector('#shopee-link').href = product.shopee;
mainImage.src = product.images[0]; mainImage.alt = `${product.name} — foto principal`;
document.querySelector('#gallery-thumbs').innerHTML = product.images.map((image, index) => `<button class="gallery-thumb${index === 0 ? ' active' : ''}" type="button" data-image="${image}" aria-label="Ver foto ${index + 1} de ${product.name}"><img src="${image}" alt=""></button>`).join('');
document.querySelectorAll('.gallery-thumb').forEach((button, index) => button.addEventListener('click', () => { mainImage.src = button.dataset.image; mainImage.alt = `${product.name} — foto ${index + 1}`; document.querySelectorAll('.gallery-thumb').forEach((item) => item.classList.remove('active')); button.classList.add('active'); }));
const selectColor = (button) => {
  mainImage.src = button.dataset.image;
  mainImage.alt = `${product.name} — ${button.textContent.trim()}`;
  document.querySelectorAll('.color-item').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
};
document.querySelectorAll('.color-item').forEach((button) => {
  button.addEventListener('mouseenter', () => selectColor(button));
  button.addEventListener('focus', () => selectColor(button));
  button.addEventListener('click', () => selectColor(button));
});

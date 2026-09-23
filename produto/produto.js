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
document.querySelector('#color-list').innerHTML = product.colors.map((color, index) => `<button class="color-item" type="button" data-image="${color.image || product.images[index] || product.images[0]}" aria-label="Ver ${product.name} na cor ${color.name}"><i style="background:${color.hex}"></i>${color.name}</button>`).join('');
document.querySelector('#ml-link').href = product.ml;
document.querySelector('#shopee-link').href = product.shopee;
mainImage.src = product.images[0]; mainImage.alt = `${product.name} — foto principal`;
document.querySelector('#gallery-thumbs').innerHTML = product.images.map((image, index) => `<button class="gallery-thumb${index === 0 ? ' active' : ''}" type="button" data-image="${image}" aria-label="Ver foto ${index + 1} de ${product.name}"><img src="${image}" alt=""></button>`).join('');
const thumbnails = [...document.querySelectorAll('.gallery-thumb')];
const colorButtons = [...document.querySelectorAll('.color-item')];
const showImage = (image, fallbackAlt) => {
  const selectedColor = colorButtons.find((button) => button.dataset.image === image);
  const selectedThumbnail = thumbnails.find((button) => button.dataset.image === image);
  mainImage.src = image;
  mainImage.alt = selectedColor ? `${product.name} — ${selectedColor.textContent.trim()}` : fallbackAlt;
  colorButtons.forEach((button) => {
    const active = button === selectedColor;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  thumbnails.forEach((button) => {
    const active = button === selectedThumbnail;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
};
thumbnails.forEach((button, index) => button.addEventListener('click', () => showImage(button.dataset.image, `${product.name} — foto ${index + 1}`)));
colorButtons.forEach((button) => button.addEventListener('click', () => showImage(button.dataset.image, `${product.name} — ${button.textContent.trim()}`)));
showImage(product.images[0], `${product.name} — foto principal`);

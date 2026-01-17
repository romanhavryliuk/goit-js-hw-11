import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

                                                //Створюю екземпляр бібліотеки SimpleLightbox для галереї з класом .gallery
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader-container');

                                                // Функція для рендерингу зображень у галерею
export function createGallery(images) {
    const markup = images.map(img =>
    `<li class="gallery-item">
        <a class="gallery-link" href="${img.largeImageURL}">
            <img class="gallery-image" src="${img.webformatURL}" alt="${img.tags}" />
        </a>
        <div class="info">
        <div class="info-item"><b>Likes</b><span>${img.likes}</span></div>
        <div class="info-item"><b>Views</b><span>${img.views}</span></div>
        <div class="info-item"><b>Comments</b><span>${img.comments}</span></div>
        <div class="info-item"><b>Downloads</b><span>${img.downloads}</span></div>
        </div>
</li>`)
        .join('');
    galleryContainer.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();                         // Оновлюю SimpleLightbox після додавання нових зображень
}

                                                // Функція для очищення галереї
export function clearGallery() {
    galleryContainer.innerHTML = '';
}   
                                                // Функція для показу лоадера
export const showLoader = () => loader.classList.remove('is-hidden');
export const hideLoader = () => loader.classList.add('is-hidden');
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
                                                    // Функція для показу повідомлень користувачу
import { getImagesByQuery } from "./js/pixabay-api";
import { createGallery, clearGallery, showLoader, hideLoader } from "./js/render-functions";

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
    event.preventDefault();                         // Відміняю стандартну поведінку форми

    const query = event.target.elements['search-text'].value.trim(); // Отримую значення пошукового запиту і обрізаю пробіли

    if (query === '') {                             // Якщо запит порожній, показую повідомлення і виходжу з функції   
        iziToast.error({ message: "Please enter search query.", });
        return;
    }
    clearGallery();                                 // Очищую галерею перед новим пошуком
    showLoader();                                   // Показую лоадер під час завантаження зображень

    getImagesByQuery(query)                         // Виконую пошук зображень за запитом
        .then(data => {
            if (data.hits.length === 0) {           // Якщо зображення не знайдені, показую повідомлення
                iziToast.error({ message: "Sorry, there are no images matching your search query. Please try again!", });
                return;
            }
            createGallery(data.hits);               // Рендерю знайдені зображення у галерею
        })
        .catch(error => {                           // Обробляю помилки під час запиту
            iziToast.error({ message: 'Something went wrong!', });
        })
        .finally(() => {
            hideLoader();                           // Ховаю лоадер після завершення запиту
            form.reset();                           // Скидаю форму після пошуку
        });
});
import axios from 'axios';

export function getImagesByQuery(query) {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '54246352-35184811c7b33f51a38e3c8ed';       // Kлюч API

                                                                // Створюю обєкт з налаштуваннями запиту
    const searchParams = {
        params: {
            key: API_KEY,
            q: query,                                           // Пошуковий запит
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: 9,                                        // Кількість зображень на сторінку
        },
    };
    
                                                                // Виконую GET-запит до Pixabay API з використанням axios
    return axios.get(BASE_URL, searchParams)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching images:', error);
            throw error;
        });

}
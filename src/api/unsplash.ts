import axios from 'axios';

const ACCESS_KEY = 'YOUR_UNSPLASH_ACCESS_KEY'; 

const unsplashApi = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
});

export const fetchRandomPhotos = (count = 8) => {
  return unsplashApi.get('/photos/random', {
    params: { count },
  });
};

export const searchPhotos = (query: string, page = 1, perPage = 12) => {
  return unsplashApi.get('/search/photos', {
    params: { query, page, per_page: perPage },
  });
};

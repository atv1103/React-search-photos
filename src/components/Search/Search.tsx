import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addFavorite, removeFavorite } from '../../store/favoritesSlice';
import styles from './Search.module.css';

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

interface Photo {
  id: string;
  urls: {
    small: string;
    full: string;
  };
  alt_description?: string;
}

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Photo[]>([]);
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const dispatch = useDispatch();

  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchPhotos = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }
    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: { query: searchTerm, per_page: 12 },
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      });
      setResults(response.data.results);
    } catch (error) {
      console.error('Ошибка при поиске:', error);
    }
  };

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetchPhotos(query);
    }, 500);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [query]);

  const isFavorite = (id: string) => favorites.some(photo => photo.id === id);

  const toggleFavorite = (photo: Photo) => {
    if (isFavorite(photo.id)) {
      dispatch(removeFavorite(photo.id));
    } else {
      dispatch(addFavorite(photo));
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchBar}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Поиск"
          className={styles.input}
        />
      </div>
      <div className={styles.results}>
        {results.map(photo => (
          <div key={photo.id} className={styles.card}>
            <img src={photo.urls.small} alt={photo.alt_description || 'image'} />
            <button onClick={() => toggleFavorite(photo)} className={styles.favButton}>
              {isFavorite(photo.id) ? 'Удалить из избранного' : 'В избранное'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;

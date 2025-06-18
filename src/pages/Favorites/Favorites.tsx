import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { removeFavorite } from '../../store/favoritesSlice';
import { Link } from 'react-router-dom';
import styles from './Favorites.module.css';

const Favorites: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const dispatch = useDispatch();

  const handleRemove = (id: string) => {
    dispatch(removeFavorite(id));
  };

  if (favorites.length === 0) {
    return <p className={styles.empty}>Избранных фото нет.</p>;
  }

  return (
    <>
      <h2 className={styles.title}>Избранное</h2>
      <div className={styles.container}>
        {favorites.map(photo => (
          <div key={photo.id} className={styles.card}>
            <Link to={`/photo/${photo.id}`}>
              <img
                src={photo.urls.small}
                alt={photo.alt_description || 'photo'}
                className={styles.image}
              />
            </Link>
            <button
              onClick={() => handleRemove(photo.id)}
              className={styles.button}
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </>
    );
};

export default Favorites;

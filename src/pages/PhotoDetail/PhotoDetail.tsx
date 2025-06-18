import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './PhotoDetail.module.css';

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

interface Photo {
  id: string;
  description: string | null;
  alt_description: string | null;
  created_at: string;
  width: number;
  height: number;
  likes: number;
  user: {
    name: string;
    username: string;
    portfolio_url: string | null;
  };
  urls: {
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
}

const PhotoDetail: React.FC = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await axios.get(`https://api.unsplash.com/photos/${id}`, {
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          },
        });
        setPhoto(response.data);
      } catch (err) {
        setError('Ошибка при загрузке фотографии');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPhoto();
  }, [id]);

  if (loading) return <p className={styles.status}>Загрузка...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!photo) return <p className={styles.status}>Фотография не найдена</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Информация о фото</h2>
      <div className={styles.info}>
        <p><strong>ID:</strong> {photo.id}</p>
        <p><strong>Описание:</strong> {photo.description || '—'}</p>
        <p><strong>Альтернативный текст:</strong> {photo.alt_description || '—'}</p>
        <p><strong>Автор:</strong> {photo.user.name} (@{photo.user.username})</p>
        {photo.user.portfolio_url && (
          <p><strong>Портфолио:</strong> <a href={photo.user.portfolio_url} target="_blank" rel="noreferrer">{photo.user.portfolio_url}</a></p>
        )}
        <p><strong>Дата создания:</strong> {new Date(photo.created_at).toLocaleString()}</p>
        <p><strong>Размер:</strong> {photo.width} × {photo.height}</p>
        <p><strong>Лайков:</strong> {photo.likes}</p>
      </div>
      <img
        src={photo.urls.regular}
        alt={photo.alt_description || 'image'}
        className={styles.image}
      />
    </div>
  );
};

export default PhotoDetail;

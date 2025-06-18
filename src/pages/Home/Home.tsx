import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../store/favoritesSlice";
import { RootState } from "../../store";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

interface Photo {
  id: string;
  urls: {
    small: string;
    full: string;
  };
  alt_description?: string;
}

const Home: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRandomPhotos = async () => {
      try {
        const response = await axios.get(
          "https://api.unsplash.com/photos/random",
          {
            params: { count: 8 },
            headers: {
              Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
            },
          }
        );
        setPhotos(response.data);
      } catch (err) {
        setError("Ошибка при загрузке изображений");
      } finally {
        setLoading(false);
      }
    };

    fetchRandomPhotos();
  }, []);

  const isFavorite = (id: string) => favorites.some((photo) => photo.id === id);

  const toggleFavorite = (e: React.MouseEvent, photo: Photo) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite(photo.id)) {
      dispatch(removeFavorite(photo.id));
    } else {
      dispatch(addFavorite(photo));
    }
  };

  if (loading) return <p className={styles.status}>Загрузка...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      {photos.map((photo) => (
        <Link key={photo.id} to={`/photo/${photo.id}`} className={styles.card}>
          <img
            src={photo.urls.small}
            alt={photo.alt_description || "image"}
            className={styles.image}
          />
          <button
            className={`${styles.likeButton} ${
              isFavorite(photo.id) ? styles.favorite : ""
            }}`}
            onClick={(event) => toggleFavorite(event, photo)}
          >
            {isFavorite(photo.id) ? 'Удалить из избранного' : 'В избранное'}
          </button>
        </Link>
      ))}
    </div>
  );
};

export default Home;

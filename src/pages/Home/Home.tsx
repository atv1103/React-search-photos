import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Home.module.css";
import PhotoGrid, { Photo } from "../../components/Photo-Grid/PhotoGrid";

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

interface HomeProps {
  query: string;
}

const Home: React.FC<HomeProps> = ({ query }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      setError(null);
      try {
        if (query.trim() === "") {
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
        } else {
          const response = await axios.get(
            "https://api.unsplash.com/search/photos",
            {
              params: { query, per_page: 12 },
              headers: {
                Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
              },
            }
          );
          setPhotos(response.data.results);
        }
      } catch (err) {
        setError("Ошибка при загрузке изображений");
      } finally {
        setLoading(false);
      }
    };

    const debounceId = setTimeout(fetchPhotos, 500);
    return () => clearTimeout(debounceId);
  }, [query]);

  if (loading) return <p className={styles.status}>Загрузка...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return <PhotoGrid photos={photos} />;
};

export default Home;

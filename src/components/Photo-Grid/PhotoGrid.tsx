import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addFavorite, removeFavorite } from "../../store/favoritesSlice";
import { RootState } from "../../store";
import styles from "./PhotoGrid.module.css";

export interface Photo {
  id: string;
  urls: {
    small: string;
    full: string;
  };
  alt_description?: string;
}

interface PhotoGridProps {
  photos: Photo[];
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos }) => {
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const dispatch = useDispatch();

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
            }`}
            onClick={(event) => toggleFavorite(event, photo)}
          >
            {isFavorite(photo.id) ? "Удалить из избранного" : "В избранное"}
          </button>
        </Link>
      ))}
    </div>
  );
};

export default PhotoGrid;

import { useEffect } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadFavoritesFromStorage } from "./store/favoritesSlice";
import Home from "./pages/Home/Home";
import PhotoDetail from "./pages/PhotoDetail/PhotoDetail";
import Favorites from "./pages/Favorites/Favorites";
import styles from "./App.module.css";
import Header from "./components/Header/Header";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFavoritesFromStorage());
  }, [dispatch]);

  return (
    <Router>
      <Header/>
      <div className={styles.app}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photo/:id" element={<PhotoDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

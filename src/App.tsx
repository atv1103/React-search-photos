import { useEffect, useState } from "react";
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
  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(loadFavoritesFromStorage());
  }, [dispatch]);

  return (
    <Router>
      <Header query={query} setQuery={setQuery} />
      <div className={styles.app}>
        <Routes>
          <Route path="/" element={<Home query={query} />} />
          <Route path="/photo/:id" element={<PhotoDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

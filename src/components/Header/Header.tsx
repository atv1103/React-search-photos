import styles from "./Header.module.css";
import logo from "../../assets/logo.png";
import searchImg from "../../assets/search.svg";
import heartImg from "../../assets/heart.svg";
import { Link, useLocation } from "react-router-dom";
import Search from "../Search/Search";

interface HeaderProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({ query, setQuery }) => {
  const location = useLocation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerTop}>
        <Link to="/">
          <img src={logo} alt="Логотип" />
        </Link>
        <div className={styles.navbar}>
          <Link to={"/"} className={styles.navLink}>
            <img src={searchImg} alt="Иконка поиск" />
            Поиск
          </Link>
          <Link to="/favorites" className={styles.navLink}>
            <img src={heartImg} alt="Иконка избранное" />
            Избранное
          </Link>
        </div>
      </div>
      {location.pathname === "/" && (
        <div className={styles.headerBottom}>
          <Search query={query} setQuery={setQuery} />
        </div>
      )}
    </div>
  );
};

export default Header;

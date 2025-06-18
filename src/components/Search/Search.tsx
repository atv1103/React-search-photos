import React from "react";
import styles from "./Search.module.css";

interface SearchProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const Search: React.FC<SearchProps> = ({ query, setQuery }) => {
  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Поиск"
        className={styles.input}
      />
    </div>
  );
};

export default Search;

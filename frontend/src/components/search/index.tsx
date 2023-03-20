import React, { FC, useEffect, useState } from "react";
import { useDebounce } from "../../utils/useDebounce";
import styles from "./search.module.scss";

interface Props {
  placeholder: string;
  searchValue: string;
  changeSearchValue: Function;
}

const Search: FC<Props> = ({ placeholder, searchValue, changeSearchValue }) => {
  const [search, setSearch] = useState(searchValue);
  const debauncedSearch = useDebounce(search, 500);

  useEffect(() => {
    changeSearchValue(debauncedSearch);
  }, [debauncedSearch]);

  return (
    <input
      className={styles["input"]}
      placeholder={placeholder}
      value={search}
      onChange={(event) => setSearch(event.target.value)}
    />
  );
};

export default Search;

import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./style.module.scss";
import { FaRegStar, FaRegUser, FaRegBell } from "react-icons/fa";
import { FiSearch, FiPlusCircle } from "react-icons/fi";
import Loading from "../../Component/onLoading";
import { AuthContext } from "../../App";
// https://react-icons.github.io/react-icons/icons?name=fa

export default function Navbar(props) {
  const [query, setQuery] = useState();
  const [items, setItems] = useState();
  const history = useHistory();
  const { state, dispatch } = useContext(AuthContext);
  console.log(state.user);
  useEffect(() => {
    if(!state.user){
      dispatch({type: 'CHECK_CACHE'});
    }
  }, []);

  const search = () => {
    const API_URL = "https://www.googleapis.com/books/v1/volumes?q=";

    fetch(`${API_URL}${query}`)
      .then((response) => response.json())
      .then((json) => {
        let { items } = json === null ? [] : json;
        console.log(json);
        setItems(items);
      })
      .then(() => {
        history.push({
          pathname: "/search/" + query,
          items: items,
          query: query,
        });
        document.getElementById("input").value = "";
        setQuery("");
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }

  return(
    <div className={styles.navbar}>
    <div className={styles.logo}>UCI books</div>
    <div className={styles.navItem}>
      <Link to="/">Home</Link>
    </div>
    <div className={styles.navItem}>
      <Link to="/sale">Sale</Link>
    </div>
    <div className={styles.navItem}>
      <Link to="/rental">Rental</Link>
    </div>
      {state.user?
          <div className={styles.iconWrapper}>
          <Link to="/profile">
            <FaRegUser color="white" className={styles.faIcon} />
          </Link>
        </div>
      :
      <div className={styles.signin}><Link to="/login">Sign in / Sign up</Link></div>}
    <div className={styles.iconWrapper}>
      <Link to="/watchlist">
        <FaRegStar color="white" className={styles.faIcon} />
      </Link>
    </div>
    <div className={styles.iconWrapper}>
      <Link to="/post">
        <FiPlusCircle color="white" className={styles.faIcon} />
      </Link>
    </div>
    <div className={styles.searchBox}>
      <input
        id="input"
        className={styles.searchInput}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(event) => {
          if ("Enter" === event.key) {
            search();
          }
        }}
      />
      <div className={styles.searchIconWrapper}>
        <FiSearch
          color="white"
          className={styles.faIcon}
          onClick={search}
        />
      </div>
    </div>
  </div>
  );


}

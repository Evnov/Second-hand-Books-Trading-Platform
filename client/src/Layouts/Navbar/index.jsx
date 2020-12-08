import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./style.module.scss";
import { FaRegStar, FaRegUser } from "react-icons/fa";
import { FiSearch, FiPlusCircle } from "react-icons/fi";
// import Loading from "../../Component/onLoading";
import { AuthContext } from "../../App";
import querystring from "querystring";
// https://react-icons.github.io/react-icons/icons?name=fa

export default function Navbar(props) {
  const [query, setQuery] = useState();
  // const [items, setItems] = useState();
  const history = useHistory();
  const { state, dispatch } = useContext(AuthContext);
  const [selection, setSelection] = useState("Title");
  const [selectKey, setKey] = useState("title");
  const [API_URL, setURL] = useState(
    "http://secbook1-env.eba-yep2vg6m.us-east-1.elasticbeanstalk.com/product/searchByTitle.do"
  );
  console.log(state.user);
  useEffect(() => {
    if (!state.user) {
      dispatch({ type: "CHECK_CACHE" });
    }
  }, []);

  const selectItems = {
    Title: "title",
    Subtitle: "subtitle",
    BookCondition: "book_condition",
    Desc: "desc",
  };

  const handleChange = (e) => {
    setSelection(e.target.value);
    let key = selectItems[e.target.value];
    setKey(key);
    let url =
      `http://secbook1-env.eba-yep2vg6m.us-east-1.elasticbeanstalk.com/product/searchBy` +
      e.target.value +
      `.do`;
    setURL(url);
  };

  const search = () => {
    console.log("API", API_URL);
    // let booktitle = { selectKey: query };
    // console.log(querystring.stringify(booktitle));
    let requestBody = selectKey + "=" + query;
    console.log(requestBody);
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      // body: querystring.stringify(booktitle),
      body: requestBody,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        let item = json === null ? [] : json;
        console.log("item", item);
        return item;
        // console.log(items.length);
        // setItems(item);
        // console.log("items", items);
      })
      .then((item) => {
        history.push({
          pathname: "/search/" + query,
          items: item,
          query: query,
          select: selection,
        });
        document.getElementById("input").value = "";
        setQuery("");
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>ZotBooks</div>
      <div className={styles.navItem}>
        <Link to="/">Home</Link>
      </div>
      <div className={styles.navItem}>
        <Link to="/sale">Sale</Link>
      </div>
      <div className={styles.navItem}>
        <Link to="/rental">Rental</Link>
      </div>
      {state.user ? (
        <div className={styles.iconWrapper}>
          <Link to="/profile">
            <FaRegUser color="white" className={styles.faIcon} />
          </Link>
        </div>
      ) : (
        <div className={styles.signin}>
          <Link to="/login">Sign in / Sign up</Link>
        </div>
      )}
      <div className={styles.iconWrapper}>
        <Link to="/watchlist">
          <FaRegStar color="white" className={styles.faIcon} />
        </Link>
      </div>
      <div className={styles.iconWrapper}>
        <Link to="/post/newbook">
          <FiPlusCircle color="white" className={styles.faIcon} />
        </Link>
      </div>
      <div className={styles.searchBox}>
        <div className={styles.searchIconWrapper}>
          <FiSearch
            color="white"
            className={styles.smfaIcon}
            onClick={search}
          />
        </div>
        <input
          id="input"
          className={styles.searchInput}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          placeholder="Search for book information here"
          onKeyPress={(event) => {
            if ("Enter" === event.key) {
              search();
            }
          }}
        />
        <select
          id="selection"
          className={styles.searchSelection}
          onChange={handleChange}
        >
          <option value="Title">Title</option>
          <option value="Subtitle">Author</option>
          <option value="BookCondition">Condition</option>
          <option value="Desc">Description</option>
        </select>
      </div>
    </div>
  );
}

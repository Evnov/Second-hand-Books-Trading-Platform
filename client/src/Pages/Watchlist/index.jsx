import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import BookList from "../../Layouts/BookList";
import books from "../Sale/MockBookList";
import { Link } from "react-router-dom";

export default function WatchList() {
  const [user, setUser] = useState();

  let startBooks = books.filter((item) => {
    return item.started === true;
  });
  const loggedInUser = localStorage.getItem("user");

  useEffect(() => {
    if (loggedInUser) {
      console.log(JSON.parse(loggedInUser));
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, [loggedInUser]); //only when loggedInUser changes useEffect will be triggered

  if (!user) {
    return (
      <div className={styles.watchlistPage}>
        <h2>
          Please{" "}
          <Link to="/login" className={styles.link}>
            log in
          </Link>
          .
        </h2>
      </div>
    );
  }
  return (
    <div className={styles.watchlistPage}>
      <h1>WatchList</h1>
      <div className={styles.list}>
        {startBooks.map((item, index) => {
          return <BookList item={item} key={index} />;
        })}
      </div>
    </div>
  );
}

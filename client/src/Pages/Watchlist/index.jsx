import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import BookList from "../../Layouts/BookList";
import books from "../../Component/MockBookList";
import { Link } from "react-router-dom";
import AccountNavbar from "../../Layouts/AccountNavbar";
import querystring from "querystring";

export default function WatchList() {
  const [user, setUser] = useState();
  const [watchlist, setWatchlist] = useState();

  // let startBooks = books.filter((item) => {
  //   return item.started === true;
  // });
  const loggedInUser = localStorage.getItem("user");

  useEffect(() => {
    if (loggedInUser) {
      // console.log(JSON.parse(loggedInUser));
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  useEffect(() => {
    if (user) {
      console.log("user id", user.id);
      fetch(
        "http://secbook1-env.eba-yep2vg6m.us-east-1.elasticbeanstalk.com/watchlist/getAllBooks.do",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: querystring.stringify({ user_id: user.id }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setWatchlist(data);
          console.log("watchlist", watchlist);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  }, [user]);

  if (!user) {
    return (
      <div className={styles.watchlistPage}>
        <div className={styles.navbar}>
          <AccountNavbar />
        </div>
        <div className={styles.right}>
          <h2>
            Please{" "}
            <Link to="/login" className={styles.link}>
              Sign in
            </Link>
            .
          </h2>
        </div>
      </div>
    );
  }
  if (watchlist) {
    return (
      <div className={styles.watchlistPage}>
        <div className={styles.navbar}>
          <AccountNavbar />
        </div>
        <div className={styles.right}>
          <h1>WatchList</h1>
          <div className={styles.list}>
            {watchlist
              .filter((item) => {
                return item.status !== 2;
              })
              .map((item, index) => {
                return <BookList started="true" item={item} key={index} />;
              })}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.watchlistPage}>
      <div className={styles.navbar}>
        <AccountNavbar />
      </div>
      <div className={styles.right}>
        <h1>WatchList</h1>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import BookList from "../../Layouts/BookList";
import { Link } from "react-router-dom";
import AccountNavbar from "../../Layouts/AccountNavbar";
import querystring from "querystring";

export default function BookShelf() {
  const [user, setUser] = useState();
  const [booklist, setBooklist] = useState();

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
      console.log(user.id);
      fetch(
        "http://secbook1-env.eba-yep2vg6m.us-east-1.elasticbeanstalk.com/booklist/getAllBooks.do",
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
          setBooklist(data);
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
  if (booklist) {
    return (
      <div className={styles.watchlistPage}>
        <div className={styles.navbar}>
          <AccountNavbar />
        </div>
        <div className={styles.right}>
          <h1>BookShelf</h1>
          <div className={styles.list}>
            {booklist.map((item, index) => {
              return <BookList item={item} key={index} />;
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
        <h1>BookShelf</h1>
      </div>
    </div>
  );
}

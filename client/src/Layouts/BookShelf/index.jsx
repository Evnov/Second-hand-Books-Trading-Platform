import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import BookList from "../../Layouts/BookShelf";
import { Link } from "react-router-dom";
import AccountNavbar from "../../Layouts/AccountNavbar";
import querystring from "querystring";

export default function BookShelf() {
  const [user, setUser] = useState();
  const [booklist, setBooklist] = useState();
  const [display, setDisplay] = useState("Books On Sale");

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
          <div className={styles.bar}>
            <form>
              <select
                onChange={(e) => {
                  if (e.target.value === "0") {
                    setDisplay("Books On Sale");
                  } else if (e.target.value === "1") {
                    setDisplay("Books In Rental");
                  } else {
                    setDisplay("Books Off Shelf");
                  }
                }}
              >
                <option value="0">Books On Sale</option>
                <option value="1">Books In Rental</option>
                <option value="2">Books Off Shelf</option>
              </select>
            </form>
          </div>
          {display === "Books On Sale" ? 
            <BookList items={booklist.filter((item) => item.status === 1)}/>
           : display === "Books In Rental" ? 
          <BookList items={booklist.filter((item) => item.status === 0)}/>
          : 
          <BookList items={booklist.filter((item) => item.status === 2)}/>}
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
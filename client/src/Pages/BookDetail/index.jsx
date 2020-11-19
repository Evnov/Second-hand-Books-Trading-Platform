import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { useParams, Link } from "react-router-dom";
import books from "../../Component/MockBookList";

export default function BookDetail() {
  const { bookID } = useParams();
  const [user, setUser] = useState();
  const [inWatchList, setInWatchList] = useState(false);

  const book = books.filter((item) => item.id == bookID)[0];
  console.log(book);

  const loggedInUser = localStorage.getItem("user");
  useEffect(() => {
    if (loggedInUser) {
      console.log(JSON.parse(loggedInUser));
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, [loggedInUser]);

  function handleClick() {
    setInWatchList(!inWatchList);
  }
  return (
    <div className={styles.bookdetailPage}>
      <div className={styles.left}>
        <header className={styles.bookTitle}>{book.title}</header>
        <section className={styles.bookAuthor}>
          {book.authors === undefined ? "" : book.authors[0]}
        </section>
        <div className={styles.bookImg}>
          <img src={book.image} alt={book.title} className={styles.bookcover} />
        </div>
        <div className={styles.bookInfo}>
          <section className={styles.bookPrice}>${book.price}</section>
          <section className={styles.bookSection}>
            Published: {book.publishedDate}
          </section>
          <section className={styles.bookSection}>
            Department: {book.department}
          </section>
          <section className={styles.bookSection}>
            Course: 260P Application of Algorithm{" "}
          </section>
          <section className={styles.bookSection}>
            Condition: {book.condition}
          </section>
        </div>
      </div>
      <div className={styles.right}>
        {user === undefined ? (
          <div className={styles.contact}>
            <Link to="/login" className={styles.link}>
              Login to
            </Link>{" "}
            get saler's contact info
          </div>
        ) : (
          <div>
            <div className={styles.contact}>
              <header>saler contact info: </header>
              <p>email:xxxx@uci.edu</p>
              <p>phone: 999-999-9999</p>
            </div>
            <div className={styles.bookBtn}>
              {inWatchList ? (
                <button className={styles.btn} onClick={handleClick}>
                  Remove from WatchList
                </button>
              ) : (
                <button className={styles.btn} onClick={handleClick}>
                  Add to WatchList
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

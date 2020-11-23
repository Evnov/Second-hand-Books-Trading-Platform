import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";

export default function BookList(props) {
  const [inWatchList, setInWatchList] = useState(props.item.started);
  const [user, setUser] = useState()

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
    <div className={styles.bookDiv} key={props.item.id}>
      <Link to={"/bookdetail/" + props.item.id}>
        <div className={styles.bookImg}>
          <img
            src={props.item.image}
            alt={props.item.title}
            className={styles.bookcover}
          />
        </div>
      </Link>
      <div className={styles.bookInfo}>
        <header className={styles.bookTitle}>{props.item.title}</header>
        <section className={styles.bookAuthor}>
          {props.item.authors === undefined ? "" : props.item.authors[0]}
        </section>
        <section className={styles.bookPrice}>${props.item.price}</section>
        {/* <section className={styles.bookSection}>
          Published: {props.item.publishedDate}
        </section> */}
        <section className={styles.bookSection}>
          Department: {props.item.department}
        </section>
        <section className={styles.bookSection}>
          Course: 260P Application of Algorithm{" "}
        </section>
        <section className={styles.bookSection}>
          Condition: {props.item.condition}
        </section>
      </div>

      <div className={styles.bookBtn}>
        {/* <button className={styles.btn}>Add to Cart</button> */}
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
  );
}

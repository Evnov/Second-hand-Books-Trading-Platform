import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import cat from "../../Component/Category";
import randomImg from "../../Component/randomImg";
import condition from "../../Component/bookCondition"

export default function BookList(props) {
  // const [inWatchList, setInWatchList] = useState(props.item.started);
  const [inWatchList, setInWatchList] = useState(false);
  const [user, setUser] = useState();

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
            // src={props.item.bookImage}
            src={randomImg[Math.floor(Math.random() * 6)]}
            alt={props.item.title}
            className={styles.bookcover}
          />
        </div>
      </Link>
      <div className={styles.bookInfo}>
        <header className={styles.bookTitle}>{props.item.title}</header>
        <section className={styles.bookAuthor}>
          {props.item.subtitle === undefined ? "" : props.item.subtitle}
        </section>
        <section className={styles.bookPrice}>${props.item.price}</section>
        {/* <section className={styles.bookSection}>
          Published: {props.item.publishedDate}
        </section> */}
        <section className={styles.bookSection}>
        Category: {cat[props.item.categoryId]}
        </section>
        {/* <section className={styles.bookSection}>
          Course: 260P Application of Algorithm{" "}
        </section> */}
        <section className={styles.bookSection}>
          Condition: {condition[props.item.bookCondition]}
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

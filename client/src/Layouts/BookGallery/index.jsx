import React, { useState } from "react";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import { FaRegStar } from "react-icons/fa";

export default function BookGallery(props) {
  const [inWatchList, setInWatchList] = useState(props.item.started);

  let star_class = inWatchList ? "orange" : "";

  function handleClick() {
    setInWatchList(!inWatchList);
  }
  return (
    <div className={styles.bookDiv} key={props.item.id}>
      <div className={styles.bookInfo}>
        <Link to={"/bookdetail/" + props.item.id}>
          <div className={styles.bookHeader}>
            <header className={styles.bookTitle}>{props.item.title}</header>
            <section className={styles.bookAuthor}>
              {props.item.authors === undefined ? "" : props.item.authors[0]}
            </section>
          </div>
          <div className={styles.bookImg}>
            <img
              src={props.item.image}
              alt={props.item.title}
              className={styles.bookcover}
            />
          </div>
          <section className={styles.bookPrice}>${props.item.price}</section>
          {/* <section className={styles.bookSection}>
          Published: {props.item.publishedDate}
        </section> */}
          <section className={styles.bookSection}>
            Department: {props.item.department}
          </section>
          <section className={styles.bookSection}>
            Course: 260P Application of Algorithm
          </section>
          <section className={styles.bookSection}>
            Condition: {props.item.condition}
          </section>
        </Link>
        <FaRegStar
          fill={star_class}
          className={styles.started}
          onClick={handleClick}
        />
      </div>
      {/* <div className={styles.bookBtn}>
        <button className={styles.btn}>Add to Cart</button>
        <button className={styles.btn}>Add to WatchList</button>
      </div> */}
    </div>
  );
}

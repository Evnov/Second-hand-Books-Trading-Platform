import React, { useState } from "react";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import { FaRegStar } from "react-icons/fa";
import cat from "../../Component/Category";
import randomImg from "../../Component/randomImg";
import condition from "../../Component/bookCondition";

export default function BookGallery(props) {
  // const [inWatchList, setInWatchList] = useState(props.item.started);
  const [inWatchList, setInWatchList] = useState(false);
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
              {props.item.subtitle === undefined ? "" : props.item.subtitle}
            </section>
          </div>
          <div className={styles.bookImg}>
            <img
              // src={props.item.image}
              src={randomImg[Math.floor(Math.random() * 6)]}
              alt={props.item.title}
              className={styles.bookcover}
            />
          </div>
          <section className={styles.bookPrice}>${props.item.price}</section>
          <section className={styles.bookSection}>
            Category: {cat[props.item.categoryId]}
          </section>
          <section className={styles.bookSection}>
            Condition: {condition[props.item.bookCondition]}
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

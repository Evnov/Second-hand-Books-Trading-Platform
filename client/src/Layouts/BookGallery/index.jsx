import React from "react";
import styles from "./style.module.scss";
import { FaRegStar } from "react-icons/fa";

export default function BookGallery(props) {
  return (
    <div className={styles.bookDiv} key={props.id}>
      <div className={styles.bookInfo}>
        <header className={styles.bookTitle}>{props.title}</header>
        <section className={styles.bookAuthor}>
          {props.authors === undefined ? "" : props.authors[0]}
        </section>
        <div className={styles.bookImg}></div>
        <section className={styles.bookPrice}>
          ${Math.floor(Math.random() * (1000 - 100) + 100) / 100}
        </section>
        <section className={styles.bookSection}>
          Published: {props.publishedDate}
        </section>
        <section className={styles.bookSection}>Department: ICS</section>
        <section className={styles.bookSection}>Course: 260P Application of Algorithm </section>
        <FaRegStar className={styles.faIcon}/>
      </div>
      {/* <div className={styles.bookBtn}>
        <button className={styles.btn}>Add to Cart</button>
        <button className={styles.btn}>Add to WatchList</button>
      </div> */}
    </div>
  );
}

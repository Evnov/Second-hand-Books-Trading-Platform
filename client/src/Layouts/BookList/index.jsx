import React from "react";
import styles from "./style.module.scss";

export default function BookList(props) {
  return (
    <div className={styles.bookDiv} key={props.id}>
      <div className={styles.bookImg}></div>
      <div className={styles.bookInfo}>
        <header className={styles.bookTitle}>{props.title}</header>
        <section className={styles.bookAuthor}>
          {props.authors === undefined ? "" : props.authors[0]}
        </section>
        <section className={styles.bookPrice}>
          ${Math.floor(Math.random() * (1000 - 100) + 100) / 100}
        </section>
        <section className={styles.bookSection}>
          Published: {props.publishedDate}
        </section>
        <section className={styles.bookSection}>Department: ICS</section>
        <section className={styles.bookSection}>Course: 260P Application of Algorithm </section>
      </div>
      <div className={styles.bookBtn}>
        {/* <button className={styles.btn}>Add to Cart</button> */}
        <button className={styles.btn}>Add to WatchList</button>
      </div>
    </div>
  );
}

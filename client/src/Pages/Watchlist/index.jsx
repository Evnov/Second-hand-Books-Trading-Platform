import React from "react";
import styles from "./style.module.scss";
import BookList from "../../Layouts/BookList";
import books from "../Sale/MockBookList";

export default function WatchList() {
  let startBooks = books.filter((item) => {
    return item.started === true;
  });
  return (
    <div className={styles.watchlistPage}>
      <div className={styles.list}>
        {startBooks.map((item) => {
          // let { id, title, authors, publishedDate, started, price } = item;
          return <BookList item={item} />;
        })}
      </div>
    </div>
  );
}

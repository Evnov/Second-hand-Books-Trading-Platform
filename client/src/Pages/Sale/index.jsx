import React, { useState } from "react";
import styles from "./style.module.scss";
import BookGallery from "../../Layouts/BookGallery";
import BookList from "../../Layouts/BookList";
import books from "./MockBookList";

export default function Sale() {
  const [display, setDisplay] = useState("list");
  return (
    <div className={styles.salePage}>
      <div className={styles.bar}>
        <form>
          <label>Display as </label>
          <select
            onChange={(e) => {
              if (e.target.value === "0") {
                setDisplay("list");
              } else {
                setDisplay("gallery");
              }
            }}
          >
            <option value="0">List</option>
            <option value="1">Gallery</option>
          </select>
        </form>
      </div>
      {display === "list" ? (
        <div className={styles.list}>
          {books.map((item) => {
            let { id, title, authors, publishedDate } = item;
            return (
              <BookList
                id={id}
                title={title}
                authors={authors}
                publishedDate={publishedDate}
              />
            );
          })}
        </div>
      ) : (
        <div className={styles.container}>
          {books.map((item) => {
            let { id, title, authors, publishedDate } = item;
            return (
              <BookGallery
                id={id}
                title={title}
                authors={authors}
                publishedDate={publishedDate}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import BookGallery from "../../Layouts/BookGallery";
import BookList from "../../Layouts/BookList";
// import books from "../../Component/MockBookList";

export default function Sale() {
  const [display, setDisplay] = useState("list");
  // const [books, setBooks] = useState([]);
  const [saleBooks, setSaleBooks] = useState();

  useEffect(() => {
    fetch(
      "http://secbook1-env.eba-yep2vg6m.us-east-1.elasticbeanstalk.com/book/get_allBooks.do",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // setBooks(data.data);
        console.log(data.data);
        // console.log("books", books);
        let sale = data.data.filter((item) => {
          return item.status === 1;
        });
        setSaleBooks(sale);
        console.log(saleBooks)
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  if (saleBooks) {
    return (
      <div className={styles.salePage}>
        <h1>Books On Sale</h1>
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
            {saleBooks.map((item, index) => {
              // let { id, title, authors, publishedDate, started, price } = item;
              return <BookList item={item} key={index} />;
            })}
          </div>
        ) : (
          <div className={styles.container}>
            {saleBooks.map((item, index) => {
              // let { id, title, authors, publishedDate } = item;
              return <BookGallery item={item} key={index} />;
            })}
          </div>
        )}
        <div className={styles.gap}></div>
      </div>
    );
  }
  return (
    <div className={styles.salePage}>
      <h1>Books On Sale</h1>
    </div>
  );
}

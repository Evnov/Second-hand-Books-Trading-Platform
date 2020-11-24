import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import BookGallery from "../../Layouts/BookGallery";
import BookList from "../../Layouts/BookList";
// import books from "../../Component/MockBookList";

export default function Rental() {
  const [display, setDisplay] = useState("list");
  const [rentalBooks, setRentalBooks] = useState();
  // let rentalBooks = books.filter((item) => {
  //   return item.for === "rent";
  // });

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
        let rent = data.data.filter((item) => {
          return item.status == 0;
        });
        setRentalBooks(rent);
        console.log(rentalBooks);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  if (rentalBooks) {
    return (
      <div className={styles.rentalPage}>
        <h1>Books Rentals</h1>
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
            {rentalBooks.map((item, index) => {
              // let { id, title, authors, publishedDate, started, price } = item;
              return <BookList item={item} key={index} />;
            })}
          </div>
        ) : (
          <div className={styles.container}>
            {rentalBooks.map((item, index) => {
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
    <div className={styles.rentalPage}>
      <h1>Books Rentals</h1>
    </div>
  );
}

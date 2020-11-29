import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { useParams, Link } from "react-router-dom";
import cat from "../../Component/Category";
import randomImg from "../../Component/randomImg";
import condition from "../../Component/bookCondition";
import Rating from "../../Layouts/Rating";
// import books from "../../Component/MockBookList";

export default function BookDetail() {
  const { bookID } = useParams();
  const [user, setUser] = useState();
  const [inWatchList, setInWatchList] = useState(false);
  const [book, setBook] = useState();
  const [idx, setIdx] = useState(0);

  // const book = books.filter((item) => item.id == bookID)[0];
  // console.log(book);

  const loggedInUser = localStorage.getItem("user");
  useEffect(() => {
    if (loggedInUser) {
      // console.log(JSON.parse(loggedInUser));
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
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
        let filterbook = data.data.filter((item) => {
          return item.id == bookID;
        });
        console.log(filterbook);
        setBook(filterbook[0]);
        console.log(book);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  function handleClick() {
    setInWatchList(!inWatchList);
  }
  function toggle(){
    setIdx(!idx+0);
  }
  if (book) {
    return (
      <div className={styles.bookdetailPage}>
        <div className={styles.left}>
          <div className={styles.bookImg}>
            <img
              src={randomImg[Math.floor(Math.random() * 6)]}
              alt={book.title}
              className={styles.bookcover}
            />
          </div>
        </div>
        <div className={styles.right}>
          <header className={styles.bookTitle}>{book.title}</header>
          <section className={styles.bookAuthor}>
            {book.subtitle === undefined ? "" : book.subtitle}
          </section>
          <div className={styles.bookInfo}>
            <section className={styles.bookPrice}>${book.price}</section>
            {/* <section className={styles.bookSection}>
            Published: {book.publishedDate}
          </section> */}
            <section className={styles.bookSection}>
              <strong>Category: </strong>
              {cat[book.categoryId]}
            </section>
            {/* <section className={styles.bookSection}>
            Course: 260P Application of Algorithm{" "}
          </section> */}
            <section className={styles.bookSection}>
              <strong>Condition:</strong> {condition[book.bookCondition]}
            </section>

          </div>
          {user === undefined ? (
            <div className={styles.contact}>
              <Link to="/login" className={styles.link}>
                Login to
              </Link>{" "}
              get saler's contact info
            </div>
          ) : (
            <div>
              <div className={styles.contact}>
                <header>saler contact info: </header>
                <p>email:xxxx@uci.edu</p>
                <p>phone: 999-999-9999</p>
              </div>
              <div className={styles.bookBtn}>
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
          )}
        </div>
        <div className={styles.tabs}>
          <div className={idx===0&&styles.active} onClick={toggle}>Description</div>
          <div className={idx===1&&styles.active} onClick={toggle}>About seller / lender</div>
        </div>
        <div className={styles.tabContent}>
          {idx==0&&<section className={styles.bookSection}>
             {book.descr}
          </section>}
          {idx==1&&<Rating />}
        </div>
      </div>
    );
  }
  return <div className={styles.bookdetailPage}></div>;
}

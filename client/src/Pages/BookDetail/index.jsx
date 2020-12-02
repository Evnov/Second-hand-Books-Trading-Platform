import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { useParams, Link } from "react-router-dom";
import cat from "../../Component/Category";
import randomImg from "../../Component/randomImg";
import  { Storage } from 'aws-amplify';
// import condition from "../../Component/bookCondition";
import Rating from "../../Layouts/Rating";
import querystring from "querystring";
import { sectionFooterSecondaryContent } from "aws-amplify";

export default function BookDetail() {
  const { bookID } = useParams();
  const [user, setUser] = useState();
  const [inWatchList, setInWatchList] = useState(false);
  const [book, setBook] = useState();
  const [idx, setIdx] = useState(0);
  const [src, setSrc] = useState();
  const [saler, setSaler] = useState({ username: "", email: "", phone: "" });

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
        // console.log(data.data);
        let filterbook = data.data.filter((item) => {
          return item.id == bookID;
        });
        // console.log(filterbook);
        setBook(filterbook[0]);
        // console.log(book);
        return filterbook[0].title;
      })
      .then((key)=>Storage.get(key))
      .then((url)=>setSrc(url))
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  useEffect(() => {
    const bodyObj = { book_id: bookID };
    if (bookID) {
      fetch(
        "http://secbook1-env.eba-yep2vg6m.us-east-1.elasticbeanstalk.com/booklist/getUser.do",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: querystring.stringify(bodyObj),
        }
      )
        .then((response) => {
          // console.log(response.json());
          return response.json();
        })
        .then((data) => {
          // console.log("saler", data[0].email);
          setSaler({
            username: data[0].username,
            email: data[0].email,
            phone: data[0].phone,
          });
          // console.log(saler);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  }, []);

  useEffect(() => {
    if (user) {
      const bodyuser = { user_id: user.id };
      console.log("user", querystring.stringify(bodyuser));
      fetch(
        "http://secbook1-env.eba-yep2vg6m.us-east-1.elasticbeanstalk.com/watchlist/getAllBooks.do",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: querystring.stringify({ user_id: user.id }),
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // console.log("watchlist:", data);
          // const ids = [];
          setInWatchList(data.map((item=>item.id)).includes(parseInt(bookID)));
          // setWatchListID(ids);
          console.log("inwatch", inWatchList);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  }, [user]);

  function handleClick() {
    if (user && bookID) {
      fetch(
        "http://secbook1-env.eba-yep2vg6m.us-east-1.elasticbeanstalk.com/watchlist/updateBook.do",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: querystring.stringify({
            user_id: user.id,
            book_id: bookID,
            flag: !inWatchList,
          }),
        }
      )
        .then(() => {
          setInWatchList(!inWatchList);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  }
  function toggle(i){
    setIdx(i);
  }
  if (book) {
    return (
      <div className={styles.bookdetailPage}>
        <div className={styles.left}>
          <div className={styles.bookImg}>
            <img
              src={src}
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
            <section className={styles.bookSection}>
              <strong>Category: </strong>
              {cat[book.categoryId]}
            </section>
            {/* <section className={styles.bookSection}>
            Course: 260P Application of Algorithm{" "}
          </section> */}
            <section className={styles.bookSection}>
              <strong>Condition:</strong> {book.bookCondition}
            </section>
            <section className={styles.bookSection}>
              <strong>Status:</strong> {book.status == 0 ? "Rental" : book.status == 1 ? "Sale" : "Off Shelf"}
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
                {/* <button onClick={handleSalerInfo}>
                  click to get user's info
                </button> */}
                <header>saler contact info: </header>
                <p>
                  <strong>username: </strong>
                  {saler.username}
                </p>
                <p>
                  <strong>email: </strong>
                  {saler.email}
                </p>
                <p>
                  <strong>phone: </strong>
                  {saler.phone}
                </p>
              </div>
              <div className={styles.bookBtn}>
                {inWatchList ? (
                  <button className={styles.removebtn} onClick={handleClick}>
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
          <div className={idx===0&&styles.active} onClick={()=>toggle(0)}>Description</div>
          {/* <div className={idx===1&&styles.active} onClick={()=>toggle(1)}>About owner</div> */}
        </div>
        <div className={styles.tabContent}>
          {idx===0&&<section className={styles.bookSection}>
             {book.descr}
          </section>}
          {idx===1&&<Rating />}
        </div>
      </div>
    );
  }
  return <div className={styles.bookdetailPage}></div>;
}

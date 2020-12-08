import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import star from "../../Assets/images/star.png";
import star2 from "../../Assets/images/star_2.png";
import cat from "../../Component/Category";
import { Storage } from "aws-amplify";
// import randomImg from "../../Component/randomImg";
import querystring from "querystring";
import { resolve } from "path";

export default function BookList(props) {
  const [user, setUser] = useState();

  let { items, watchList } = props;
  const [books, setBooks] = useState([]);

  const loggedInUser = localStorage.getItem("user");

  useEffect(() => {
    if (loggedInUser) {
      // console.log(JSON.parse(loggedInUser));
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, [loggedInUser]);

  useEffect(() => {
    let newItems = items.map((item) => {
      Storage.get(item.bookImage).then((url) => {
        item.url = url;
      });
      return item;
    });
    setBooks(newItems);
    console.log(books);
  }, [items]);

  watchList = watchList || [];
  const stars = items
    .map((item) => item.id)
    .filter((id) => watchList.includes(id));
  // console.log(items);
  // console.log(stars);

  return (
    <div className={styles.container}>
      {books.map((item) => (
        <div className={styles.bookDiv} key={item.id}>
          <Link to={"/bookdetail/" + item.id}>
            <div className={styles.bookImg}>
              <img
                src={item.url}
                alt={item.title}
                className={styles.bookcover}
              />
            </div>
          </Link>
          <div className={styles.bookInfo}>
            <Link to={"/bookdetail/" + item.id}>
              <header className={styles.bookTitle}>{item.title}</header>
            </Link>
            <section className={styles.bookAuthor}>
              {item.subtitle === undefined ? "" : item.subtitle}
            </section>
            <section className={styles.bookPrice}>${item.price}</section>
            <section className={styles.bookSection}>
              Category: {cat[item.categoryId]}
            </section>
            <section className={styles.bookSection}>
              Condition: {item.bookCondition}
            </section>
            <section className={styles.bookSection}>
              Status:{" "}
              {item.status == 0
                ? "Rental"
                : item.status == 1
                ? "Sale"
                : "Off Shelf"}
            </section>
            {user && (
              <WatchStar
                watched={stars.indexOf(item.id) > -1}
                userid={user.id}
                id={item.id}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export function WatchStar(props) {
  const { watched, userid, id } = props;
  const [iswatched, setwatched] = useState(watched);
  React.useEffect(() => {
    setwatched(props.watched);
  }, [props.watched]);
  function handleClick() {
    if (id) {
      fetch(
        "http://secbook1-env.eba-yep2vg6m.us-east-1.elasticbeanstalk.com/watchlist/updateBook.do",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: querystring.stringify({
            user_id: userid,
            book_id: id,
            flag: !iswatched,
          }),
        }
      )
        .then(() => {
          setwatched(!iswatched);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  }
  return (
    <img
      src={iswatched ? star2 : star}
      className={styles.started}
      onClick={handleClick}
      alt="watchlist"
    />
  );
}

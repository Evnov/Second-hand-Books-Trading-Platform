import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import { FaRegStar } from "react-icons/fa";
import cat from "../../Component/Category";
import randomImg from "../../Component/randomImg";
import condition from "../../Component/bookCondition";
import querystring from "querystring";
import WatchList from "../../Pages/Watchlist";

export default function BookGallery(props) {
  // const [inWatchList, setInWatchList] = useState(props.item.started);
  const [inWatchList, setInWatchList] = useState(props.started);
  let star_class = inWatchList ? "orange" : "";
  const [user, setUser] = useState();

  const loggedInUser = localStorage.getItem("user");
  useEffect(() => {
    if (loggedInUser) {
      console.log(JSON.parse(loggedInUser));
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, [loggedInUser]);

  function handleClick() {
    if (user && props.item.id) {
      fetch(
        "http://secbook1-env.eba-yep2vg6m.us-east-1.elasticbeanstalk.com/watchlist/updateBook.do",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: querystring.stringify({
            user_id: user.id,
            book_id: props.item.id,
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

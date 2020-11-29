import React, { useState } from "react";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
// import { FaRegStar } from "react-icons/fa";
import cat from "../../Component/Category";
import randomImg from "../../Component/randomImg";
import condition from "../../Component/bookCondition";
import querystring from "querystring";

export default function BookShelf(props) {
  // const [inWatchList, setInWatchList] = useState(props.item.started);

  function handleUpdate() {}

  function handleOffshelf() {
    // e.preventDefault();
    const data = {
      productId: props.item.id,
      status: 2,
    };
    fetch(
      "http://secbook1-env.eba-yep2vg6m.us-east-1.elasticbeanstalk.com/book/set_sale_status.do",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          // "Content-Type": "application/json"
        },
        body: querystring.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status == 0) {
          console.log(data.msg);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
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
      </div>
      <div className={styles.bookBtn}>
        <button className={styles.btn} onClick={handleUpdate}>
          Update Info
        </button>
        <button className={styles.btn} onClick={handleOffshelf}>
          Off Shelf
        </button>
      </div>
    </div>
  );
}

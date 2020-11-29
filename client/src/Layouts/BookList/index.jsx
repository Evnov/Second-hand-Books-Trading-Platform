import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import cat from "../../Component/Category";
import randomImg from "../../Component/randomImg";
import condition from "../../Component/bookCondition"

export default function BookList(props) {
  // const [inWatchList, setInWatchList] = useState(props.item.started);
  const [inWatchList, setInWatchList] = useState(props.started);
  const [user, setUser] = useState();

  const loggedInUser = localStorage.getItem("user");
  useEffect(() => {
    if (loggedInUser) {
      console.log(JSON.parse(loggedInUser));
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, [loggedInUser]);
  const {items} = props;

  function handleClick() {
    setInWatchList(!inWatchList);
  }
  return (
    <div className={styles.container}>
      {items.map((item, index)=>(
        <div className={styles.bookDiv} key={item.id}>
        <Link to={"/bookdetail/" + item.id}>
          <div className={styles.bookImg}>
            <img
              src={randomImg[Math.floor(Math.random() * 6)]}
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
            Condition: {condition[item.bookCondition]}
          </section>
        </div>
      </div>
      ))}
    </div>
  );
}

import React, { useState } from "react";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import { FaRegStar } from "react-icons/fa";
import cat from "../../Component/Category";
import randomImg from "../../Component/randomImg";
import condition from "../../Component/bookCondition";

export default function BookGallery(props) {
  // const [inWatchList, setInWatchList] = useState(props.item.started);
  const [inWatchList, setInWatchList] = useState(false);
  let star_class = inWatchList ? "orange" : "";
  const {items} = props;

  function handleClick() {
    setInWatchList(!inWatchList);
  }
  return (
    <div className={styles.container}>
      {items.map((item, index)=>(
        <Link to={"/bookdetail/" + item.id}>
      <div className={styles.bookDiv} key={item.id}>
          
            <img
              // src={props.item.image}
              src={randomImg[Math.floor(Math.random() * 6)]}
              alt={item.title}
              className={styles.bookcover}
            />
            <section className={styles.bookPrice}>${item.price}</section>
            <div className={styles.bookHeader}>
              <header className={styles.bookTitle}>{item.title}</header>
              <section className={styles.bookAuthor}>
                {item.subtitle === undefined ? "" : item.subtitle}
              </section>
            </div>
            
            <section className={styles.bookSection}>
              Category: {cat[item.categoryId]}
            </section>
            <section className={styles.bookSection}>
              Condition: {condition[item.bookCondition]}
            </section>
        </div>
      </Link>
      ))}
    </div>
  );
}

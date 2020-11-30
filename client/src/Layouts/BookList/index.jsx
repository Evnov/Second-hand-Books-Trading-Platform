import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import star from "../../Assets/images/star.png";
import star2 from "../../Assets/images/star_2.png";
import cat from "../../Component/Category";
import randomImg from "../../Component/randomImg";
import condition from "../../Component/bookCondition";
import querystring from "querystring";


export default function BookList(props) {
  // const [inWatchList, setInWatchList] = useState(props.item.started);
  // const [inWatchList, setInWatchList] = useState(props.started);
  const [user, setUser] = useState();

  const loggedInUser = localStorage.getItem("user");
  useEffect(() => {
    if (loggedInUser) {
      console.log(JSON.parse(loggedInUser));
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, [loggedInUser]);

  let {items, watchList} = props;
  watchList = watchList||[];
  const stars = items.map((item)=>item.id).filter(id => watchList.includes(id));
  console.log(items);
  console.log(stars);

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
          {user&&<WatchStar 
            watched={stars.indexOf(item.id)>-1} 
            userid={user.id}
            id={item.id}
          />}
        </div>
      </div>
      ))}
    </div>
  );
}

export function WatchStar(props) {
  const {watched, userid, id} = props;
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
  return(
    <img
      src={iswatched?star2 : star}
      className={styles.started}
      onClick={handleClick}
      alt='watchlist'
    />
  );
}
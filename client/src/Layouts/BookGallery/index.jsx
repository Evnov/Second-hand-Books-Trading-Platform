import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import star from "../../Assets/images/star.png";
import star2 from "../../Assets/images/star_2.png";
import cat from "../../Component/Category";
import { Storage } from "aws-amplify";
import randomImg from "../../Component/randomImg";
import condition from "../../Component/bookCondition";
import querystring from "querystring";



export default function BookGallery(props) {
  const [user, setUser] = useState();
  const [books, setBooks] = useState([]);
  const loggedInUser = localStorage.getItem("user");
  useEffect(() => {
    if (loggedInUser) {
      console.log(JSON.parse(loggedInUser));
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, [loggedInUser]);

  const {items, watchList} = props;
  const stars = items.map((item)=>item.id).filter(id => watchList.includes(id));

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
  return (
    <div className={styles.container}>
      {items.map((item, index)=>(
        <div className={styles.bookDiv} key={item.id}>
          <img
            src={item.url}
            alt={item.title}
            className={styles.bookcover}
          />
          <section className={styles.bookPrice}>${item.price}</section>
          {user&&<WatchStar 
            watched={stars.indexOf(item.id)>-1} 
            userid={user.id}
            id={item.id}
          />}
          <div className={styles.bookHeader}>
            <Link to={"/bookdetail/" + item.id}>
              <header className={styles.bookTitle}>{item.title}</header>
            </Link>
              <section className={styles.bookAuthor}>
                {item.subtitle === undefined ? "" : item.subtitle}
              </section>
            </div>
            <section className={styles.bookSection}>
              Category: {cat[item.categoryId]}
            </section>
            <section className={styles.bookSection}>
              Condition: {item.bookCondition}
            </section>
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
import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import BookGallery from "../../Layouts/BookGallery";
import BookList from "../../Layouts/BookList";
// import books from "../../Component/MockBookList";
import querystring from "querystring";

export default function Rental() {
  const [display, setDisplay] = useState("list");
  const [rentalBooks, setRentalBooks] = useState();
  const [user, setUser] = useState();
  const loggedInUser = localStorage.getItem("user");
  const [watchList, setWatchList] = useState();

  useEffect(() => {
    if (loggedInUser) {
      // console.log(JSON.parse(loggedInUser));
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

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
          const ids = [];
          data.forEach((item) => {
            ids.push(item.id);
          });
          setWatchList(ids);
          console.log("ids", ids);
          console.log("watchlist", watchList);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  }, [useState, rentalBooks]);

  if (rentalBooks) {
    return (
      <div className={styles.rentalPage}>
        <h1>Books In Rental</h1>
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
        {display === "list" ? 
          <BookList items={rentalBooks} watchList={watchList||[]}/>
        : 
          <BookGallery items={rentalBooks} watchList={watchList||[]}/>}
      </div>
    );
  }
  return (
    <div className={styles.rentalPage}>
      <h1>Books In Rental</h1>
    </div>
  );
}

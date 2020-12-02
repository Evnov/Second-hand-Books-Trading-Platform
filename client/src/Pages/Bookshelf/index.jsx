import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import BookList from "../../Layouts/BookList";
import { Link } from "react-router-dom";
import AccountNavbar from "../../Layouts/AccountNavbar";
import querystring from "querystring";

export default function BookShelf() {
  const [user, setUser] = useState();
  const [booklist, setBooklist] = useState();
  const [idx, setIdx] = useState(1);
  const [display, setDisplay] = useState("Books On Sale");

  const loggedInUser = localStorage.getItem("user");

  useEffect(() => {
    if (loggedInUser) {
      // console.log(JSON.parse(loggedInUser));
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  useEffect(() => {
    if (user) {
      console.log(user.id);
      fetch(
        "http://secbook1-env.eba-yep2vg6m.us-east-1.elasticbeanstalk.com/booklist/getAllBooks.do",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: querystring.stringify({ user_id: user.id }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setBooklist(data);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  }, [user]);

  function toggle(i){
    setIdx(i);
  }

  if (!user) {
    return (
      <div className={styles.watchlistPage}>
        <div className={styles.navbar}>
          <AccountNavbar />
        </div>
        <div className={styles.right}>
          <h2>
            Please{" "}
            <Link to="/login" className={styles.link}>
              Sign in
            </Link>
            .
          </h2>
        </div>
      </div>
    );
  }
  if (booklist) {
    return (
      <div className={styles.watchlistPage}>
        <div className={styles.navbar}>
          <AccountNavbar />
        </div>
        <div className={styles.right}>
          <div className={styles.tabs}>
            {/* <div className={idx===0&&styles.active} onClick={toggle}>Order history</div> */}
            <div className={idx===1&&styles.active} onClick={()=>toggle(1)}>My books</div>
          </div>
          <div className={styles.tabContent}>
            {idx===0&&<section className={styles.bookSection}>
              <table className={styles.booktable}>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Purchaser</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th></th>
                </tr>
                <tr>
                  <td className={styles.clickable}>ATLAS OF MONSTERS AND GHOSTS</td>
                  <td>2020-11-12</td>
                  <td className={styles.clickable}>Martin</td>
                  <td>$26.99</td>
                  <td>Pending</td>
                  <td><button className={styles.tablebtn}>Cancel</button></td>
                </tr>
                <tr>
                  <td className={styles.clickable}>THE FAST DIET RECIPE BOOK</td>
                  <td>2020-10-28</td>
                  <td className={styles.clickable}>Ben</td>
                  <td>$24.99</td>
                  <td>Completed</td>
                  <td><button className={styles.tablebtn}>Review</button></td>
                </tr>
              </table>
              <table className={styles.booktable}>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Seller</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th></th>
                </tr>
                <tr>
                  <td className={styles.clickable}>A NEW TEXTBOOK</td>
                  <td>2020-10-14</td>
                  <td className={styles.clickable}>Alice</td>
                  <td>$36.99</td>
                  <td>Completed</td>
                  <td><button className={styles.tablebtn}>Review</button></td>
                </tr>
                <tr>
                  <td className={styles.clickable}>HOW TO CRACK CODING INTERVIEW</td>
                  <td>2020-10-13</td>
                  <td className={styles.clickable}>Tracy</td>
                  <td>$13.00</td>
                  <td>Completed</td>
                  <td><button className={styles.tablebtn}>Review</button></td>
                </tr>
              </table>
            </section>}
            {idx===1&&<section className={styles.bookSection}>
            <table className={styles.booktable}>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  {/* <th>Purchaser</th> */}
                  <th>Price</th>
                  <th>Status</th>
                  <th></th>
                </tr>
                <tr>
                  <td className={styles.clickable}>ATLAS OF MONSTERS AND GHOSTS</td>
                  <td>2020-11-12</td>
                  {/* <td className={styles.clickable}></td> */}
                  <td>$26.99</td>
                  <td>On rental</td>
                  <td><button className={styles.tablebtn}>Edit</button><button className={styles.tablebtn}>Delete</button></td>
                </tr>
                {/* <tr>
                  <td className={styles.clickable}>A NEW TEXTBOOK</td>
                  <td>2020-10-14</td>
                  <td className={styles.clickable}>Alice</td>
                  <td>$36.99</td>
                  <td>Completed</td>
                  <td><button className={styles.tablebtn}>Review</button></td>
                </tr>
                <tr>
                  <td className={styles.clickable}>HOW TO CRACK CODING INTERVIEW</td>
                  <td>2020-10-13</td>
                  <td className={styles.clickable}>Tracy</td>
                  <td>$13.00</td>
                  <td>Completed</td>
                  <td><button className={styles.tablebtn}>Review</button></td>
                </tr> */}
              </table>
            </section>}
          </div>
          {/* <h1>BookShelf</h1> */}
          {/* <div className={styles.bar}>
            <form>
              <select
                onChange={(e) => {
                  if (e.target.value === "0") {
                    setDisplay("Books On Sale");
                  } else if (e.target.value === "1") {
                    setDisplay("Books In Rental");
                  } else {
                    setDisplay("Books Off Shelf");
                  }
                }}
              >
                <option value="0">Books On Sale</option>
                <option value="1">Books In Rental</option>
                <option value="2">Books Off Shelf</option>
              </select>
            </form>
          </div> */}
          {/* {display === "Books On Sale" ? 
          <BookList items={booklist.filter((item) => item.status == 1)} />
           : display === "Books In Rental" ? 
          <BookList items={booklist.filter((item) => item.status == 0)}/>
          : <BookList items={booklist.filter((item) => item.status == 2)} />} */}
        </div>
      </div>
    );
  }
  return (
    <div className={styles.watchlistPage}>
      <div className={styles.navbar}>
        <AccountNavbar />
      </div>
      <div className={styles.right}>
        <h1>BookShelf</h1>
      </div>
    </div>
  );
}

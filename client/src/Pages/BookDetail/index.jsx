import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { useParams, Link, useHistory } from "react-router-dom";
import cat from "../../Component/Category";
import Rating from '@material-ui/lab/Rating';
import { getTime, getAlpha } from '../../Component/common';
import  { Storage } from 'aws-amplify';
// import condition from "../../Component/bookCondition";
import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import querystring from "querystring";

export default function BookDetail() {
  const { bookID } = useParams();
  const [user, setUser] = useState();
  const [inWatchList, setInWatchList] = useState(false);
  const [book, setBook] = useState();
  const [idx, setIdx] = useState(0);
  const [src, setSrc] = useState();
  const [saler, setSaler] = useState({ username: "", email: "", phone: "",userid:"" });
  const [opendialog, setOpenDialog] = useState(false);
  const [reviews, setReviews] = useState([]);
  const history = useHistory();

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
        let filterbook = data.data.filter((item) => {
          return item.id == bookID;
        });
        setBook(filterbook[0]);
        return filterbook[0].bookImage;
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
          return response.json();
        })
        .then((data) => {
          setSaler({
            username: data[0].username,
            email: data[0].email,
            phone: data[0].phone,
            userid: data[0].id
          });
          getReviews(data[0].id);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  }, []);

  useEffect(() => {
    if (user) {
      const bodyuser = { user_id: user.id };
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
          setInWatchList(data.map((item=>item.id)).includes(parseInt(bookID)));
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  }, [user]);

  function closeDialog() {
    setOpenDialog(false);
    history.push("/bookshelf");
  }

  function openDialog() {
    setOpenDialog(true);
  }

  async function getReviews(uid){
    const res = await fetch(
      "http://secbook1-env.eba-yep2vg6m.us-east-1.elasticbeanstalk.com/rating/getReview.do",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: querystring.stringify({ reviewee_id: uid }),
      }
    );
    const rws = await res.json();
    setReviews(rws);
  }

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
  function handleOrder() {
    if (user && bookID) {
      fetch(
        "http://secbook1-env.eba-yep2vg6m.us-east-1.elasticbeanstalk.com/order/createOrder.do",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: querystring.stringify({
            buyerId: user.id,
            sellerId: saler.userid,
            productId: book.id,
            createTime:new Date().toString(),
            category: book.categoryId,
            status: book.status
          }),
        }
      )
        .then(() => {
          openDialog();
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
              alt={book.bookImg}
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
              buy
            </div>
          ) : (
            <div>
              {book.stock>0&&<div className={styles.bookBtn}>
                {inWatchList ? (
                  <button className={styles.btn} onClick={handleClick}>
                    Remove from WatchList
                  </button>
                ) : (
                  <button className={styles.btn} onClick={handleClick}>
                    Add to WatchList
                  </button>
                )}
                <button className={styles.btn} onClick={handleOrder}>
                  Place an order
                </button>
              </div>}
              <Dialog open={opendialog} onClose={closeDialog} fullWidth={true} maxWidth='xs'>
                <DialogTitle id="dialog">{"Book owner contact info"}</DialogTitle>
                <div className={styles.contact}>
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
                  <strong>Go reach out to the owner and grab your book!</strong>
                </div>
                <DialogActions>
                  <Button onClick={closeDialog} color="primary">Got it!</Button>
                </DialogActions>
              </Dialog>
            </div>
          )}
        </div>
        <div className={styles.tabs}>
          <div className={idx===0&&styles.active} onClick={()=>toggle(0)}>Description</div>
          <div className={idx===1&&styles.active} onClick={()=>toggle(1)}>About owner</div>
        </div>
        <div className={styles.tabContent}>
          {idx===0&&<section className={styles.bookSection}>
             {book.descr}
          </section>}
          {idx===1&&<div className={styles.tabBlock}>
            {reviews.map((rw)=>
              <div className={styles.rw} key={rw.createTime}>
                <div className={styles.reviewer}>{getAlpha(rw.reviewerId)}</div>
                <div className={styles.rwcontent}>
                  <Rating value={rw.score} disabled />
                  <div>{rw.review}</div>
                  <div>{getTime(rw.createTime)}</div>
                </div>
              </div>
            )}
          </div>}
        </div>
      </div>
    );
  }
  return <div className={styles.bookdetailPage}></div>;
}

import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import BookList from "../../Layouts/BookList";
import { Link } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import AccountNavbar from "../../Layouts/AccountNavbar";
import querystring from "querystring";

export default function BookShelf() {
  const [user, setUser] = useState();
  const [opendialog, setOpenDialog] = useState(false);
  const [booklist, setBooklist] = useState([]);
  const [orderlist, setOrderlist] = useState();
  const [orderlist2, setOrderlist2] = useState();
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
      fetchBooklist(user.id);
        // fetch(
        //   "http://secbook1-env.eba-yep2vg6m.us-east-1.elasticbeanstalk.com/booklist/getAllBooks.do",
        //   {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/x-www-form-urlencoded",
        //     },
        //     body: querystring.stringify({ user_id: user.id }),
        //   }
        // )
        //   .then((response) => response.json())
        //   .then((data) => {
        //     console.log(data);
        //     setOrderlist(data);
        //   })
        //   .catch((err) => {
        //     console.log("Error", err);
        //   });
    }
  }, [user]);

  function fetchBooklist(userid){
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
        setBooklist(data.filter((book)=>book!==null));
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }

  function toggle(i){
    setIdx(i);
  }

  function getTime(timestamp){
    let d = new Date(timestamp);
    return `${d.getFullYear()}-${(d.getMonth()+1)}-${d.getDate()}`;
  }

  function openDialog() {
    setOpenDialog(true);
  }
  function closeDialog() {
    setOpenDialog(false);
  }

  function deletebook(bookid){
    fetch(
      "http://secbook1-env.eba-yep2vg6m.us-east-1.elasticbeanstalk.com/product/deleteBookById.do",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: querystring.stringify({ book_id: bookid }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        fetchBooklist(user.id);
        setOpenDialog(false);
      })
      .catch((err) => {
        console.log("Error", err);
      });
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

  const bookcategory= ["On rental","On sale"];
  const bookstatus=["Pending","Completed","Canceled"];
  if (booklist) {
    return (
      <div className={styles.watchlistPage}>
        <div className={styles.navbar}>
          <AccountNavbar />
        </div>
        <div className={styles.right}>
          <div className={styles.tabs}>
            <div className={idx===0&&styles.active} onClick={()=>toggle(0)}>Order history</div>
            <div className={idx===1&&styles.active} onClick={()=>toggle(1)}>My books on shelf</div>
          </div>
          <div className={styles.tabContent}>
            {idx===0&&<section className={styles.bookSection}>
              {orderlist&&<table className={styles.booktable}>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Owner</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th></th>
                </tr>
                {orderlist.map((book)=>(
                  <tr>
                    <td className={styles.clickable}><Link to={"/bookdetail/" + book.id}>{book.title}</Link></td>
                    <td>{getTime(book.createTime)}</td>
                    <td className={styles.clickable}>{book.buyer}</td>
                    <td>${book.price}</td>
                    <td>{bookstatus[book.status]}</td>
                    {book.status===0?
                    <td><button className={styles.tablebtn}>Cancel</button></td>:
                    <td><button className={styles.tablebtn}>Review</button></td>}
                  </tr>
                ))}
              </table>}
              {orderlist2&&<table className={styles.booktable}>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Purchaser</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th></th>
                </tr>
                {orderlist2.map((book)=>(
                  <tr>
                    <td className={styles.clickable}><Link to={"/bookdetail/" + book.id}>{book.title}</Link></td>
                    <td>{getTime(book.createTime)}</td>
                    <td className={styles.clickable}>{book.buyer}</td>
                    <td>${book.price}</td>
                    <td>{bookstatus[book.status]}</td>
                    {book.status===0?
                    <td><button className={styles.tablebtn}>Cancel</button></td>:
                    <td><button className={styles.tablebtn}>Review</button></td>}
                  </tr>
                ))}
              </table>}
            </section>}
            {idx===1&&<section className={styles.bookSection}>
              <table className={styles.booktable}>
                <tbody>
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                  {booklist.map((book)=>(
                  <tr>
                    <td className={styles.clickable}><Link to={"/bookdetail/" + book.id}>{book.title}</Link></td>
                    <td>{getTime(book.createTime)}</td>
                    <td>${book.price}</td>
                    <td>{bookstatus[book.status]}</td>
                    {book.status===0?
                    <td>
                      <Link to={'/post/'+book.id}><button className={styles.tablebtn}>Edit</button></Link>
                      <button className={styles.tablebtn} onClick={openDialog}>Delete</button>
                        <Dialog open={opendialog} onClose={closeDialog} fullWidth={true} maxWidth='xs'>
                          <DialogTitle id="dialog">{"Warning"}</DialogTitle>
                          <div className={styles.dialogtext}>Do you really want to delete the book?</div>
                          <DialogActions>
                          <Button onClick={()=>deletebook(book.id)} color="primary">
                            Delete
                          </Button>
                          <Button onClick={closeDialog} color="primary">
                            Cancel
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </td>:
                    <td></td>}
                  </tr>
                  ))}
                </tbody>
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
